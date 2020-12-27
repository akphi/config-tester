const {
  getLibraryModuleBaseWebpackConfig: getModuleBaseWebpackConfig,
} = require('@akphi/dev-utils/WebpackConfigUtils');

module.exports = (env, arg) => {
  const baseConfig = getModuleBaseWebpackConfig(env, arg, __dirname, {
    mainEntryPath: './src/index.tsx',
    libraryName: 'component1',
  });
  const config = {
    ...baseConfig,
    // LIB-ONLY
    // externals: [
    //   'react',
    //   'react-dom',
    //   /^@material-ui.*$/,
    //   /^monaco-editor.*$/,
    // ],
  };
  return config;
};
