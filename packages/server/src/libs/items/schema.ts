import gql from 'graphql-tag';
import { Resolvers } from '../../resolvers-types.js';

export const typeDefs = gql.default`
  type Item {
    _id: String!
    name: String
  }

  type Query {
    item(_id: String!): Item!
    items: [Item]
  }
`;

export const resolvers: Resolvers = {
  Query: {
    items: (_, __, context) => {
      return context.itemService.findAll();
    },
  },
};
