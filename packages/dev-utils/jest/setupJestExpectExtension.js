import {
  toContainKeys,
  toContainAllKeys,
  toIncludeSameMembers,
} from 'jest-extended';

// For the list of extensions check documentation for `jest-extended`
// See https://github.com/jest-community/jest-extended
expect.extend({
  toContainKeys,
  toContainAllKeys,
  toIncludeSameMembers,
});
