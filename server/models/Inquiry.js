import mongoose from 'mongoose'
import {
  budgetOptions,
  industryOptions,
  projectTypeOptions,
  serviceOptions,
  timelineOptions,
} from '../utils/inquiryOptions.js'

const inquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    company: { type: String, trim: true, maxlength: 120, default: '' },
    industry: { type: String, required: true, enum: industryOptions },
    service: { type: String, required: true, enum: serviceOptions },
    description: { type: String, required: true, trim: true, minlength: 30, maxlength: 2000 },
    budget: { type: String, required: true, enum: budgetOptions },
    timeline: { type: String, required: true, enum: timelineOptions },
    projectType: { type: String, required: true, enum: projectTypeOptions },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
)

const Inquiry = mongoose.model('Inquiry', inquirySchema)

export default Inquiry
