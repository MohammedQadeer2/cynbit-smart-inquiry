function SuccessPanel({ onStartOver }) {
  return (
    <section className="success-panel" aria-live="polite" aria-labelledby="success-title">
      <div className="success-icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="23" />
          <path d="m14 24 7 7 14-15" />
        </svg>
      </div>
      <p className="form-kicker">INQUIRY RECEIVED</p>
      <h2 id="success-title">Thanks for reaching out.</h2>
      <p className="success-copy">
        Your project details are with our team. We&apos;ll review your inquiry and get back to you soon.
      </p>
      <div className="success-next">
        <span className="success-next-number">01</span>
        <p><strong>What happens next?</strong><br />A member of our team will be in touch to continue the conversation.</p>
      </div>
      <button className="button button-secondary success-reset" type="button" onClick={onStartOver}>Send another inquiry</button>
    </section>
  )
}

export default SuccessPanel
