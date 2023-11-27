import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

import * as hello from '../libs/hello/schema.js';
import * as items from '../libs/items/schema.js';
import * as utils from '../libs/utils/schema.js';

export const resolvers = mergeResolvers([items.resolvers, hello.resolvers]);

export const typeDefs = mergeTypeDefs([
  items.typeDefs,
  hello.typeDefs,
  utils.typeDefs,
]);
