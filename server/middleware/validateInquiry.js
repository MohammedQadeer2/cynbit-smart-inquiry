import {
  budgetOptions,
  industryOptions,
  projectTypeOptions,
  serviceOptions,
  timelineOptions,
} from '../utils/inquiryOptions.js'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function getInquiryErrors(body) {
  const errors = {}
  const input = body && typeof body === 'object' && !Array.isArray(body) ? body : {}
  const fullName = typeof input.fullName === 'string' ? input.fullName.trim() : ''
  const email = typeof input.email === 'string' ? input.email.trim() : ''
  const description = typeof input.description === 'string' ? input.description.trim() : ''
  const company = typeof input.company === 'string' ? input.company.trim() : ''

  if (!fullName) errors.fullName = 'Full name is required.'
  else if (fullName.length > 100) errors.fullName = 'Full name must be 100 characters or fewer.'

  if (!email) errors.email = 'Email is required.'
  else if (email.length > 254 || !emailPattern.test(email)) errors.email = 'Enter a valid email address.'

  if (company.length > 120) errors.company = 'Company must be 120 characters or fewer.'
  if (!industryOptions.includes(input.industry)) errors.industry = 'Choose a valid industry.'
  if (!serviceOptions.includes(input.service)) errors.service = 'Choose a valid service.'
  if (description.length < 30) errors.description = 'Project description must be at least 30 characters.'
  else if (description.length > 2000) errors.description = 'Project description must be 2,000 characters or fewer.'
  if (!budgetOptions.includes(input.budget)) errors.budget = 'Choose a valid budget range.'
  if (!timelineOptions.includes(input.timeline)) errors.timeline = 'Choose a valid timeline.'
  if (!projectTypeOptions.includes(input.projectType)) errors.projectType = 'Choose a valid project type.'

  return {
    errors,
    inquiry: { fullName, email, company, industry: input.industry, service: input.service, description, budget: input.budget, timeline: input.timeline, projectType: input.projectType },
  }
}

export function validateInquiry(req, res, next) {
  const { errors, inquiry } = getInquiryErrors(req.body)
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please correct the highlighted fields.',
      errors,
    })
  }

  req.validatedInquiry = inquiry
  return next()
}
