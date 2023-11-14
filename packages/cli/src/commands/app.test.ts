import { describe, expect, test } from 'vitest';

import app from './app.js';

describe('Program', () => {
  test('Load commands', () => {
    const names = app.commands.map((cmd) => cmd.name());

    expect(names).include('my-action');
  });
});
