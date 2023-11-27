import gql from 'graphql-tag';
import { MongoDatabaseServiceFindOptions } from 'library/src/generics/types.js';
import { Item } from 'library/src/libs/items/types.js';
import { Resolvers } from '../../resolvers-types.js';

export const typeDefs = gql.default`
  type Item {
    _id: String!
    name: String
  }

  type ItemResponse {
    node: Item
    errors: [FormError!]
  }


  type ItemConnection {
    nodes: [Item!]
    pageInfo: PageInfo!
  }

  type Query {
    item(_id: String!): Item!
    items: [Item]
    itemsConnection(page: Int!, limit: Int!, sortBy: String!, sortOrder: String!): ItemConnection!
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
    itemsConnection: (_, args, context) => {
      const options: MongoDatabaseServiceFindOptions<Item> = {
        filters: {},
        page: args.page,
        perPage: args.limit,
        sortBy: args.sortBy as keyof Item,
        sortDirection: args.sortOrder as 'asc' | 'desc',
      };

      return context.itemService.findAllConnection(options);
    },
  },
};
