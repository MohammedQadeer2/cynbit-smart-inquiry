function ProgressIndicator({ steps, currentStep }) {
  return (
    <div className="progress-wrap" aria-label={`Step ${currentStep + 1} of ${steps.length}`}>
      <div className="progress-track" aria-hidden="true">
        <span style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
      </div>
      <ol className="progress-steps">
        {steps.map((step, index) => (
          <li
            className={index === currentStep ? 'is-current' : index < currentStep ? 'is-done' : ''}
            key={step}
            aria-current={index === currentStep ? 'step' : undefined}
          >
            <span className="step-marker">{index < currentStep ? '✓' : `0${index + 1}`}</span>
            <span className="step-name">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default ProgressIndicator
