export function getDirection(sortDirection: 'asc' | 'desc') {
  const direction = sortDirection === 'asc' ? 1 : -1;
  return direction;
}
