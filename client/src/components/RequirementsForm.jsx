import FormField from './FormField.jsx'
import { budgetOptions, projectTypeOptions, timelineOptions } from '../data/inquiryOptions.js'

function RequirementsForm({ form, errors, onChange }) {
  return (
    <section aria-labelledby="requirements-title">
      <h3 className="step-title" id="requirements-title">A little more about the project</h3>
      <p className="step-description">There are no wrong answers. Share what you know so far.</p>
      <div className="form-grid">
        <FormField id="description" label="Project description" error={errors.description} className="field-full">
          <textarea
            id="description"
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? 'description-error' : undefined}
            maxLength={2000}
            onChange={(event) => onChange('description', event.target.value)}
            placeholder="What are you looking to build or improve? Tell us about the challenge..."
            rows={4}
            value={form.description}
          />
          <span className="character-count">{form.description.length}/2000</span>
        </FormField>
        <FormField id="budget" label="Estimated budget" error={errors.budget}>
          <select id="budget" aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? 'budget-error' : undefined} value={form.budget} onChange={(event) => onChange('budget', event.target.value)}>
            <option value="">Select a range</option>
            {budgetOptions.map((budget) => <option key={budget}>{budget}</option>)}
          </select>
        </FormField>
        <FormField id="timeline" label="Expected timeline" error={errors.timeline}>
          <select id="timeline" aria-invalid={Boolean(errors.timeline)} aria-describedby={errors.timeline ? 'timeline-error' : undefined} value={form.timeline} onChange={(event) => onChange('timeline', event.target.value)}>
            <option value="">Select a timeline</option>
            {timelineOptions.map((timeline) => <option key={timeline}>{timeline}</option>)}
          </select>
        </FormField>
        <FormField id="projectType" label="Project type" error={errors.projectType} className="field-full">
          <select id="projectType" aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? 'projectType-error' : undefined} value={form.projectType} onChange={(event) => onChange('projectType', event.target.value)}>
            <option value="">Choose what fits best</option>
            {projectTypeOptions.map((type) => <option key={type}>{type}</option>)}
          </select>
        </FormField>
      </div>
    </section>
  )
}

export default RequirementsForm
