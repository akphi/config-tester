/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { returnOne } from './helpers';
import { Component2 } from '@akphi/component1';
import { useState } from 'react';
import './index.scss';

// import '@akphi/component1/lib/index.css';
// import Component2 from '@akphi/component1';

export const App: React.FC = () => {
  const [age, setAge] = useState(19);
  // console.log(returnOne());

  return (
    <div className="wrapper">
      <Component2 />
      <button className="blue" onClick={(): void => setAge(age + 1)}>
        +
      </button>
      <div>Age(s): {age}</div>
    </div>
  );
};
