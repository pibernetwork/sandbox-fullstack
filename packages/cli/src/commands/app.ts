import { program } from 'commander';
import DataServices from 'library/src/containers/data-services.js';
import container from 'library/src/containers/inversify.config.js';

import items from '../actions/items.js';
import myAction from '../actions/my-action.js';

const { mongoDatabaseConnection } = new DataServices(container);

const app = program
  .name('CLI')
  .description('CLI program')
  .version('1.0.0')
  /* c8 ignore next 3 */
  .hook('preAction', async () => {
    await mongoDatabaseConnection.init();
  })
  /* c8 ignore next 3 */
  .hook('postAction', async () => {
    await mongoDatabaseConnection.close();
  });

app.addCommand(myAction);
app.addCommand(items);

export default app;
