const { update } = require('@akphi/dev-utils/CopyrightUtils');
const config = require('./copyright.config');

const onlyApplyToModifiedFiles = process.argv.includes('--modified');

update({
  ...config,
  onlyApplyToModifiedFiles,
});
