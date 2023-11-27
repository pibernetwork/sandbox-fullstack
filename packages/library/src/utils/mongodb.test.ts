import { Collection, Db, MongoClient } from 'mongodb';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mock, mockReset } from 'vitest-mock-extended';

import MongoDatabaseConnection from './mongodb.js';

const mongoClientMock = mock<MongoClient>();
vi.mock('mongodb', () => {
  return {
    MongoClient: vi.fn().mockImplementation(() => {
      return mongoClientMock;
    }),
  };
});

describe('MongoDB connection', () => {
  beforeEach(() => {
    vi.stubEnv('MONGODB_CONNECTION', 'mongodb://127.0.0.1:27017');
    vi.stubEnv('MONGODB_DATABASE', 'sandbox-mock');

    mockReset(mongoClientMock);
  });

  test('MongoDB - Instance', async () => {
    // run
    const mongoDatabase = new MongoDatabaseConnection();
    expect(mongoDatabase).instanceOf(MongoDatabaseConnection);
  });

  test('MongoDB - Instance without MONGODB_CONNECTION', async () => {
    // setup
    vi.stubEnv('MONGODB_CONNECTION', '');

    expect(() => new MongoDatabaseConnection()).toThrow(
      /Missing MONGODB_CONNECTION/,
    );
  });

  test('MongoDB - Instance without MONGODB_DATABASE', async () => {
    // setup
    vi.stubEnv('MONGODB_DATABASE', '');

    expect(() => new MongoDatabaseConnection()).toThrow(
      /Missing MONGODB_DATABASE/,
    );
  });

  test('MongoDB - Try to use before initiate cause error', async () => {
    // run
    const mongoDatabase = new MongoDatabaseConnection();
    await expect(() => mongoDatabase.getClient()).rejects.toThrow(/Missing/);
    await expect(() => mongoDatabase.close()).rejects.toThrow(/Missing/);
    await expect(() => mongoDatabase.getCollection('test')).rejects.toThrow(
      /Missing/,
    );
  });

  test('MongoDB - Try to init twice return single connection', async () => {
    // run
    const mongoDatabase = new MongoDatabaseConnection();

    await mongoDatabase.init();
    await expect(() => mongoDatabase.init()).not.toThrow();
  });

  test('MongoDB - Init a connection', async () => {
    // run
    const mongoDatabase = new MongoDatabaseConnection();

    await mongoDatabase.init();

    const client = await mongoDatabase.getClient();

    expect(client).toBeDefined();
  });

  test('MongoDB - Get a collection', async () => {
    // setup
    const databaseMock = mock<Db>();
    mongoClientMock.db.mockResolvedValue(databaseMock);

    const collectionMock = mock<Collection>();
    databaseMock.collection.mockResolvedValue(collectionMock);

    // run
    const mongoDatabase = new MongoDatabaseConnection();
    await mongoDatabase.init();

    const collection = await mongoDatabase.getCollection('test');

    // assert
    expect(collection).toBe(collectionMock);
  });

  test('MongoDB - Close connection', async () => {
    // run
    const mongoDatabase = new MongoDatabaseConnection();

    await mongoDatabase.init();

    await mongoDatabase.close();

    // assert
    await expect(() => mongoDatabase.getClient()).rejects.toThrow(/Missing/);
  });
});
