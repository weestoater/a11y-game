function Header({ onNavigateHome, showNav = false }) {
  return (
    <header role="banner" className="bg-primary text-white py-4 mb-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="display-4 mb-2">
              🕵️{" "}
              <span className="logo" aria-label="Accessibility">
                A11y
              </span>{" "}
              Code Detective
            </h1>
            <p className="lead mb-0">
              Master digital accessibility, one code snippet at a time
            </p>
          </div>
          {showNav && (
            <nav aria-label="Main navigation">
              <button
                onClick={onNavigateHome}
                className="btn btn-light"
                aria-label="Return to start screen"
              >
                🏠 Home
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
