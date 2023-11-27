export function getPageInfo(page: number, totalNodes: number, perPage: number) {
  const totalPages = Math.ceil(totalNodes / perPage);

  if (page < 1) {
    throw new Error('Page is lower than 1');
  }

  if (totalPages < page) {
    throw new Error('Page is greater than total of pages');
  }

  const hasNextPage = page < totalPages;

  const hasPreviousPage = 1 < page && 0 < totalNodes;

  /* eslint-disable unicorn/no-null */
  return {
    start: hasPreviousPage ? (page - 1) * perPage + 1 : 1,
    end: hasNextPage ? page * perPage : totalNodes,
    hasNextPage,
    hasPrevPage: hasPreviousPage,
    nextPage: hasNextPage ? page + 1 : null,
    page,
    prevPage: hasPreviousPage ? page - 1 : null,
    totalNodes: totalNodes,
    totalPages: totalPages,
  };
}
