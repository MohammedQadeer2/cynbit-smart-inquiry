function BrandHeader({ onStart }) {
  return (
    <header className="site-header">
      <a className="brand" href="https://cynbit.in/" target="_blank" rel="noreferrer" aria-label="Cynbit home">
        <span className="brand-symbol" aria-hidden="true">c</span>
        <span>cynbit<span className="brand-period">.</span></span>
      </a>
      <nav className="header-nav" aria-label="Main navigation">
        <a href="#how-it-works">How it works</a>
        <a href="https://cynbit.in/services/" target="_blank" rel="noreferrer">What we do <span aria-hidden="true">↗</span></a>
        <button className="header-cta" type="button" onClick={onStart}>Start a project <span aria-hidden="true">↗</span></button>
      </nav>
    </header>
  )
}

export default BrandHeader
