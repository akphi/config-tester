module.exports = function () {
  return {
    plugins: [
      // Support static, private fields. With option `loose=true`, class properties are compiled to use an
      // assignment expression instead of `Object.defineProperty`
      // See https://babeljs.io/docs/en/babel-plugin-proposal-class-properties#loose
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ]
  };
};
