import chalk from 'chalk';
import { Command } from 'commander';

import DataServices from '../containers/data-services.js';
import container from '../containers/inversify.config.js';

const myAction = new Command('my-action');

myAction.action(() => {
  const { myClass } = new DataServices(container);

  /* eslint-disable no-console */
  console.log(chalk.bgGreenBright(myClass.myValue));
  /* eslint-enable no-console */
});

export default myAction;
