import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // setupNodeEvents(on, config) { },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    baseUrl: 'https://xbu.vercel.app/',
    video: false,
    viewportWidth: 1280,
    viewportHeight: 800,
  },
});
