import { describe, expect, test } from 'vitest';

import MyClass from '../libs/my-class.js';
import DataContainer from './inversify.config.js';
import { TYPES } from './types.js';

describe('Data Container', () => {
  test('Data Container - My Class', () => {
    expect(DataContainer.get(TYPES.MyClass)).instanceOf(MyClass);
  });
});
