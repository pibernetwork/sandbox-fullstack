import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';

import Page from './+page.svelte';

describe('Test class', () => {
  test("doesn't pass prop", () => {
    render(Page);
    expect(screen.queryByText('Welcome to SvelteKit')).toBeInTheDocument();
  });
});
