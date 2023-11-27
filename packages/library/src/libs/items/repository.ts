import { injectable } from 'inversify';

import GenericRepository from '../../generics/repository.js';
import { Item } from './types.js';

@injectable()
class ItemRepository extends GenericRepository<Item> {
  override collectionName: string | undefined = 'item';
}

export default ItemRepository;
