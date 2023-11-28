import { render, screen } from '@testing-library/svelte';
import { describe, expect, test, vi } from 'vitest';

import Table from './table.svelte';

vi.mock('$houdini');

describe('Test class', () => {
  test("doesn't pass prop", () => {
    render(Table);
    expect(screen.queryByText('Items - Display items')).toBeInTheDocument();
  });
});
