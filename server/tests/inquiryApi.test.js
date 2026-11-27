import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { createApp } from '../app.js'
import { getInquiryErrors } from '../middleware/validateInquiry.js'

const validInquiry = {
  fullName: 'Alex Morgan',
  email: 'alex@example.com',
  company: 'Example Co',
  industry: 'Technology',
  service: 'AI Automation',
  description: 'We need to automate a multi-step customer onboarding process.',
  budget: '$5,000 – $15,000',
  timeline: '1–3 months',
  projectType: 'Existing business',
}

let server
let baseUrl

before(async () => {
  const app = createApp()
  server = app.listen(0)
  await new Promise((resolve) => server.once('listening', resolve))
  baseUrl = `http://127.0.0.1:${server.address().port}`
})

after(async () => {
  if (server) await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
})

test('health endpoint reports API and database readiness without exposing credentials', async () => {
  const response = await fetch(`${baseUrl}/api/health`)
  const body = await response.json()

  assert.equal(response.status, 200)
  assert.equal(body.success, true)
  assert.equal(typeof body.database.configured, 'boolean')
  assert.equal(typeof body.database.connected, 'boolean')
  assert.equal(JSON.stringify(body).includes('mongodb+srv'), false)
})

test('missing inquiry fields return 400 with field-specific errors', async () => {
  const response = await fetch(`${baseUrl}/api/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  })
  const body = await response.json()

  assert.equal(response.status, 400)
  assert.equal(body.success, false)
  assert.ok(body.errors.fullName)
  assert.ok(body.errors.email)
  assert.ok(body.errors.service)
})

test('invalid email and short description are rejected', async () => {
  const response = await fetch(`${baseUrl}/api/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...validInquiry, email: 'not-an-email', description: 'too short' }),
  })
  const body = await response.json()

  assert.equal(response.status, 400)
  assert.equal(body.errors.email, 'Enter a valid email address.')
  assert.ok(body.errors.description)
})

test('valid inquiry data passes validation, but is not acknowledged without database persistence', async () => {
  const { errors } = getInquiryErrors(validInquiry)
  assert.deepEqual(errors, {})

  const response = await fetch(`${baseUrl}/api/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validInquiry),
  })
  const body = await response.json()

  assert.equal(response.status, 503)
  assert.equal(body.success, false)
  assert.match(body.message, /storage|configured|unavailable/i)
  assert.equal(body.inquiryId, undefined)
})

test('unknown API paths return a JSON 404', async () => {
  const response = await fetch(`${baseUrl}/api/private-inquiries`)
  const body = await response.json()

  assert.equal(response.status, 404)
  assert.equal(body.success, false)
})

test('untrusted browser origins are rejected by CORS', async () => {
  const response = await fetch(`${baseUrl}/api/health`, {
    headers: { Origin: 'https://untrusted.example' },
  })
  const body = await response.json()

  assert.equal(response.status, 403)
  assert.match(body.message, /origin is not allowed/i)
})
