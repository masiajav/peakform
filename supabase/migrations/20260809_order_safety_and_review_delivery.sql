alter table public.orders
  add column if not exists refund_requested_at timestamptz,
  add column if not exists refunded_at timestamptz;

create unique index if not exists orders_one_trial_per_expert
  on public.orders(user_id, expert_id)
  where tier = 'trial';

create or replace function public.deliver_expert_review(
  p_order_id uuid,
  p_expert_id uuid,
  p_summary text,
  p_errors text,
  p_positives text,
  p_action_plan text,
  p_timestamps jsonb default '[]'::jsonb,
  p_cross_analysis text default null,
  p_roadmap text default null
)
returns table(review_id uuid, delivered_at timestamptz, already_delivered boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order orders%rowtype;
  v_review_id uuid;
  v_delivered_at timestamptz;
  v_was_delivered boolean;
begin
  select *
    into v_order
    from public.orders
   where id = p_order_id
     and expert_id = p_expert_id
   for update;

  if not found then
    raise exception 'Pedido no encontrado';
  end if;

  select id
    into v_review_id
    from public.reviews
   where order_id = p_order_id
   for update;

  if v_order.status = 'delivered' and v_review_id is not null then
    review_id := v_review_id;
    delivered_at := v_order.delivered_at;
    already_delivered := true;
    return next;
    return;
  end if;

  if v_order.status <> 'in_review' then
    raise exception 'El pedido no esta en revision';
  end if;

  if v_review_id is null then
    insert into public.reviews (
      order_id,
      expert_id,
      user_id,
      summary,
      errors,
      positives,
      action_plan,
      timestamps,
      cross_analysis,
      roadmap
    )
    values (
      p_order_id,
      p_expert_id,
      v_order.user_id,
      trim(p_summary),
      trim(p_errors),
      trim(p_positives),
      trim(p_action_plan),
      coalesce(p_timestamps, '[]'::jsonb),
      p_cross_analysis,
      p_roadmap
    )
    returning id into v_review_id;
  end if;

  v_delivered_at := coalesce(v_order.delivered_at, now());
  v_was_delivered := v_order.status = 'delivered';

  update public.orders
     set status = 'delivered',
         delivered_at = v_delivered_at,
         updated_at = now()
   where id = p_order_id
     and expert_id = p_expert_id;

  if not v_was_delivered then
    update public.experts
       set total_reviews = coalesce(total_reviews, 0) + 1,
           updated_at = now()
     where id = p_expert_id;
  end if;

  review_id := v_review_id;
  delivered_at := v_delivered_at;
  already_delivered := false;
  return next;
end;
$$;
