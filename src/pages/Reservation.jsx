import { useState } from "react";

function Reservation() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="reservation section" id="reservation">
      <div className="reservation-content">
        <p className="section-label">RESERVATIONS</p>

        <h2>
          Your table
          <br />
          <span>awaits.</span>
        </h2>

        <p>
          Join us for an unforgettable Italian dining experience.
          Reserve your table and let us take care of the rest.
        </p>

        <div className="reservation-info">
          <div>
            <strong>Tuesday – Sunday</strong>
            <span>12:00 PM – 11:00 PM</span>
          </div>

          <div>
            <strong>Monday</strong>
            <span>Closed</span>
          </div>
        </div>
      </div>

      <form className="reservation-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              placeholder="+92 300 1234567"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="guests">Guests</label>
            <select id="guests" required defaultValue="">
              <option value="" disabled>
                Number of guests
              </option>
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5 Guests</option>
              <option value="6">6 Guests</option>
              <option value="7">7 Guests</option>
              <option value="8">8 Guests</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input id="date" type="date" required />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input id="time" type="time" required />
          </div>
        </div>

        <button type="submit" className="reserve-submit">
          Reserve Table
        </button>

        {submitted && (
          <p className="success-message">
            ✓ Thank you! Your reservation request has been received.
          </p>
        )}
      </form>
    </section>
  );
}

export default Reservation;