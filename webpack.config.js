const path = require('path');
const fs = require('fs');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const getJavascriptLoaderConfig = ({ isEnvDevelopment }) => ({
  loader: require.resolve('babel-loader'),
  options: {
    // cacheDirectory: true,
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
    ]
  }
});

const rootDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(rootDirectory, relativePath);
const paths = {
  eslintConfig: resolveApp('.eslintrc.js'),
  tsConfig: resolveApp('tsconfig.json'),
};

module.exports = (env, arg) => {
  const isEnvDevelopment = arg.mode === 'development';
  const isEnvProduction = arg.mode === 'production';
  const enableAsyncTypeCheck = Boolean(arg.enableAsyncTypeCheck);
  return {
    mode: arg.mode,
    bail: isEnvProduction,
    entry: { main: './app/index.tsx' },
    devtool: isEnvDevelopment
      ? 'cheap-module-source-map'
      : 'source-map',
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/,
    },
    devServer: {
      open: true,
      port: 3000,
      clientLogLevel: 'warn',
      stats: {
        all: false,
      },
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.(?:js|ts)x?$/,
          exclude: /node_modules/,
          use: [getJavascriptLoaderConfig({ isEnvDevelopment })],
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './app/index.html',
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: paths.tsConfig,
          mode: 'write-references', // recommended mode to improve initial compilation time when using `babel-loader`
          diagnosticsOptions: {
            syntactic: true,
            semantic: true,
            declaration: true,
            global: true,
          },
          profile: true
        },
        async: enableAsyncTypeCheck && isEnvDevelopment,
        // We will handle the output here using fork-ts-checker compiler hooks since the lint/error/warning output is not grouped by file
        // See https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/issues/119
        logger: {
          // infrastructure: 'silent',
          // issues: 'silent',
          // devServer: false,
        },
        eslint: {
          enabled: true,
          files: [
            'app/**/*.ts',
            'app/**/*.tsx',
          ],
          // ESLint initialization options
          // See https://eslint.org/docs/developer-guide/nodejs-api#cliengine
          options: {
            configFile: (isEnvProduction) ? paths.advancedEslintConfig : paths.eslintConfig,
          }
        },
        formatter: isEnvProduction ? 'codeframe' : undefined
      }),
    ].filter(Boolean)
  };
};
