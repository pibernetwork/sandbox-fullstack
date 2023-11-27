import { describe, expect, test } from 'vitest';

import { resolvers, typeDefs } from './index.js';

describe('Test Graphql combinations', () => {
  test('Resolvers', () => {
    expect(resolvers).toBeDefined();
  });
  test('Type Defs', () => {
    expect(typeDefs).toBeDefined();
  });
});
