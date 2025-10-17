/**
 * Custom API Error class for better error handling
 */
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
    Object.setPrototypeOf(this, APIError.prototype);
  }

  toJSON() {
    return {
      error: {
        message: this.message,
        code: this.code,
        statusCode: this.statusCode,
      },
    };
  }
}

/**
 * Error response helper
 */
export function createErrorResponse(
  error: unknown,
  defaultMessage = 'An unexpected error occurred'
) {
  if (error instanceof APIError) {
    return {
      error: {
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
      },
      status: error.statusCode,
    };
  }

  if (error instanceof Error) {
    return {
      error: {
        message: process.env.NODE_ENV === 'development' ? error.message : defaultMessage,
        statusCode: 500,
      },
      status: 500,
    };
  }

  return {
    error: {
      message: defaultMessage,
      statusCode: 500,
    },
    status: 500,
  };
}

/**
 * Async error handler wrapper for API routes
 */
export function asyncHandler<T extends (...args: any[]) => Promise<any>>(
  handler: T
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await handler(...args);
    } catch (error) {
      const errorResponse = createErrorResponse(error);
      throw new APIError(
        errorResponse.error.message,
        errorResponse.error.statusCode,
        errorResponse.error.code
      );
    }
  }) as T;
}

/**
 * Validation error
 */
export class ValidationError extends APIError {
  constructor(message: string, public fields?: Record<string, string>) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }

  toJSON() {
    return {
      error: {
        message: this.message,
        code: this.code,
        statusCode: this.statusCode,
        fields: this.fields,
      },
    };
  }
}

/**
 * Not found error
 */
export class NotFoundError extends APIError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

/**
 * Unauthorized error
 */
export class UnauthorizedError extends APIError {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

/**
 * Forbidden error
 */
export class ForbiddenError extends APIError {
  constructor(message = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
    this.name = 'ForbiddenError';
  }
}

/**
 * Rate limit error
 */
export class RateLimitError extends APIError {
  constructor(message = 'Too many requests') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
    this.name = 'RateLimitError';
  }
}
