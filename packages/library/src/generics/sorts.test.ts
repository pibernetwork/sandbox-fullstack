import { describe, expect, test } from 'vitest';

import { getDirection } from './sorts.js';

describe('Sort direction', () => {
  describe('Between', () => {
    test('asc', () => {
      expect(getDirection('asc')).toBe(1);
    });

    test('desc', () => {
      expect(getDirection('desc')).toBe(-1);
    });
  });
});
