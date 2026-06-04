import { ErrorHandler } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { ZodError } from 'zod'

export const errorHandler: ErrorHandler = (err, c) => {
  // Zod validation errors
  if (err instanceof ZodError) {
    return c.json({
      error: 'Validation failed',
      details: err.errors.map((e) => ({
        field:   e.path.join('.'),
        message: e.message,
      })),
    }, 400)
  }

  // Hono HTTP exceptions
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status)
  }

  // Generic errors
  const isDev = process.env.NODE_ENV === 'development'
  console.error('Unhandled error:', err)

  return c.json({
    error: 'Internal server error',
    ...(isDev && { detail: err.message, stack: err.stack }),
  }, 500)
}
