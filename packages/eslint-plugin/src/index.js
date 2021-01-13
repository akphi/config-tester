/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  configs: {
    'computationally-expensive': require('./configs/computationally-expensive')
      .config,
    recommended: require('./configs/recommended').config,
    'scripts-override': require('./configs/scripts-override').config,
  },
  rules: {},
};
