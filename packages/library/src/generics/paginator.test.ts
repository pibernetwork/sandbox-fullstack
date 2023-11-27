import { describe, expect, test } from 'vitest';

import { getPageInfo } from './paginator.js';

describe('Paginator', () => {
  test('Page is over total pages', () => {
    expect(() => getPageInfo(11, 100, 10)).toThrow(/greater/);
  });

  test('Page is above 1', () => {
    expect(() => getPageInfo(0, 100, 10)).toThrow(/lower/);
  });

  test('Paginator with Prev and Next', () => {
    const pageInfo = getPageInfo(5, 100, 10);

    expect(pageInfo.page).toBe(5);
    expect(pageInfo.totalPages).toBe(10);
    expect(pageInfo.hasNextPage).toBeTruthy();
    expect(pageInfo.hasPrevPage).toBeTruthy();
  });

  test('Paginator without Prev', () => {
    const pageInfo = getPageInfo(1, 100, 10);

    expect(pageInfo.hasPrevPage).toBeFalsy();
    expect(pageInfo.hasNextPage).toBeTruthy();
  });

  test('Paginator without Next', () => {
    const pageInfo = getPageInfo(10, 100, 10);

    expect(pageInfo.hasNextPage).toBeFalsy();
    expect(pageInfo.hasPrevPage).toBeTruthy();
  });
});
