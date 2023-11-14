import { describe, expect, test } from 'vitest';

import MyClass from './my-class.js';

describe('Test class', () => {
  test('Check my value', () => {
    const myClass = new MyClass();
    expect(myClass.myValue).toBe(15);
  });
});
