import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 600_000, // 10 min — gives you time to interact with the form
  use: {
    baseURL: 'http://localhost:5173',
    headless: false,
    channel: 'chrome', // use your installed Chrome instead of Chromium
    launchOptions: {
      slowMo: 300,
      args: ['--start-maximized'],
    },
    viewport: null, // use full window size from --start-maximized
  },
});
