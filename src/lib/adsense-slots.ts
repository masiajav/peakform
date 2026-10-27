// Public ad-unit IDs created in this publisher account on 2026-10-26.
// These do not authorize ad serving; adsense-policy still gates every request.
export const REPLAID_ADSENSE_PUBLISHER = 'ca-pub-8844760720809623'
const SHARED_ARTICLE_SLOTS: Record<string, string> = {
  'guide-after-summary': '4100872939',
  'guide-after-video': '2787791265',
  'guide-sidebar-rectangle': '6535464588',
}

export function resolveAdSlot(slot: string | undefined, clientId: string | undefined, configured: Record<string, string | undefined>) {
  if (!slot) return null
  if (/^\d+$/.test(slot)) return slot
  const setting = slot.startsWith('guides-grid-') ? configured['guides-grid'] : configured[slot]
  // An explicit empty or invalid override disables the slot.
  if (setting !== undefined) return /^\d+$/.test(setting) ? setting : null
  return clientId === REPLAID_ADSENSE_PUBLISHER ? SHARED_ARTICLE_SLOTS[slot] ?? null : null
}

export function configuredAdSlots() {
  return {
    'home-top-leaderboard': process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_TOP,
    'home-mid-leaderboard': process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_MID,
    'guides-top-leaderboard': process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDES_TOP,
    'guides-grid': process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDES_INLINE,
    'guide-after-summary': process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_AFTER_SUMMARY,
    'guide-after-video': process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_AFTER_VIDEO,
    'guide-sidebar-rectangle': process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_SIDEBAR,
  }
}
