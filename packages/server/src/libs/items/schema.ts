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
    item: (_, args, context) => {
      return context.itemService.findOne(args._id);
    },
    items: (_, __, context) => {
      return context.itemService.findAll();
    },
  },
};
