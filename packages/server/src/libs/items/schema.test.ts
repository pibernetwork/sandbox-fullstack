import gql from 'graphql-tag';
import { assert, describe, expect, test } from 'vitest';

import ItemService from 'library/src/libs/items/service.js';
import { ItemWithId } from 'library/src/libs/items/types.js';
import { mock } from 'vitest-mock-extended';
import { mockContext, runTestQuery } from '../../graphql/utils.js';

describe('Items queries and mutations', () => {
  const contextValue = mockContext();
  const itemService = mock<ItemService>();

  const mockItem = mock<ItemWithId>({ _id: '12345', name: 'my name' });

  const mockValues = [mockItem];

  test('Query All', async () => {
    itemService.findAll.mockResolvedValue(mockValues);

    contextValue.itemService = itemService;

    const QUERY = gql.default`
      query GetAllItems {
        items {
          _id
          name
        }
      }
    `;

    // run
    const response = await runTestQuery(QUERY, {}, contextValue);

    // assert
    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.['items']).toBeDefined();

    const items = response.body.singleResult.data?.['items'] as ItemWithId[];

    expect(items[0]?._id).toBe(mockValues[0]?._id);
  });

  test('Query One', async () => {
    itemService.findOne.mockResolvedValue(mockItem);

    contextValue.itemService = itemService;

    const QUERY = gql.default`
      query GetAllItems {
        item(_id: "12345") {
          _id
          name
        }
      }
    `;

    // run
    const response = await runTestQuery(QUERY, {}, contextValue);

    // assert
    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.['item']).toBeDefined();

    const item = response.body.singleResult.data?.['item'] as ItemWithId;

    expect(item._id).toBe(mockItem._id);
  });

  test('Add item', async () => {
    itemService.insertOne.mockResolvedValue({ errors: [], node: mockItem });

    contextValue.itemService = itemService;

    const QUERY = gql.default`
    mutation {
      addItem(name: "Name") {
        node {
          _id
          name
        }
        errors {
          key
          type
          message
        }
      }
    }
  `;

    // run
    const response = await runTestQuery(QUERY, {}, contextValue);

    // assert
    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.['addItem']).toBeDefined();
  });
});
