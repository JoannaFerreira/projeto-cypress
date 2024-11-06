const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // video: true, // Habilitar/desabilitar gravação de vídeo
  env: {
    // VARIAVEL_EXEMPLO: "valor",
    // requestMode: true,
    // hideCredentials: true,
    hideCredentialsOptions: {
      body: ["username", "password"],
    }
  }
});
