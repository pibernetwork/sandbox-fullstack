/* eslint-disable max-lines */
import { Container } from 'inversify';

import ItemRepository from '../libs/items/repository.js';
import ItemService from '../libs/items/service.js';
import MyClass from '../libs/my-class.js';
import MongoDatabaseConnection from '../utils/mongodb.js';
import { TYPES } from './types.js';

const container = new Container();

container.bind<MyClass>(TYPES.MyClass).to(MyClass).inSingletonScope();

container
  .bind<MongoDatabaseConnection>(TYPES.MongoDatabaseConnection)
  .to(MongoDatabaseConnection)
  .inSingletonScope();

container.bind<ItemRepository>(TYPES.ItemRepository).to(ItemRepository);

container.bind<ItemService>(TYPES.ItemService).to(ItemService);

export default container;
