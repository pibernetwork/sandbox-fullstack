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


  type ItemResponse {
    node: Item
    errors: [FormError!]
  }

  type Mutation {
    addItem(name: String!): ItemResponse!
    editItem(_id: String! name: String!): ItemResponse!
    delItem(_id: String!): Boolean!
  }
`;

export const resolvers: Resolvers = {
  Mutation: {
    addItem: (_, args, context) => {
      return context.itemService.insertOne(args);
    },
    delItem: (_, args, context) => {
      const { _id } = args;
      return context.itemService.deleteOne(_id);
    },
    editItem: (_, args, context) => {
      const { _id, ...rest } = args;
      return context.itemService.updateOne(_id, rest);
    },
  },
  Query: {
    item: (_, args, context) => {
      return context.itemService.findOne(args._id);
    },
    items: (_, __, context) => {
      return context.itemService.findAll();
    },
  },
};
