const featuredDishes = [
  {
    name: "Truffle Tagliatelle",
    description: "Fresh handmade pasta, black truffle and parmesan.",
    price: "$24",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Burrata Pizza",
    description: "Wood-fired pizza, creamy burrata, tomatoes and basil.",
    price: "$22",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Italian Sea Bass",
    description: "Fresh sea bass, lemon butter, herbs and seasonal vegetables.",
    price: "$28",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=85",
  },
];

function FeaturedDishes() {
  return (
    <section className="featured section">
      <div className="section-heading">
        <p className="section-label">CHEF'S CHOICE</p>

        <h2>
          Signature
          <br />
          <span>dishes.</span>
        </h2>

        <p>
          A few of our chef's favorite creations, made for an
          unforgettable dining experience.
        </p>
      </div>

      <div className="featured-grid">
        {featuredDishes.map((dish) => (
          <article className="featured-card" key={dish.name}>
            <div className="featured-image">
              <img src={dish.image} alt={dish.name} />
            </div>

            <div className="featured-content">
              <div className="featured-title">
                <h3>{dish.name}</h3>
                <span>{dish.price}</span>
              </div>

              <p>{dish.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturedDishes;