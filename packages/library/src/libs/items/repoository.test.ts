import { expect, test } from 'vitest';
import { mock } from 'vitest-mock-extended';

import { Connection } from '../../utils/types.js';
import ItemRepository from './repository.js';

const connectionMock = mock<Connection>();

test('Repository - Instance', async () => {
  // run
  const repository = new ItemRepository(connectionMock);

  // expect
  expect(repository).instanceOf(ItemRepository);
});
