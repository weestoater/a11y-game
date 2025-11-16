function Footer() {
  return (
    <footer role="contentinfo" className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <p className="mb-2">
          &copy; 2025 A11y Code Detective. Built with accessibility in mind.
        </p>
        <p className="mb-0">
          <a
            href="https://www.w3.org/WAI/standards-guidelines/wcag/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-decoration-underline"
          >
            Learn more about WCAG
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
