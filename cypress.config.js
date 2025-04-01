const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("Cargando configuración de Cypress");

// Función para registrar tareas personalizadas
function registerWriteTestResultsTask(on) {
  on('task', {
    // Verificar archivo de prueba
    checkTestFile() {
      execSync('node checkTestFile.js');
      return null;
    },

    // Escribir resultados de los tests
    writeTestResults(results) {
      const filePath = path.resolve('shared-test-results.json');
      let data = {};

      // Si el archivo ya existe, cargar los datos previos
      if (fs.existsSync(filePath)) {
        const existingData = fs.readFileSync(filePath, 'utf8');
        data = JSON.parse(existingData);
      }

      // Combinar los resultados nuevos con los existentes
      data = { ...data, ...results };

      // Guardar el archivo actualizado
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return null;
    },

    // Registrar logs en consola
    log(message) {
      console.log(message);
      return null;
    }
  });
}

// Configuración principal de Cypress
module.exports = defineConfig({
  component: {
    devServer: {
      framework: "create-react-app", // Usar Create React App
      bundler: "webpack",           // Usar Webpack como empaquetador
    },
    setupNodeEvents(on, config) {
      // Registrar las tareas personalizadas
      registerWriteTestResultsTask(on);
    },
    specPattern: "src/test/**/*.cy.js", // Buscar tests en la carpeta src/test con extensión .cy.js
    excludeSpecPattern: ['**/correction_folder/*'], // Excluir carpetas no relevantes
  },

  e2e: {
    // Configuración para pruebas end-to-end (opcional)
    supportFile: 'cypress/support/e2e.js',
    specPattern: "cypress/e2e/**/*.cy.js",
    setupNodeEvents(on, config) {
      registerWriteTestResultsTask(on);
    },
  }
});
