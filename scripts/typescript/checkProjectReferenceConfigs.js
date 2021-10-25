import { checkProjectReferenceConfig } from '@akphi/dev-utils/ProjectReferenceConfigChecker';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

checkProjectReferenceConfig({
  rootDir: resolve(__dirname, '../../'),
  excludePackagePatterns: [],
  excludeReferencePatterns: ['**/tsconfig.package.json'],
});
