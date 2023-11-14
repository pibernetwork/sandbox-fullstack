import { describe, expect, test } from 'vitest';

import MyClass from './my-class';

describe('Test class', () => {
  test('Check my value', () => {
    const myClass = new MyClass();
    expect(myClass.myValue).toBe(15);
  });
});
