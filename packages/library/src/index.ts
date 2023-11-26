import DataServices from './containers/data-services.js';
import container from './containers/inversify.config.js';

const { itemService } = new DataServices(container);

/* eslint-disable no-console */
console.log(itemService);

interface TestA {
  value: string;
}

const a: TestA = { value: '1234' };

/* eslint-disable no-console */
console.log(a);
/* esline-enable no-console */
