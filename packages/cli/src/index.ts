import DataServices from './containers/data-services.js';
import container from './containers/inversify.config.js';

const { myClass } = new DataServices(container);

/* eslint-disable no-console */
console.log(myClass.myValue);
/* esline-enable no-console */

interface TestA {
  value: string;
}

const a: TestA = { value: '1234' };

/* eslint-disable no-console */
console.log(a);
/* esline-enable no-console */
