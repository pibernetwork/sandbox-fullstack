import { Collection, Document, MongoClient } from 'mongodb';

export interface Connection {
  close: () => Promise<void>;
  getClient: () => Promise<MongoClient>;
  getCollection<T extends Document>(
    collectionName: string,
  ): Promise<Collection<T>>;
  init: () => Promise<void>;
}
