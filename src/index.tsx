import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

const root = ((): Element => {
  let rootEl = document.getElementsByTagName('root').length ? document.getElementsByTagName('root')[0] : undefined;
  if (!rootEl) {
    rootEl = document.createElement('root');
    document.body.appendChild(rootEl);
  }
  return rootEl;
})();

ReactDOM.render(<App />, root);
