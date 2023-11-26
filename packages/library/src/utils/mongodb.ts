import dotenv from 'dotenv';
import { injectable } from 'inversify';
import { Collection, Document, MongoClient } from 'mongodb';

import { Connection } from './types.js';

dotenv.config();

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
    const DB_CONNECTION_STRING = process.env['DB_CONNECTION_STRING'];
    if (!DB_CONNECTION_STRING) {
      throw new Error('Missing DB_CONNECTION_STRING');
    }
    this.url = DB_CONNECTION_STRING;

    const DB_DATABASE = process.env['DB_DATABASE'];
    if (!DB_DATABASE) {
      throw new Error('Missing DB_DATABASE');
    }

    this.database = DB_DATABASE;
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
