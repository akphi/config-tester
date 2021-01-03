/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { returnOneAsWell } from '@akphi/component1/helpers1';
import { returnTwo } from 'U1';
import { data } from './testData';

test('some dummy test', () => {
  expect(data).toEqual(returnOneAsWell());
  expect(data).toEqual(returnOneAsWell());
});

test('some dummy test 2', () => {
  expect(2).toEqual(returnTwo());
});
