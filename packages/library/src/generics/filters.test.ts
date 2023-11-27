import { describe, expect, test } from 'vitest';

import { getFilters } from './filters.js';

interface DummyTest {
  documentId: string;
  name: string;
  numeric: number;
}

describe('Service Filters', () => {
  describe('Between', () => {
    test('filter between - With Numbers', () => {
      const filters = getFilters<DummyTest>({
        numeric: {
          between: {
            from: 10,
            to: 20,
          },
        },
      });
      expect(filters).toEqual({ numeric: { $gt: 10, $lt: 20 } });
    });

    test('filter between - With Null', () => {
      /* eslint-disable unicorn/no-null */
      const filters = getFilters<DummyTest>({
        numeric: {
          between: {
            from: null,
            to: null,
          },
        },
      });
      expect(filters).toEqual({});
    });
  });
});
