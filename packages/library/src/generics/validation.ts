import { z } from 'zod';

import { MongoDatabaseFieldError } from './types.js';

export function extractValidationMessages<T>(
  zodError: z.ZodError,
): MongoDatabaseFieldError<T>[] {
  const { issues } = zodError;

  const errors: MongoDatabaseFieldError<T>[] = issues.map((issue) => {
    const key = issue.path && (issue.path[0] as keyof T);

    const message = issue.message;
    const type = issue.code;

    return {
      key,
      message,
      type,
    };
  });

  return errors;
}
