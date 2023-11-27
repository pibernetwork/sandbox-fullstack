import dotenv from 'dotenv';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: `${__dirname}/../../../../.env` });

import { injectable } from 'inversify';
import { Collection, Document, MongoClient } from 'mongodb';

import { Connection } from './types.js';

const config = {
  connectTimeoutMS: 5000,
  socketTimeoutMS: 5000,
};

@injectable()
class MongoDatabaseConnection implements Connection {
  connectionInstance: MongoClient | undefined = undefined;

  database: string;
  url: string;

  constructor() {
    const mongoConnection = process.env['MONGODB_CONNECTION'];
    if (!mongoConnection) {
      throw new Error('Missing MONGODB_CONNECTION');
    }
    this.url = mongoConnection;

    const databaseDatabase = process.env['MONGODB_DATABASE'];
    if (!databaseDatabase) {
      throw new Error('Missing MONGODB_DATABASE');
    }

    this.database = databaseDatabase;
  }

  async close(): Promise<void> {
    if (!this.connectionInstance) {
      throw new Error('Missing connection instance');
    }

    await this.connectionInstance.close();
    this.connectionInstance = undefined;
  }

  async getClient(): Promise<MongoClient> {
    if (!this.connectionInstance) {
      throw new Error('Missing connection instance');
    }
    return this.connectionInstance;
  }

  async getCollection<T extends Document>(
    collectionName: string,
  ): Promise<Collection<T>> {
    const client = await this.getClient();

    const database = await client.db(this.database);
    return database.collection<T>(collectionName);
  }

  async init() {
    if (this.connectionInstance) {
      throw new Error('Only one instance of MongoDB is allowed');
    }

    const client = new MongoClient(this.url, config);
    await client.connect();

    this.connectionInstance = client;
  }
}

export default MongoDatabaseConnection;
