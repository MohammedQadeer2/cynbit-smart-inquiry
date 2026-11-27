import { serviceOptions } from '../data/inquiryOptions.js'

const services = [
  { mark: 'AI', description: 'Smarter workflows, agents & automation' },
  { mark: '</>', description: 'Web apps built for your next stage' },
  { mark: '{ }', description: 'Reliable APIs, platforms & integrations' },
  { mark: '☁', description: 'Scalable, secure cloud foundations' },
  { mark: '↗', description: 'Make your digital presence discoverable' },
]

function ServiceSelection({ value, error, onChange }) {
  return (
    <fieldset className="selection-fieldset">
      <legend className="step-title">What can we help you with?</legend>
      <p className="step-description">Choose the service that best matches your project.</p>
      <div className="service-grid" role="radiogroup" aria-label="Select a service">
        {serviceOptions.map((serviceName, index) => {
          const service = services[index]
          return (
            <button
              aria-checked={value === serviceName}
              className={`service-option${value === serviceName ? ' selected' : ''}`}
              key={serviceName}
              onClick={() => onChange(serviceName)}
              role="radio"
              type="button"
            >
              <span className="service-mark" aria-hidden="true">{service.mark}</span>
              <span className="service-copy">
                <strong>{serviceName}</strong>
                <span>{service.description}</span>
              </span>
              <span className="radio-indicator" aria-hidden="true" />
            </button>
          )
        })}
      </div>
      {error && <p className="field-error selection-error" role="alert">{error}</p>}
    </fieldset>
  )
}

export default ServiceSelection
