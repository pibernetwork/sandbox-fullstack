import { faker } from '@faker-js/faker';
import { Command } from 'commander';
import DataServices from 'library/src/containers/data-services.js';
import container from 'library/src/containers/inversify.config.js';
import { Item } from 'library/src/libs/items/types';

const items = new Command('items:load');

export function createRandomUser(): Item {
  return {
    name: faker.person.fullName(),
    quantity: faker.number.int({ max: 2147483647, min: 0 }),
  };
}

items.action(async () => {
  const { itemService } = new DataServices(container);

  const items: Item[] = faker.helpers.multiple(createRandomUser, {
    count: 10 * 10 * 10 * 10 * 10 * 10,
  });

  const response = await itemService.insertMany(items);

  /* eslint-disable no-console */
  console.log(response);
  /* eslint-enable no-console */
});

export default items;
