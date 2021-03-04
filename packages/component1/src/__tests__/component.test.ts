/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { returnOneAsWell } from '../helpers1';
import { returnTwo } from '../utils/util1';
import { data } from './testData';
// import { isEqual } from '@akphi/lib1';

test('some dummy test', () => {
  expect(data).toEqual(returnOneAsWell());
  expect(data).toEqual(returnOneAsWell());
});

test('some dummy test 2', () => {
  expect(2).toEqual(returnTwo());
});

// test('some dummy test', () => {
//   expect(isEqual({}, {})).toEqual(true);
// });
