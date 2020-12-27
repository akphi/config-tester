/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ReactDOM from 'react-dom';
import { App } from './App';

const root = ((): Element => {
  let rootElement = document.getElementsByTagName('root').length
    ? document.getElementsByTagName('root')[0]
    : undefined;
  if (!rootElement) {
    rootElement = document.createElement('root');
    document.body.appendChild(rootElement);
  }
  return rootElement;
})();

ReactDOM.render(<App />, root);
