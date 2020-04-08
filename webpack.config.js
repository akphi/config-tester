const webpack = require('webpack');
const sass = require('sass');
const path = require('path');
const fs = require('fs');
const resolve = require('resolve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const WorkerPlugin = require('worker-plugin');

const rootDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(rootDirectory, relativePath);
const paths = {
  tsConfig: resolveApp('tsconfig.json'),
};
const APP_NAME = 'configTester';
const OUTPUT_STATIC_PATH = 'static';

module.exports = (env, arg) => {
  const isEnvDevelopment = arg.mode === 'development';
  const isEnvProduction = arg.mode === 'production';
  return {
    mode: arg.mode,
    // Stop compilation early in production
    bail: isEnvProduction,
    entry: { main: './src/index.tsx' },
    output: {
      path: path.join(__dirname, `./target/classes/web/${APP_NAME}`),
      publicPath: '/',
      filename: `${OUTPUT_STATIC_PATH}/${isEnvProduction ? '[name].js' : '[name].[hash:8].js'}`,
      // This is for `worker-plugin` works in HMR
      globalObject: '(typeof self !== "undefined" ? self : this)',
    },
    devtool: isEnvDevelopment
      ? 'cheap-module-source-map'
      : 'source-map',
    watchOptions: {
      poll: 1000,
      ignored: [/node_modules/],
    },
    devServer: {
      compress: true,
      open: true,
      port: 3030,
      historyApiFallback: {
        disableDotRule: true,
      },
      stats: {
        all: false,
        warnings: true,
        errors: true,
      }
    },
    resolve: {
      alias: {
        // 'react-dom': isEnvDevelopment ? '@hot-loader/react-dom' : 'react-dom',
        Const: path.resolve(__dirname, 'src/const'),
        Components: path.resolve(__dirname, 'src/components/'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      plugins: [PnpWebpackPlugin]
    },
    resolveLoader: {
      plugins: [PnpWebpackPlugin.moduleLoader(module)]
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                cacheDirectory: true,
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
                  '@babel/preset-typescript',
                ],
                plugins: [
                  // Show JSX component stack trace (must be disabled for PROD)
                  isEnvDevelopment && '@babel/plugin-transform-react-jsx-source',
                  ['@babel/plugin-proposal-decorators', { legacy: true }],
                  ['@babel/plugin-proposal-class-properties', { loost: true }],
                  ['@babel/plugin-proposal-optional-chaining'],
                  ['@babel/plugin-proposal-nullish-coalescing-operator'],
                  ['@babel/plugin-transform-named-capturing-groups-regex'],
                  // isEnvDevelopment && 'react-hot-loader/babel'
                ].filter(Boolean)
              }
            },
          ]
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: isEnvDevelopment },
            },
            {
              loader: require.resolve('css-loader'),
              options: { sourceMap: true },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('autoprefixer'),
                ].concat(
                  isEnvDevelopment ? [] : [require('cssnano')],
                ),
                sourceMap: true,
              }
            },
            {
              loader: require.resolve('resolve-url-loader'),
              options: { sourceMap: true },
            },
            {
              loader: require.resolve('sass-loader'),
              options: {
                implementation: sass,
                sourceMap: true,
                sassOptions: { includePaths: ['node_modules'] },
              }
            }
          ],
        },
        {
          test: /\.(woff2?|ttf|otf|eot|svg|png|gif)/,
          loader: require.resolve('file-loader'),
          options: { name: `${OUTPUT_STATIC_PATH}/${isEnvDevelopment ? '[name].[ext]' : '[name].[contenthash:8].[ext]'}`}
        }
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vender: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      }
    },
    plugins: [
      new WorkerPlugin(),
      new MonacoWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: `${OUTPUT_STATIC_PATH}/${isEnvDevelopment ? '[name].css' : '[name].[contenthash:8].css'}`,
        chunkFilename: `${OUTPUT_STATIC_PATH}/${isEnvDevelopment ? '[id].css' : '[id].[contenthash:8].css'}`,
      }),
      new ForkTsCheckerWebpackPlugin(PnpWebpackPlugin.forkTsCheckerOptions({
        typescript: resolve.sync('typescript', {
          basedir: resolveApp('node_modules'),
        }),
        async: false,
        eslint: true,
        useTypescriptIncrementalApi: true,
        checkSyntacticErrors: true,
        tsConfig: paths.tsConfig,
        reportFiles: [
          'src/**/*.(ts|tsx|js|jsx)'
        ]
      }))
    ]
  }
};
