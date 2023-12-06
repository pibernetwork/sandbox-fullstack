import { inject, injectable } from 'inversify';
import { z } from 'zod';

import type { Item, ItemRepository } from './types.js';

import { TYPES } from '../../containers/types.js';
import GenericService from '../../generics/service.js';

@injectable()
class ItemService extends GenericService<Item> {
  constructor(@inject(TYPES.ItemRepository) userRepository: ItemRepository) {
    super(userRepository);
  }

  override getDocumentSchema(): z.ZodType<Item, z.ZodTypeDef, Item> {
    return z.object({
      name: z.string().min(1),
      quantity: z.number().positive(),
    }) satisfies z.ZodType<Item>;
  }
}

export default ItemService;
