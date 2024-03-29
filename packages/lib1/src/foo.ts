/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// import type { A } from './something';
// import { Am } from './something';
// import { isEqual as _isEqual } from 'lodash-es';

export function helloworld() {
  // console.log('helloworld!');
  return 'Hello world';
}

export const dummyObj = { a: 1, name: 'o' };
export const copy = { ...dummyObj };
// export const isEqual = _isEqual;
export { isEqual } from 'lodash-es';
