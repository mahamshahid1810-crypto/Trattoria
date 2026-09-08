function About() {
  return (
    <section className="about section" id="about">
      <div className="about-image">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85"
          alt="Trattoria restaurant"
        />
      </div>

      <div className="about-content">
        <p className="section-label">OUR STORY</p>

        <h2>
          More than a restaurant.
          <br />
          <span>A place to gather.</span>
        </h2>

        <p>
          Trattoria began with a simple dream: to bring the warmth,
          flavors and traditions of Italy to every table.
        </p>

        <p>
          From handmade pasta to wood-fired pizza, every dish is prepared
          with fresh ingredients, traditional techniques and genuine passion.
        </p>

        <a href="#menu" className="text-button">
          Discover Our Story →
        </a>
      </div>
    </section>
  );
}

export default About;