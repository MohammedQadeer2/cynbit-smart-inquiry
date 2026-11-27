import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import { isDatabaseConnected } from './config/db.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import inquiryRoutes from './routes/inquiryRoutes.js'

function allowedOrigins() {
  const configuredOrigins = (process.env.CLIENT_URL || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  return new Set([
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    'http://localhost:4173',
    ...configuredOrigins,
  ])
}

export function createApp() {
  const app = express()
  const origins = allowedOrigins()

  app.disable('x-powered-by')
  app.use(helmet())
  app.use(cors({
    origin(origin, callback) {
      if (!origin || origins.has(origin)) return callback(null, true)
      const error = new Error('This origin is not allowed.')
      error.status = 403
      return callback(error)
    },
  }))
  app.use(express.json({ limit: '10kb' }))

  app.get('/api/health', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Cynbit Smart Inquiry API is running.',
      database: {
        configured: Boolean(process.env.MONGODB_URI),
        connected: isDatabaseConnected(),
      },
    })
  })

  app.use(
    '/api/inquiries',
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 10,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
      message: {
        success: false,
        message: 'Too many inquiry attempts. Please try again later.',
      },
    }),
    inquiryRoutes,
  )

  app.use('/api', notFoundHandler)
  app.use(errorHandler)
  return app
}
