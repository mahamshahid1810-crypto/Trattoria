function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="contact-content">
        <p className="section-label">GET IN TOUCH</p>

        <h2>
          Come visit
          <br />
          <span>us.</span>
        </h2>

        <p>
          We would love to welcome you to Trattoria. Come enjoy
          authentic Italian food in a warm and elegant atmosphere.
        </p>

        <div className="contact-details">
          <div className="contact-item">
            <div className="contact-icon">📍</div>

            <div>
              <span>ADDRESS</span>
              <strong>123 Main Street, City Center</strong>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">📞</div>

            <div>
              <span>PHONE</span>
              <strong>+92 300 1234567</strong>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">✉️</div>

            <div>
              <span>EMAIL</span>
              <strong>hello@trattoria.com</strong>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">🕐</div>

            <div>
              <span>OPENING HOURS</span>
              <strong>Tue – Sun: 12 PM – 11 PM</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="map-placeholder">
        <div className="map-content">
          <div className="map-pin">📍</div>

          <h3>Find Trattoria</h3>

          <p>123 Main Street, City Center</p>

          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Maps →
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;