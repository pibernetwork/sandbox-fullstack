import gql from 'graphql-tag';

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
