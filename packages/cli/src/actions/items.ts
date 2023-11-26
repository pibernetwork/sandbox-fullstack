import { Command } from 'commander';
import DataServices from 'library/src/containers/data-services.js';
import container from 'library/src/containers/inversify.config.js';

const items = new Command('items:load');

items.action(async () => {
  const { itemService } = new DataServices(container);

  const response = await itemService.insertMany([{ name: 'My Name' }]);

  /* eslint-disable no-console */
  console.log(response);
  /* eslint-enable no-console */
});

export default items;
