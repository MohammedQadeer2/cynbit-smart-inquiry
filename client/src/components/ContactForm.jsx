import FormField from './FormField.jsx'
import { industryOptions } from '../data/inquiryOptions.js'

function ContactForm({ form, errors, onChange }) {
  return (
    <section aria-labelledby="contact-title">
      <h3 className="step-title" id="contact-title">Who should we get back to?</h3>
      <p className="step-description">Share your details and we&apos;ll be in touch about your project.</p>
      <div className="form-grid">
        <FormField id="fullName" label="Full name" error={errors.fullName}>
          <input
            autoComplete="name"
            id="fullName"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            maxLength={100}
            onChange={(event) => onChange('fullName', event.target.value)}
            placeholder="e.g. Alex Morgan"
            value={form.fullName}
          />
        </FormField>
        <FormField id="email" label="Work email" error={errors.email}>
          <input
            autoComplete="email"
            id="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            maxLength={254}
            onChange={(event) => onChange('email', event.target.value)}
            placeholder="alex@company.com"
            type="email"
            value={form.email}
          />
        </FormField>
        <FormField id="company" label="Company" error={errors.company} hint="Optional">
          <input
            autoComplete="organization"
            id="company"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? 'company-error' : undefined}
            maxLength={120}
            onChange={(event) => onChange('company', event.target.value)}
            placeholder="Your company name"
            value={form.company}
          />
        </FormField>
        <FormField id="industry" label="Industry" error={errors.industry}>
          <select id="industry" aria-invalid={Boolean(errors.industry)} aria-describedby={errors.industry ? 'industry-error' : undefined} value={form.industry} onChange={(event) => onChange('industry', event.target.value)}>
            <option value="">Choose an industry</option>
            {industryOptions.map((industry) => <option key={industry}>{industry}</option>)}
          </select>
        </FormField>
      </div>
      <p className="privacy-note"><span aria-hidden="true">⌑</span> We&apos;ll only use these details to respond to your inquiry.</p>
    </section>
  )
}

export default ContactForm
