import { render, screen } from '@testing-library/svelte';
import { describe, expect, test, vi } from 'vitest';

import Page from './+page.svelte';

vi.mock('$houdini');

describe('Test class', () => {
  test("doesn't pass prop", () => {
    render(Page);
    expect(screen.queryByText('Items')).toBeInTheDocument();
  });
});
