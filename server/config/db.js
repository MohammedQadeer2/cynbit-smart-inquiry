import mongoose from 'mongoose'

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.warn('[database] MONGODB_URI is not configured; inquiry submission is unavailable.')
    return false
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
    console.log('[database] MongoDB connected.')
    return true
  } catch {
    console.error('[database] MongoDB connection failed. Check MONGODB_URI and Atlas network access.')
    return false
  }
}

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1
}
