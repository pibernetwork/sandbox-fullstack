import chalk from 'chalk';
import { Command } from 'commander';
import { table } from 'table';

import DataServices from '../containers/data-services.js';
import container from '../containers/inversify.config.js';

const myAction = new Command('my-action');

myAction.action(() => {
  const { myClass } = new DataServices(container);

  const data = [['My Action'], [chalk.bgGreenBright(myClass.myValue)]];

  /* eslint-disable no-console */
  console.log(table(data));
  /* eslint-enable no-console */
});

export default myAction;
