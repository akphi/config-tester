module.exports = {
  configs: {
    'computationally-expensive': require('./configs/computationally-expensive')
      .config,
    recommended: require('./configs/recommended').config,
    'scripts-override': require('./configs/scripts-override').config,
  },
  rules: {},
};
