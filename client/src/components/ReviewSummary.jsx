const detailRows = [
  ['Service', 'service'],
  ['Budget', 'budget'],
  ['Timeline', 'timeline'],
  ['Project type', 'projectType'],
  ['Full name', 'fullName'],
  ['Email', 'email'],
  ['Company', 'company'],
  ['Industry', 'industry'],
]

function ReviewSummary({ form, onEdit }) {
  return (
    <section aria-labelledby="review-title">
      <h3 className="step-title" id="review-title">A quick review</h3>
      <p className="step-description">Everything look right? You can still go back and make changes.</p>
      <div className="review-card">
        {detailRows.map(([label, key]) => (
          <div className="review-row" key={key}>
            <dt>{label}</dt>
            <dd>{form[key] || 'Not provided'}</dd>
            {key === 'service' && <button type="button" onClick={() => onEdit(0)} aria-label="Edit service">Edit</button>}
            {key === 'fullName' && <button type="button" onClick={() => onEdit(2)} aria-label="Edit contact information">Edit</button>}
          </div>
        ))}
        <div className="review-description">
          <dt>Project description</dt>
          <dd>{form.description}</dd>
          <button type="button" onClick={() => onEdit(1)} aria-label="Edit project requirements">Edit</button>
        </div>
      </div>
      <p className="review-privacy"><span aria-hidden="true">⌑</span> Your information is only shared with the team responding to your project.</p>
    </section>
  )
}

export default ReviewSummary
