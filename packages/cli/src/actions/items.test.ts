import { ItemService } from 'library/src/libs/items/types.js';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';

import items from './items.js';

vi.mock('library/src/containers/data-services.js', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      itemService: mock<ItemService>(),
    })),
  };
});

describe('Command line - My Action', () => {
  beforeEach(() => {
    global.console = mock<typeof global.console>({});
  });

  test('Name', () => {
    expect(items.name()).toBe('items:load');
  });

  test('Run my action', () => {
    expect(() => items.parse(['node', 'items:load'])).not.toThrow();
  });
});
