import gql from 'graphql-tag';

export const typeDefs = gql.default`

  type SelectOption {
    name: String!
    value: String!
  }

  type PageInfo {
    page: Int!
    nextPage: Int
    prevPage: Int
    hasNextPage: Boolean!
    hasPrevPage: Boolean!
    totalNodes: Int!
    totalPages: Int!
    start: Int!
    end: Int!
  }

  input FilterBetween {
    from: Float
    to: Float
  }

  type FormError {
    key: String!
    type: String!
    message: String!
  }


`;
