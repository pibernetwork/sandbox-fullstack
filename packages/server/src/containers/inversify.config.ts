/* eslint-disable max-lines */
import { Container } from 'inversify';

import MyClass from '../libs/my-class.js';
import { TYPES } from './types.js';

const container = new Container();

container.bind<MyClass>(TYPES.MyClass).to(MyClass).inSingletonScope();

export default container;
