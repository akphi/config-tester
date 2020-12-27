/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  /**
   * `favicon` [string, optional]
   * Relative path to the favicon file
   * e.g. './assets/favicon.ico'
   */
  faviconPath: undefined,
  /**
   * `baseUrl` [string, required]
   * Base URL for your site. This can also be considered the path after the host.
   * e.g. `/something/` is the `baseUrl` of https://www.example.org/something/
   * For URLs that have no path, use '/'.
   */
  baseUrl: '/ct/',
  /**
   * `devServerOptions` [object, optional]
   * Options to override `webpack-dev-server` configs.
   * See https://webpack.js.org/configuration/dev-server/
   */
  devServerOptions: {},
};
