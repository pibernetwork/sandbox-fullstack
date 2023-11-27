import { Filter } from 'mongodb';

import { MongoDatabaseServiceFindFilters } from './types.js';

export function getFilters<T>(filters: MongoDatabaseServiceFindFilters<T>) {
  const queryFilter: Filter<T> = {};

  const filtersKeys = Object.keys(filters) as (keyof typeof filters)[];

  for (const fieldName of filtersKeys) {
    const fieldFilter = filters[fieldName];

    if (fieldFilter && 'between' in fieldFilter) {
      const { between } = fieldFilter;

      const { from, to } = between;

      if (!to && !from) {
        /** @TODO clean this continue when implement new type */
        continue;
      }

      const name = fieldName as keyof Filter<T>;
      queryFilter[name] = {};

      if (from) {
        queryFilter[name].$gt = from;
      }
      if (to) {
        queryFilter[name].$lt = to;
      }
    }
  }

  return queryFilter;
}
