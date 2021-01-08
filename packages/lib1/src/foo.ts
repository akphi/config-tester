/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { A } from './something';
import { Am } from './something';

export function helloworld() {
  // console.log('helloworld!');
  return 'Hello world';
}

export const o = { a: 1, name: 'o' };
export const copy = { ...o };
