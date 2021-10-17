const envinfo = require('envinfo');

envinfo.run(
  {
    System: ['OS'],
    Browsers: ['Chrome', 'Firefox'],
    Binaries: ['Node', 'npm', 'Yarn'],
  },
  { console: true },
);
