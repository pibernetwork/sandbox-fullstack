import { Container } from 'inversify';

import MyClass from '../libs/my-class.js';
import { TYPES } from './types.js';

class DataServices {
  myClass: MyClass;

  constructor(container: Container) {
    this.myClass = container.get(TYPES.MyClass);
  }
}

export default DataServices;
