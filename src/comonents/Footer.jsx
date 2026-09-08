function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a href="#home" className="footer-logo">
            TRATTORIA
          </a>

          <p>
            Authentic Italian flavors,
            <br />
            crafted with passion.
          </p>

          <div className="social-links">
            <a href="#" aria-label="Instagram">
              IG
            </a>

            <a href="#" aria-label="Facebook">
              FB
            </a>

            <a href="#" aria-label="TikTok">
              TK
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>

          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#gallery">Gallery</a>
          <a href="#reviews">Reviews</a>
        </div>

        <div className="footer-column">
          <h3>Visit</h3>

          <p>123 Main Street</p>
          <p>City Center</p>
          <p>Pakistan</p>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>

          <a href="tel:+923001234567">
            +92 300 1234567
          </a>

          <a href="mailto:hello@trattoria.com">
            hello@trattoria.com
          </a>

          <a href="#reservation" className="footer-reserve">
            Reserve a Table →
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Trattoria. All rights reserved.</p>

        <p>Made with passion for Italian cuisine.</p>
      </div>
    </footer>
  );
}

export default Footer;