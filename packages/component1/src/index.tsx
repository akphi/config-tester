/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// import { useState } from 'react';
// import { Button } from '@material-ui/core';
import { helloworld } from '@akphi/lib1';
import data from './data.json';
// import './component1.css';
// import './sassy.scss';
// import { returnOneAsWell } from './helpers1';
// import { returnTwo } from './utils/util1';

export function Component1() {
  // const a = useState(1);
  // helloworld();
  // return <Button variant="outlined">triel</Button>;
  // const a: object = 1;
  // console.log('asd');
  // console.log(returnOneAsWell(), returnTwo());
  return data.name;
}

export function Component2() {
  helloworld();
  return <div className="blue">lanister</div>;
}
