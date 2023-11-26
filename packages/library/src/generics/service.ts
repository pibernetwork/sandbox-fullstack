import DataLoader from 'dataloader';
import { injectable } from 'inversify';
import { Document, Filter, ObjectId, WithId } from 'mongodb';
import { z } from 'zod';

import type {
  MongoDatabaseRepositoryInterface,
  MongoDatabaseServiceConnection,
  MongoDatabaseServiceFindOptions,
  MongoDatabaseServiceInterface,
  MongoDatabaseServiceReturn,
} from './types.js';

import { getFilters } from './filters.js';
import { getPageInfo } from './paginator.js';
import { getDirection } from './sorts.js';
import { extractValidationMessages } from './validation.js';

@injectable()
abstract class GenericService<T extends Document>
  implements MongoDatabaseServiceInterface<T>
{
  private repository: MongoDatabaseRepositoryInterface<T>;

  constructor(repository: MongoDatabaseRepositoryInterface<T>) {
    this.repository = repository;
  }

  // find one

  async deleteOne(documentId: string) {
    return this.repository.deleteOne(documentId);
  }

  // find all

  documentsToIds(
    _ids: readonly ObjectId[],
    documents: WithId<T>[],
  ): WithId<T>[] {
    return _ids.map((_id) => {
      const documentsDatabase = documents.find(
        (document: WithId<T>) => document._id.equals(_id) || false,
      );

      if (!documentsDatabase) {
        throw new Error(
          'Data loader not able to find document for provided id',
        );
      }
      return documentsDatabase;
    });
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findAllByIds(ids: readonly ObjectId[]) {
    return this.repository.findAllByIds(ids);
  }

  async findAllByReference(referenceKey: string, referenceId: ObjectId) {
    return this.repository.findAllFilter({
      [referenceKey]: { $eq: referenceId },
    } as unknown as Filter<T>);
  }

  async findAllConnection(
    options: MongoDatabaseServiceFindOptions<T>,
  ): Promise<MongoDatabaseServiceConnection<WithId<T>>> {
    const { filters, page, perPage, sortBy, sortDirection } = options;

    const skip = (page - 1) * perPage;
    const limit = perPage;

    const direction = getDirection(sortDirection);

    const queryFilter = getFilters(filters);

    const documents = await this.repository.findAllConnection({
      filters: queryFilter,
      limit: limit,
      skip,
      sortBy: sortBy as keyof T,
      sortDirection: direction,
    });

    const totalNodes =
      await this.repository.findAllConnectionCount(queryFilter);

    return {
      nodes: documents,
      pageInfo: getPageInfo(page, totalNodes, perPage),
    };
  }

  async findOne(documentId: string) {
    return this.repository.findOne(documentId);
  }

  // update

  /* c8 ignore start */
  getDocumentSchema(): z.ZodType<T> {
    throw new Error('Calling a method from abstract class');
  }

  getLoader() {
    return new DataLoader<ObjectId, WithId<T>>(
      async (keys: readonly ObjectId[]) => {
        const documents = await this.getRepository().findAllByIds(keys);
        return this.documentsToIds(keys, documents);
      },
    );
  }

  // utils

  getRepository() {
    return this.repository;
  }

  async insertMany(documents: T[]): Promise<ObjectId[]> {
    const ids = await this.repository.insertMany(documents);
    return ids;
  }

  // insert
  async insertOne(
    documentToInsert: Partial<T>,
  ): Promise<MongoDatabaseServiceReturn<T>> {
    try {
      this.parseValidation(documentToInsert);

      const node = await this.repository.insertOne(documentToInsert as T);
      return {
        errors: [],
        node,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = extractValidationMessages<T>(error);

        return {
          errors,
          /* eslint-disable unicorn/no-null */
          node: null,
          /* eslint-enable unicorn/no-null */
        };
      }

      throw error;
    }
  }

  parseValidation(documentToValidate: Partial<T>) {
    this.getDocumentSchema().parse(documentToValidate);
  }

  async updateOne(
    documentId: string,
    documentToUpdate: Partial<T>,
  ): Promise<MongoDatabaseServiceReturn<T>> {
    try {
      this.parseValidation(documentToUpdate);
      const node = await this.repository.updateOne(
        documentId,
        documentToUpdate as T,
      );
      return {
        errors: [],
        node,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = extractValidationMessages<T>(error);

        return {
          errors,
          /* eslint-disable unicorn/no-null */
          node: null,
          /* eslint-enable unicorn/no-null */
        };
      }

      throw error;
    }
  }
}

export default GenericService;
