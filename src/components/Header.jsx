function Header() {
  return (
    <header role="banner" className="bg-primary text-white py-4 mb-4">
      <div className="container">
        <h1 className="display-4 mb-2">
          <span className="logo" aria-label="Accessibility">
            A11y
          </span>{" "}
          Code Detective
        </h1>
        <p className="lead mb-0">
          Master digital accessibility, one code snippet at a time
        </p>
      </div>
    </header>
  );
}

export default Header;
