import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

import * as hello from '../libs/hello/schema.js';
import * as users from '../libs/items/schema.js';

export const resolvers = mergeResolvers([hello.resolvers]);

export const typeDefs = mergeTypeDefs([users.typeDefs, hello.typeDefs]);
