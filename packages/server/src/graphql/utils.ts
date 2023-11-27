import { ApolloServer } from '@apollo/server';
import { DocumentNode } from 'graphql';
import { beforeEach, expect } from 'vitest';
import { mock, mockReset } from 'vitest-mock-extended';

import ItemService from 'library/src/libs/items/service.js';
import MongoDatabaseConnection from 'library/src/utils/mongodb.js';
import MyClass from '../libs/my-class.js';
import { resolvers, typeDefs } from './../graphql/index.js';
import { GraphQLContext } from './types.js';

export async function runTestQuery(
  query: DocumentNode,
  variables: Record<string, unknown>,
  contextValue: GraphQLContext,
) {
  const server = new ApolloServer<GraphQLContext>({
    resolvers,
    typeDefs,
  });

  const response = await server.executeOperation(
    {
      query,
      variables,
    },
    {
      contextValue,
    },
  );
  expect(response.body.kind).toBe('single');

  return response;
}

export function mockContext() {
  const mongoDatabaseConnection = mock<MongoDatabaseConnection>();
  const myClass = mock<MyClass>();
  const itemService = mock<ItemService>();

  const contextValue: GraphQLContext = {
    itemService,
    mongoDatabaseConnection,
    myClass,
  };

  beforeEach(() => {
    mockReset(mongoDatabaseConnection);
    mockReset(itemService);
    mockReset(myClass);
  });

  return contextValue;
}
