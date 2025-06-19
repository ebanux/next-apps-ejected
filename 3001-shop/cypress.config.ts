import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    fileServerFolder: '.',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    fixturesFolder: 'cypress/fixtures',
    // Please ensure you use `cy.origin()` when navigating between domains and remove this option.
    // See https://docs.cypress.io/app/references/migration-guide#Changes-to-cyorigin
    injectDocumentDomain: true,
  },
  defaultCommandTimeout: 10000,
  retries: {
    runMode: 3,
    openMode: 2,
  },
});
