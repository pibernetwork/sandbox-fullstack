import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';

import MyClass from '../libs/my-class.js';
import myAction from './my-action.js';

vi.mock('../containers/data-services.js', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      myClass: mock<MyClass>({ myValue: 10 }),
    })),
  };
});

describe('Command line - My Action', () => {
  beforeEach(() => {
    global.console = mock<typeof global.console>({});
  });

  test('Name', () => {
    expect(myAction.name()).toBe('my-action');
  });

  test('Run my action', () => {
    expect(() => myAction.parse(['node', 'my-action'])).not.toThrow();
  });
});
