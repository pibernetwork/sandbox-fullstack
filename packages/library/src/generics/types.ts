import { Document, Filter, ObjectId, WithId } from 'mongodb';

// Services
export interface MongoDatabaseFieldError<T> {
  key: keyof T;
  message: string;
  type: string;
}

export type MongoDatabaseServiceReturn<T> = { node: null | WithId<T> } & {
  errors: MongoDatabaseFieldError<T>[];
};

export interface MongoDatabaseServiceConnectionPageInfo {
  end: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: null | number;
  page: number;
  prevPage: null | number;
  start: number;
  totalNodes: number;
  totalPages: number;
}

export interface MongoDatabaseServiceConnection<T> {
  nodes: T[];
  pageInfo: MongoDatabaseServiceConnectionPageInfo;
}

export interface MongoDatabaseServiceInterface<T extends Document> {
  deleteOne(documentId: string): Promise<boolean>;
  findAll(): Promise<WithId<T>[]>;
  findAllByIds(ids: readonly ObjectId[]): Promise<WithId<T>[]>;
  findAllByReference(
    referenceKey: string,
    referenceId: ObjectId,
  ): Promise<WithId<T>[]>;
  findAllConnection(
    options: MongoDatabaseServiceFindOptions<T>,
  ): Promise<MongoDatabaseServiceConnection<WithId<T>>>;
  findOne(documentId: string): Promise<null | WithId<T>>;
  insertMany(documents: T[]): Promise<ObjectId[]>;
  insertOne(documentToInsert: T): Promise<MongoDatabaseServiceReturn<T>>;
  updateOne(
    documentId: string,
    documentToUpdate: Partial<T | WithId<T>>,
  ): Promise<MongoDatabaseServiceReturn<T>>;
}

export interface FieldFilter {
  between?: {
    from?: unknown;
    to?: unknown;
  };
}

export type MongoDatabaseServiceFindFilters<T> = {
  [key in keyof Partial<T>]?: FieldFilter;
};

export interface MongoDatabaseServiceFindOptions<T> {
  filters: MongoDatabaseServiceFindFilters<T>;
  page: number;
  perPage: number;
  sortBy: keyof T;
  sortDirection: 'asc' | 'desc';
}

// Repository
export interface MongoDatabaseRepositoryFindOptions<T> {
  filters: Filter<T>;
  limit: number;
  skip: number;
  sortBy: keyof T;
  sortDirection: -1 | 1;
}

export interface MongoDatabaseRepositoryInterface<T extends Document> {
  deleteOne(documentId: string): Promise<boolean>;
  findAll(): Promise<WithId<T>[]>;
  findAllByIds(ids: readonly ObjectId[]): Promise<WithId<T>[]>;
  findAllConnection(
    options: MongoDatabaseRepositoryFindOptions<T>,
  ): Promise<WithId<T>[]>;

  findAllConnectionCount(filters: Filter<T>): Promise<number>;
  findAllFilter(filter: Filter<T>): Promise<WithId<T>[]>;
  findOne(documentId: string): Promise<WithId<T>>;

  insertMany(documents: T[]): Promise<ObjectId[]>;
  insertOne(documentToInsert: T): Promise<WithId<T>>;
  updateOne(
    documentId: string,
    documentToUpdate: T | WithId<T>,
  ): Promise<WithId<T>>;
}
