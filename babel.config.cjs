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
        '@finos/babel-preset-legend-studio',
        {
          development: isEnvDevelopment,
          useTypescript: true,
          useReact: true,
          useReactFastRefresh: true,
        },
      ],
    ],
    // For @babel/plugin-proposal-class-properties, to work well with Mobx, we need to make sure setting
    // `loose = false`, but we can also use the new transpiler assumptions in Babel >=7.13.0
    // See https://babeljs.io/docs/en/babel-plugin-proposal-class-properties#loose
    // See https://mobx.js.org/installation.html#use-spec-compliant-transpilation-for-class-properties
    assumptions: {
      setPublicClassFields: false,
    },
  };
};
