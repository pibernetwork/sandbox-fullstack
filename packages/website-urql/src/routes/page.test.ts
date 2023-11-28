import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';

import Page from './+page.svelte';

describe('Test route /', () => {
  test('Render successful', () => {
    render(Page);
    expect(screen.queryByText('Welcome to SvelteKit')).toBeInTheDocument();
  });
});
