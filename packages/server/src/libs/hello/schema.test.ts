import gql from 'graphql-tag';
import { assert, describe, expect, test } from 'vitest';

import { mockContext, runTestQuery } from '../../graphql/utils.js';

describe('Users Queries and Mutations', () => {
  const contextValue = mockContext();

  test('Query Hello', async () => {
    contextValue.myClass.myValue = 20;

    const GET_QUERY = gql.default`
      query Hello {
        hello
      }
    `;

    // run
    const response = await runTestQuery(GET_QUERY, {}, contextValue);

    // assert
    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.['hello']).toBeDefined();

    expect(response.body.singleResult.data?.['hello']).toBe('20');
  });
});
