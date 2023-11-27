import { WithId } from 'mongodb';

import {
  MongoDatabaseRepositoryInterface,
  MongoDatabaseServiceInterface,
} from '../../generics/types.js';

export interface Item {
  name: string;
}

export type ItemWithId = WithId<Item>;

export type ItemRepository = MongoDatabaseRepositoryInterface<Item>;

export type ItemService = MongoDatabaseServiceInterface<Item>;
