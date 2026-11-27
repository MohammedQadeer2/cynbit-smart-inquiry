import {
  budgetOptions,
  industryOptions,
  projectTypeOptions,
  serviceOptions,
  timelineOptions,
} from '../data/inquiryOptions.js'

export function validateService(form) {
  return serviceOptions.includes(form.service)
    ? {}
    : { service: 'Choose a service to continue.' }
}

export function validateRequirements(form) {
  const errors = {}
  const description = form.description?.trim() || ''

  if (description.length < 30) errors.description = 'Please describe your project in at least 30 characters.'
  if (description.length > 2000) errors.description = 'Keep your project description under 2,000 characters.'
  if (!budgetOptions.includes(form.budget)) errors.budget = 'Choose an estimated budget range.'
  if (!timelineOptions.includes(form.timeline)) errors.timeline = 'Choose an expected timeline.'
  if (!projectTypeOptions.includes(form.projectType)) errors.projectType = 'Choose a project type.'
  return errors
}

export function validateContact(form) {
  const errors = {}
  const email = form.email?.trim() || ''
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

  if (!form.fullName?.trim()) errors.fullName = 'Enter your full name.'
  else if (form.fullName.trim().length > 100) errors.fullName = 'Name must be 100 characters or fewer.'
  if (!email) errors.email = 'Enter your email address.'
  else if (email.length > 254 || !emailPattern.test(email)) errors.email = 'Enter a valid email address.'
  if (form.company?.trim().length > 120) errors.company = 'Company name must be 120 characters or fewer.'
  if (!industryOptions.includes(form.industry)) errors.industry = 'Choose your industry.'
  return errors
}
