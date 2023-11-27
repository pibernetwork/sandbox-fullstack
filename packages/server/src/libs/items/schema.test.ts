import gql from 'graphql-tag';
import { assert, describe, expect, test } from 'vitest';

import ItemService from 'library/src/libs/items/service.js';
import { ItemWithId } from 'library/src/libs/items/types.js';
import { mock } from 'vitest-mock-extended';
import { mockContext, runTestQuery } from '../../graphql/utils.js';

describe('Items queries and mutations', () => {
  const contextValue = mockContext();
  const itemService = mock<ItemService>();

  const mockValues = [mock<ItemWithId>({ _id: '12345', name: 'my name' })];

  test('Query All', async () => {
    itemService.findAll.mockResolvedValue(mockValues);

    contextValue.itemService = itemService;

    const GET_QUERY = gql.default`
      query GetAllItems {
        items {
          _id
          name
        }
      }
    `;

    // run
    const response = await runTestQuery(GET_QUERY, {}, contextValue);

    // assert
    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.['items']).toBeDefined();

    const items = response.body.singleResult.data?.['items'] as ItemWithId[];

    expect(items[0]?._id).toBe(mockValues[0]?._id);
  });
});
