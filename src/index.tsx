import React from 'react';
import ReactDOM from 'react-dom';
import './variables.scss';
import './index.scss';
import { App } from 'Components/App';
import { configure as configureMobx } from "mobx"

configureMobx({
  enforceActions: "observed"
})

let root = document.getElementsByTagName('root')[0];
if (!root) {
  root = document.createElement('root');
  document.body.appendChild(root);
}

ReactDOM.render((
    <div>
      <App/>
    </div>
  ),
  root
);

