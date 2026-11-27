import Inquiry from '../models/Inquiry.js'
import { isDatabaseConnected } from '../config/db.js'

export async function createInquiry(req, res, next) {
  if (!process.env.MONGODB_URI) {
    return res.status(503).json({
      success: false,
      message: 'Inquiry storage is not configured. Set MONGODB_URI on the server.',
    })
  }

  if (!isDatabaseConnected()) {
    return res.status(503).json({
      success: false,
      message: 'Inquiry storage is temporarily unavailable. Please try again later.',
    })
  }

  try {
    const inquiry = await Inquiry.create(req.validatedInquiry)
    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been received.',
      inquiryId: inquiry.id,
    })
  } catch (error) {
    return next(error)
  }
}
