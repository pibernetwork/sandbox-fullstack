import gql from 'graphql-tag';

import { Resolvers } from './../../resolvers-types.js';

export const typeDefs = gql.default`
  type Query {
    hello: String
  }
`;

export const resolvers: Resolvers = {
  Query: {
    hello: (_, __, context) => context.myClass.myValue.toString(),
  },
};
