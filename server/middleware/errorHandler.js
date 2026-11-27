export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: 'The requested API endpoint was not found.',
  })
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error)

  const status = error.status || error.statusCode || 500
  const message = status >= 500 ? 'An unexpected server error occurred.' : error.message
  if (status >= 500) console.error('[api] Request failed with an internal server error.')

  return res.status(status).json({ success: false, message })
}
