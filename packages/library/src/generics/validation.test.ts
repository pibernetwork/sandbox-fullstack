import { describe, expect, test } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { z } from 'zod';

import { extractValidationMessages } from './validation.js';

interface DummyTest {
  documentId: string;
  name: string;
}

describe('Zod Validation to Service Errors', () => {
  test('Receive zod validation and return service errors compatible message', () => {
    // run

    const issue: z.ZodIssue = {
      code: 'invalid_type',
      expected: 'string',
      message: 'Failed to accomplish the mission',
      path: ['documentId'],
      received: 'boolean',
    };

    const messages = extractValidationMessages<DummyTest>(
      mock<z.ZodError>({ issues: [issue] }),
    );

    expect(messages.length).toBe(1);

    expect(messages[0]?.key).toEqual(issue.path.join(','));
    expect(messages[0]?.message).toEqual(issue.message);
    expect(messages[0]?.type).toEqual(issue.code);
  });
});
