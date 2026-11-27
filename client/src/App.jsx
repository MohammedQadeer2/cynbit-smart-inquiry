import { useRef, useState } from 'react'
import BrandHeader from './components/BrandHeader.jsx'
import ContactForm from './components/ContactForm.jsx'
import ProgressIndicator from './components/ProgressIndicator.jsx'
import RequirementsForm from './components/RequirementsForm.jsx'
import ReviewSummary from './components/ReviewSummary.jsx'
import ServiceSelection from './components/ServiceSelection.jsx'
import SuccessPanel from './components/SuccessPanel.jsx'
import { submitInquiry } from './services/inquiryApi.js'
import { validateContact, validateRequirements, validateService } from './utils/inquiryValidation.js'
import './App.css'

const initialForm = {
  service: '',
  description: '',
  budget: '',
  timeline: '',
  projectType: '',
  fullName: '',
  email: '',
  company: '',
  industry: '',
}

const steps = ['Service', 'Requirements', 'Contact', 'Review']

function App() {
  const [form, setForm] = useState(initialForm)
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const submissionLock = useRef(false)

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
    setSubmitError('')
  }

  const validateCurrentStep = () => {
    const validators = [validateService, validateRequirements, validateContact]
    const nextErrors = validators[step]?.(form) ?? {}
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const goNext = () => {
    if (validateCurrentStep()) {
      setErrors({})
      setStep((current) => Math.min(current + 1, steps.length - 1))
    }
  }

  const goBack = () => {
    setErrors({})
    setSubmitError('')
    setStep((current) => Math.max(current - 1, 0))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (step < steps.length - 1) {
      goNext()
      return
    }
    if (submissionLock.current) return

    submissionLock.current = true
    setIsSubmitting(true)
    setSubmitError('')
    try {
      await submitInquiry(form)
      setIsComplete(true)
    } catch (error) {
      const response = error.response?.data
      if (response?.errors) {
        setErrors(response.errors)
        setSubmitError(response.message || 'Please review the highlighted information.')
      } else {
        setSubmitError(
          response?.message ||
            'We could not submit your inquiry right now. Please try again in a moment.',
        )
      }
    } finally {
      submissionLock.current = false
      setIsSubmitting(false)
    }
  }

  const startOver = () => {
    setForm(initialForm)
    setErrors({})
    setSubmitError('')
    setStep(0)
    setIsComplete(false)
  }

  const goToForm = () => {
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app-shell">
      <BrandHeader onStart={goToForm} />

      <main>
        <section className="intro-section" aria-labelledby="page-title">
          <div className="intro-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT BIG IDEA STARTS HERE</p>
            <h1 id="page-title">Let&apos;s build something <span>great together.</span></h1>
            <p className="intro-description">
              Tell us a little about what you&apos;re working on. We&apos;ll connect you with the right
              people to make it happen.
            </p>
            <div className="intro-note">
              <span className="note-icon" aria-hidden="true">↗</span>
              <div>
                <strong>A better first conversation</strong>
                <p>A few thoughtful details help us come prepared with ideas, not just questions.</p>
              </div>
            </div>
            <div className="trust-line">
              <span className="trust-check" aria-hidden="true">✓</span>
              <span>Thoughtful teams. Practical solutions. Measurable impact.</span>
            </div>
          </div>

          <section className="inquiry-card" id="inquiry" aria-label="Project inquiry">
            {isComplete ? (
              <SuccessPanel onStartOver={startOver} />
            ) : (
              <>
                <div className="form-card-heading">
                  <div>
                    <p className="form-kicker">PROJECT INQUIRY</p>
                    <h2>Tell us about your project</h2>
                  </div>
                  <span className="time-estimate">2 min</span>
                </div>
                <ProgressIndicator steps={steps} currentStep={step} />

                <form onSubmit={handleSubmit} noValidate>
                  <div className="step-content" key={step}>
                    {step === 0 && (
                      <ServiceSelection
                        value={form.service}
                        error={errors.service}
                        onChange={(value) => updateForm('service', value)}
                      />
                    )}
                    {step === 1 && (
                      <RequirementsForm form={form} errors={errors} onChange={updateForm} />
                    )}
                    {step === 2 && (
                      <ContactForm form={form} errors={errors} onChange={updateForm} />
                    )}
                    {step === 3 && <ReviewSummary form={form} onEdit={setStep} />}
                  </div>

                  {submitError && (
                    <div className="form-alert" role="alert">
                      <span aria-hidden="true">!</span>
                      <p>{submitError}</p>
                    </div>
                  )}

                  <div className="form-actions">
                    {step > 0 ? (
                      <button
                        className="button button-secondary"
                        type="button"
                        onClick={goBack}
                        disabled={isSubmitting}
                      >
                        <span aria-hidden="true">←</span> Back
                      </button>
                    ) : (
                      <span className="secure-note"><span aria-hidden="true">⌑</span> Your details stay private</span>
                    )}
                    <button className="button button-primary" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <><span className="spinner" aria-hidden="true" /> Sending...</>
                      ) : step === steps.length - 1 ? (
                        <>Send inquiry <span aria-hidden="true">↗</span></>
                      ) : (
                        <>Continue <span aria-hidden="true">→</span></>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </section>
        </section>

        <section className="process-strip" id="how-it-works" aria-label="What happens next">
          <div className="process-heading">
            <p className="eyebrow">WHAT HAPPENS NEXT</p>
            <h2>Clear from the first hello.</h2>
          </div>
          <div className="process-item">
            <span className="process-number">01</span>
            <div><h3>We get to know your brief</h3><p>Your details go to the right team, so we can understand the real challenge.</p></div>
          </div>
          <div className="process-item">
            <span className="process-number">02</span>
            <div><h3>A real conversation</h3><p>We&apos;ll be in touch to ask the right questions and explore a good fit.</p></div>
          </div>
          <div className="process-item">
            <span className="process-number">03</span>
            <div><h3>A thoughtful way forward</h3><p>Leave with clear next steps tailored to your goals and timeline.</p></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="https://cynbit.in/" target="_blank" rel="noreferrer">cynbit<span>.</span></a>
        <p>Building what&apos;s next, together.</p>
        <a href="https://cynbit.in/" target="_blank" rel="noreferrer">Visit cynbit.in <span aria-hidden="true">↗</span></a>
      </footer>
    </div>
  )
}

export default App
