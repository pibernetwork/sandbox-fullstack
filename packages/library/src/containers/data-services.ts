import { Container } from 'inversify';

import ItemService from '../libs/items/service.js';
import MyClass from '../libs/my-class.js';
import MongoDatabaseConnection from '../utils/mongodb.js';
import { TYPES } from './types.js';

class DataServices {
  itemService: ItemService;
  mongoDatabaseConnection: MongoDatabaseConnection;
  myClass: MyClass;

  constructor(container: Container) {
    this.myClass = container.get(TYPES.MyClass);
    this.mongoDatabaseConnection = container.get(TYPES.MongoDatabaseConnection);
    this.itemService = container.get(TYPES.ItemService);
  }
}

export default DataServices;
