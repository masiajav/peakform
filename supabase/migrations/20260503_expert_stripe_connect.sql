-- Add Stripe Connect account ID to experts
ALTER TABLE experts ADD COLUMN IF NOT EXISTS stripe_account_id text;
