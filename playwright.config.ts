import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  // Keep full-page captures and the local Next server within desktop resources.
  workers: 2,
  forbidOnly: true,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:3011',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    // Exercise verification with every serving prerequisite true: review mode
    // must still suppress execution. This ID is test-only, not a real publisher.
    env: {
      NEXT_PUBLIC_ADSENSE_CLIENT_ID: 'ca-pub-1234567890123456',
      NEXT_PUBLIC_ADSENSE_REVIEW_MODE: 'true',
      NEXT_PUBLIC_ADSENSE_APPROVED: 'true',
      NEXT_PUBLIC_ADSENSE_CMP_READY: 'true',
    },
    command: 'npm run build:e2e && npm run start:e2e -- -p 3011 -H 127.0.0.1',
    url: 'http://127.0.0.1:3011',
    reuseExistingServer: false,
    timeout: 240_000,
  },
})
