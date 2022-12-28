const { defineConfig } = require('cypress')
require('dotenv').config()
module.exports = defineConfig({
  video: false,
  e2e: {
    env: {
      url: 'users',
      ...process.env
    },
    setupNodeEvents(on, config) {}
  }
})
