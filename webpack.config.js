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
        allowDeclareFields: true
      }],
    ],
    plugins: [
      ['@babel/plugin-proposal-optional-chaining'],
      ['@babel/plugin-proposal-nullish-coalescing-operator'],
    ].filter(Boolean)
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
    // Stop compilation early in production
    bail: isEnvProduction,
    entry: { main: './app/index.tsx' },
    devtool: isEnvDevelopment
      // The best and also recommended for dev seems to be `cheap-module-eval-source-map`,
      // but the line is incorrectly reported, so we use `cheap-module-source-map` as CRA
      // See https://github.com/vuejs-templates/webpack/issues/520#issuecomment-356773702
      // See https://github.com/facebook/create-react-app/issues/343
      ? 'cheap-module-source-map'
      : 'source-map',
    watchOptions: {
      poll: 1000,
      // Exclude test from dev watch
      ignored: [/node_modules/],
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
      // Webpack plugin that runs TypeScript type checker on a separate process.
      // NOTE: This makes the initial build process slower but allow faster incremental builds
      // See https://www.npmjs.com/package/fork-ts-checker-webpack-plugin#motivation
      // See https://github.com/arcanis/pnp-webpack-plugin#fork-ts-checker-webpack-plugin-integration
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
        },
        // Allow blocking webpack's emit to wait for type checker/linter and to add errors to the webpack's compilation
        // if we turn `async:true` webpack will compile on one thread and type check on another thread so any type
        // error will not cause the build to fail, also error/warning from this plugin will not be captured by webpack
        // so we will have to write our own formatter for the log.
        async: enableAsyncTypeCheck && isEnvDevelopment,
        // We will handle the output here using fork-ts-checker compiler hooks since the lint/error/warning output is not grouped by file
        // See https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/issues/119
        logger: {
          infrastructure: 'silent',
          issues: 'silent',
          devServer: false,
        },
        eslint: {
          enabled: true,
          files: [
            // 'app/**/*.ts',
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
