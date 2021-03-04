/**
 * Copyright (c) An Phi.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { returnOne } from '../helpers';
import { data } from './testData';

test('some other dummy test', () => {
  expect(data).toEqual(returnOne());
});
