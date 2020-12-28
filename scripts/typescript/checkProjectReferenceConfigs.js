const {
  checkProjectReferenceConfig,
} = require('@akphi/dev-utils/ProjectReferenceConfigChecker');
const path = require('path');

checkProjectReferenceConfig({
  rootDir: path.resolve(__dirname, '../../'),
  excludePatterns: [],
});
