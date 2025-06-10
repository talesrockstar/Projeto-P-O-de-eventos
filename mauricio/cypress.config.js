const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Define a URL base caso seus testes precisem acessar um servidor local
    // baseUrl: 'http://localhost:8080', 
    // Define o diretório onde os arquivos de teste E2E estão localizados
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    // Define o diretório para arquivos de suporte (comandos customizados, etc.)
    supportFile: 'cypress/support/e2e.js',
    // Define o diretório para fixtures (dados de teste)
    fixturesFolder: 'cypress/fixtures'
  },
});

