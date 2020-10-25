module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    './dev/test-preset',
    ['@babel/preset-typescript', {
      onlyRemoveTypeImports: true,
      allowDeclareFields: true,
      isTSX: true,
      allExtensions: true
    }],
  ],
};
