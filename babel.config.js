/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = (api) => {
  // `cache.invalidate()`: The config is cache based on the value of NODE_ENV.
  // Any time the using callback returns a value other than the one that was expected,
  // the overall config function will be called again and all entries in the cache will
  // be **replaced** with the result.
  // See https://babeljs.io/docs/en/config-files#apicache
  api.cache.invalidate(() => process.env.NODE_ENV);
  const isEnvDevelopment = api.env('development');

  return {
    presets: [
      [
        '@akphi/babel-preset',
        {
          development: isEnvDevelopment,
          useTypescript: true,
          useReact: true,
          useBabelRuntime: true,
        },
      ],
    ],
  };
};
