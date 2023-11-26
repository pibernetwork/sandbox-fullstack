import { expect, test } from 'vitest';
import { mock } from 'vitest-mock-extended';

import ItemService from './service.js';
import { ItemRepository } from './types.js';

const repositoryMock = mock<ItemRepository>();

test('Service - Instance', async () => {
  // run
  const service = new ItemService(repositoryMock);

  // expect
  expect(service).instanceOf(ItemService);
});

test('Service - Validate', async () => {
  // run
  const service = new ItemService(repositoryMock);

  // expect
  expect(() => service.parseValidation({})).toThrow();
});
