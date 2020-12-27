/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  // NOTE: we can also use `stylelint` with `styled-components` or `emotion`
  // using `stylelint-processor-styled-components` and `stylelint-config-styled-components`
  // Refer to `material-ui` for their setup of `.stylelintrc.js` and `package.json`
  // See https://github.com/mui-org/material-ui/blob/next/package.json
  extends: 'stylelint-config-standard',
  rules: {
    'declaration-colon-newline-after': null,
    'no-empty-source': null,
    'value-list-comma-newline-after': null,
  },
};
