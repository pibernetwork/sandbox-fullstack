import { Container } from 'inversify';
import { beforeEach, describe, expect, test } from 'vitest';
import { mock, mockClear } from 'vitest-mock-extended';

import MyClass from '../libs/my-class.js';
import DataServices from './data-services.js';
import { TYPES } from './types.js';

describe('Data Services', () => {
  const container = mock<Container>();

  beforeEach(() => {
    mockClear(container);
  });

  test('Data Services - Create instance', () => {
    const dataServices = new DataServices(container);
    expect(dataServices).instanceOf(DataServices);
    expect(container.get).toHaveBeenCalled();
  });

  test('Data Services - Get My Class', () => {
    // prepare
    const myClass = mock<MyClass>();
    container.get.calledWith(TYPES.MyClass).mockReturnValue(myClass);

    // execute
    const dataServices = new DataServices(container);

    // assert
    expect(container.get).toHaveBeenCalledWith(TYPES.MyClass);
    expect(dataServices.myClass).toBe(myClass);
  });
});
