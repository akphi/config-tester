const { check } = require('@akphi/dev-utils/CopyrightUtils');
const config = require('./copyright.config');

check({
  ...config,
  configFileLocation: 'scripts/copyright/copyright.config.js',
});
