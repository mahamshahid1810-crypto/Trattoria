const reviews = [
  {
    name: "Sofia Martinez",
    role: "Food Enthusiast",
    review:
      "Absolutely beautiful experience. The pasta was fresh, flavorful and perfectly cooked. Trattoria feels like a little piece of Italy.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Regular Guest",
    review:
      "The atmosphere is elegant but comfortable, and the staff are wonderful. The truffle pasta is easily one of my favorite dishes.",
    rating: 5,
  },
  {
    name: "Emma Johnson",
    role: "Local Guide",
    review:
      "Fantastic food and incredible attention to detail. The pizza was outstanding and the tiramisu was the perfect ending.",
    rating: 5,
  },
  {
    name: "Daniel Brown",
    role: "Happy Customer",
    review:
      "From the warm welcome to the final dessert, everything was excellent. Definitely a restaurant I would visit again.",
    rating: 5,
  },
];

function Reviews() {
  return (
    <section className="reviews section" id="reviews">
      <div className="section-heading">
        <p className="section-label">WHAT OUR GUESTS SAY</p>

        <h2>
          Loved by our
          <br />
          <span>guests.</span>
        </h2>
      </div>

      <div className="reviews-grid">
        {reviews.map((item) => (
          <article className="review-card" key={item.name}>
            <div className="stars">
              {"★".repeat(item.rating)}
            </div>

            <p className="review-text">
              "{item.review}"
            </p>

            <div className="review-author">
              <div className="author-avatar">
                {item.name.charAt(0)}
              </div>

              <div>
                <h3>{item.name}</h3>
                <span>{item.role}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reviews;