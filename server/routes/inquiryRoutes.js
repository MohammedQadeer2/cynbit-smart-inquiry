import { Router } from 'express'
import { createInquiry } from '../controllers/inquiryController.js'
import { validateInquiry } from '../middleware/validateInquiry.js'

const router = Router()

router.post('/', validateInquiry, createInquiry)

export default router
