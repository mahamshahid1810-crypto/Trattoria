function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <p className="hero-small">WELCOME TO TRATTORIA</p>

        <h1>
          Authentic Taste,
          <br />
          <span>Crafted With Passion</span>
        </h1>

        <p className="hero-description">
          Experience the rich flavors of Italy with handmade pasta,
          wood-fired pizza and unforgettable dining moments.
        </p>

        <div className="hero-buttons">
          <a href="#menu" className="btn btn-primary">
            Explore Menu
          </a>

          <a href="#reservation" className="btn btn-secondary">
            Reserve a Table
          </a>
        </div>
      </div>

      <div className="scroll-down">
        <span></span>
        Scroll to explore
      </div>
    </section>
  );
}

export default Hero;