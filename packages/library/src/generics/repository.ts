import { inject, injectable } from 'inversify';
import {
  Collection,
  Document,
  Filter,
  ObjectId,
  OptionalUnlessRequiredId,
  WithId,
} from 'mongodb';

import type { Connection } from '../utils/types.js';

import { TYPES } from '../containers/types.js';
import {
  MongoDatabaseRepositoryFindOptions,
  MongoDatabaseRepositoryInterface,
} from './types.js';

@injectable()
abstract class GenericRepository<T extends Document>
  implements MongoDatabaseRepositoryInterface<T>
{
  private connection: Connection;
  collectionName: string | undefined = undefined;

  constructor(@inject(TYPES.MongoDatabaseConnection) connection: Connection) {
    this.connection = connection;
  }

  async deleteOne(documentId: string) {
    await this.findOne(documentId);

    const collection = await this.getCollection(this.collectionName);

    await collection.deleteOne({
      _id: new ObjectId(documentId),
    } as unknown as Filter<T>);

    return true;
  }

  async findAll(): Promise<WithId<T>[]> {
    const collection = await this.getCollection(this.collectionName);

    return collection.find({}).toArray();
  }

  async findAllByIds(ids: readonly ObjectId[]): Promise<WithId<T>[]> {
    const collection = await this.getCollection(this.collectionName);

    return await collection
      .find({
        _id: { $in: ids } as Filter<T>,
      })

      .toArray();
  }

  // find
  async findAllConnection(
    options: MongoDatabaseRepositoryFindOptions<T>,
  ): Promise<WithId<T>[]> {
    const collection = await this.getCollection(this.collectionName);

    const { filters, limit, skip, sortBy, sortDirection } = options;

    return (
      collection
        /* eslint-disable unicorn/no-array-callback-reference */
        .find(filters)
        /* eslint-enable unicorn/no-array-callback-reference */
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortDirection })
        .toArray()
    );
  }

  async findAllConnectionCount(filters: Filter<T> = {}) {
    const collection = await this.getCollection(this.collectionName);

    return collection.countDocuments(filters);
  }

  async findAllFilter(filter: Filter<T>): Promise<WithId<T>[]> {
    const collection = await this.getCollection(this.collectionName);

    /* eslint-disable unicorn/no-array-callback-reference */
    return collection.find(filter).toArray();
    /* eslint-enable unicorn/no-array-callback-reference */
  }

  async findOne(documentId: string): Promise<WithId<T>> {
    const collection = await this.getCollection(this.collectionName);

    const document = await collection.findOne({
      _id: { $eq: new ObjectId(documentId) } as unknown as Filter<T>,
    });

    if (!document) {
      throw new Error('Document not found');
    }

    return document;
  }

  async getCollection(collectionName?: string): Promise<Collection<T>> {
    if (collectionName === undefined) {
      throw new Error('Missing collection name');
    }
    return this.connection.getCollection<T>(collectionName);
  }

  async insertMany(documents: T[]): Promise<ObjectId[]> {
    const collection = await this.getCollection(this.collectionName);

    const document = await collection.insertMany(
      documents as unknown as OptionalUnlessRequiredId<T>[],
    );

    if (!document.acknowledged) {
      throw new Error('Error in insert many');
    }

    const ids = Object.values(document.insertedIds);

    return ids;
  }

  async insertOne(documentToInsert: T): Promise<WithId<T>> {
    const collection = await this.getCollection(this.collectionName);

    const document = await collection.insertOne(
      documentToInsert as unknown as OptionalUnlessRequiredId<T>,
    );

    const id = document.insertedId;

    return {
      ...documentToInsert,
      _id: id,
    } as unknown as WithId<T>;
  }

  async updateOne(documentId: string, documentToUpdate: T): Promise<WithId<T>> {
    const currentMessage = await this.findOne(documentId);

    const newMessage: WithId<T> = { ...currentMessage, ...documentToUpdate };

    const collection = await this.getCollection(this.collectionName);

    //const document =
    await collection.updateOne(
      { _id: { $eq: new ObjectId(documentId) } } as unknown as Filter<T>,
      { $set: newMessage } as unknown as Readonly<Partial<T>>,
    );

    return newMessage;
  }
}

export default GenericRepository;
