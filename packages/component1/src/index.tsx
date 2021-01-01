/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// import { useState } from 'react';
import { helloworld } from '@akphi/lib1';
// import { Button } from '@material-ui/core';
import data from './data.json';
import './component1.css';
import './sassy.scss';

export function Component1() {
  // const a = useState(1);
  // helloworld();
  // return <Button variant="outlined">triel</Button>;
  // const a: object = 1;
  return data.name;
}

export function Component2() {
  helloworld();
  return <div className="blue">lanister</div>;
}
