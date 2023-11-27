import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
  generates: {
    './src/resolvers-types.ts': {
      config: {
        useIndexSignature: true,
        contextType: './graphql/types.js#GraphQLContext',
        mappers: {
          Item: 'library/src/libs/items/types.js#ItemWithId',
        },
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};
export default config;
