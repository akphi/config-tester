module.exports = function () {
  return {
    plugins: [
      // Use the legacy (stage 1) decorators syntax and behavior.
      // NOTE: must be placed before `@babel/plugin-proposal-class-properties`
      // See https://babeljs.io/docs/en/babel-plugin-proposal-decorators#note-compatibility-with-babel-plugin-proposal-class-properties
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      // class properties are compiled to use an assignment expression instead of `Object.defineProperty`
      // See https://babeljs.io/docs/en/babel-plugin-proposal-class-properties#loose
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
  };
};
