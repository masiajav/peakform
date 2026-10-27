import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/ads', workers: 2, retries: 0, forbidOnly: true,
  use: { baseURL: 'http://127.0.0.1:3012', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'npx cross-env NEXT_DIST_DIR=.next-ads-test next build && npx cross-env NEXT_DIST_DIR=.next-ads-test next start -p 3012 -H 127.0.0.1',
    url: 'http://127.0.0.1:3012', reuseExistingServer: false, timeout: 240000,
    env: {
      NEXT_PUBLIC_ADSENSE_CLIENT_ID: 'ca-pub-1234567890123456',
      NEXT_PUBLIC_ADSENSE_APPROVED: 'true', NEXT_PUBLIC_ADSENSE_CMP_READY: 'true', NEXT_PUBLIC_ADSENSE_REVIEW_MODE: 'false',
      NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_AFTER_SUMMARY: '1111111111',
      NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_AFTER_VIDEO: '2222222222',
      NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_SIDEBAR: '3333333333',
    },
  },
})
