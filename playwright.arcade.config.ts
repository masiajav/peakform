import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: 'oversvivors.spec.ts',
  workers: 1,
  timeout: 90_000,
  reporter: [['list']],
  use: {
    baseURL: process.env.ARCADE_BASE_URL || 'http://127.0.0.1:3081',
    launchOptions: { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 1100 } } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
})
