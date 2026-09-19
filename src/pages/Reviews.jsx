import { useEffect, useState } from "react";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==============================
  // GET REVIEWS
  // ==============================

  async function fetchReviews() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://trattoria-backend-production.up.railway.app/api/reviews"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load reviews"
        );
      }

      setReviews(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(function () {
    fetchReviews();
  }, []);

  // ==============================
  // SUBMIT REVIEW
  // ==============================

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanName = name.trim();
    const cleanComment = comment.trim();

    if (cleanName.length < 2) {
      setError("Please enter your name.");
      return;
    }

    if (cleanComment.length < 5) {
      setError("Please write at least 5 characters.");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Please select a rating.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        "https://trattoria-backend-production.up.railway.app/api/reviews",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: cleanName,
            rating: Number(rating),
            comment: cleanComment,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit review"
        );
      }

      // Add new review immediately
      setReviews(function (oldReviews) {
        return [data, ...oldReviews];
      });

      // Clear form
      setName("");
      setRating(5);
      setComment("");

      setSuccess(
        "Thank you! Your review has been added successfully."
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  // ==============================
  // RATING TEXT
  // ==============================

  function getRatingText(value) {
    if (value === 5) return "Excellent";
    if (value === 4) return "Very Good";
    if (value === 3) return "Good";
    if (value === 2) return "Fair";

    return "Poor";
  }

  // ==============================
  // DATE
  // ==============================

  function formatDate(date) {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  // ==============================
  // PAGE
  // ==============================

  return (
    <main className="reviews-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="reviews-hero">

        <div className="reviews-hero-decoration">
          <span>✦</span>
          <span></span>
          <span>✦</span>
        </div>

        <span className="reviews-eyebrow">
          GUEST EXPERIENCES
        </span>

        <h1>
          Stories From
          <br />
          <span>Our Guests.</span>
        </h1>

        <p>
          Good food creates memories.
          <br />
          Here's what our guests have to say.
        </p>

        <div className="reviews-scroll-line">
          <span></span>
        </div>

      </section>


      {/* =================================
          WRITE REVIEW
      ================================= */}

      <section className="review-write-section">

        {/* LEFT SIDE */}

        <div className="review-write-left">

          <div className="review-big-quote">
            “
          </div>

          <span className="reviews-eyebrow">
            YOUR EXPERIENCE
          </span>

          <h2>
            Dine.
            <br />
            <span>Enjoy.</span>
            <br />
            Share.
          </h2>

          <p>
            Every plate, every evening, and every
            little moment matters to us. Tell us
            about your experience at Trattoria.
          </p>

          <div className="review-decoration">
            <span>✦</span>
            <span>✦</span>
            <span>✦</span>
          </div>

          <div className="review-side-note">
            <span>TRATTORIA</span>
            <span>EST. 2026</span>
          </div>

        </div>


        {/* RIGHT SIDE / FORM */}

        <div className="review-write-right">

          <div className="review-form-heading">

            <span>
              WE'D LOVE TO HEAR FROM YOU
            </span>

            <div className="review-form-small-line"></div>

          </div>


          <form
            className="customer-review-form"
            onSubmit={handleSubmit}
          >

            {/* NAME */}

            <div className="customer-review-field">

              <label htmlFor="review-name">
                YOUR NAME
              </label>

              <input
                id="review-name"
                type="text"
                placeholder="Enter your name"
                value={name}
                maxLength="100"
                onChange={function (e) {
                  setName(e.target.value);
                }}
              />

            </div>


            {/* RATING */}

            <div className="customer-review-field">

              <label>
                YOUR RATING
              </label>

              <div className="customer-rating">

                {[1, 2, 3, 4, 5].map(function (star) {

                  return (
                    <button
                      key={star}
                      type="button"
                      aria-label={`Give ${star} star rating`}
                      className={
                        star <= rating
                          ? "rating-star active"
                          : "rating-star"
                      }
                      onClick={function () {
                        setRating(star);
                        setError("");
                        setSuccess("");
                      }}
                    >
                      ★
                    </button>
                  );

                })}

              </div>

              <span className="rating-label">
                {getRatingText(rating)}
              </span>

            </div>


            {/* COMMENT */}

            <div className="customer-review-field">

              <div className="review-label-row">

                <label htmlFor="review-comment">
                  YOUR REVIEW
                </label>

                <span>
                  {comment.length}/500
                </span>

              </div>

              <textarea
                id="review-comment"
                rows="6"
                maxLength="500"
                placeholder="Tell us about your favorite dish, your evening, or your experience..."
                value={comment}
                onChange={function (e) {
                  setComment(e.target.value);
                }}
              />

            </div>


            {/* ERROR */}

            {error && (
              <div className="customer-review-error">

                <span>!</span>

                {error}

              </div>
            )}


            {/* SUCCESS */}

            {success && (
              <div className="customer-review-success">

                <span>✓</span>

                {success}

              </div>
            )}


            {/* SUBMIT */}

            <button
              type="submit"
              className="customer-review-submit"
              disabled={submitting}
            >

              <span>
                {submitting
                  ? "Submitting..."
                  : "Share Your Experience"}
              </span>

              {!submitting && (
                <span className="submit-arrow">
                  →
                </span>
              )}

            </button>


            <p className="review-form-footer">
              YOUR FEEDBACK HELPS US CREATE BETTER EXPERIENCES
            </p>

          </form>

        </div>

      </section>


      {/* =================================
          RECENT REVIEWS
      ================================= */}

      <section className="customer-reviews-list">

        <div className="recent-reviews-heading">

          <div className="reviews-heading-left">

            <span className="reviews-eyebrow">
              FROM OUR GUESTS
            </span>

            <h2>
              Recent
              <br />
              <span>Reviews.</span>
            </h2>

          </div>


          {reviews.length > 0 && (

            <div className="review-count">

              <strong>
                {reviews.length}
              </strong>

              <div>

                <span>
                  {reviews.length === 1
                    ? "GUEST REVIEW"
                    : "GUEST REVIEWS"}
                </span>

                <small>
                  Real experiences
                </small>

              </div>

            </div>

          )}

        </div>


        {/* =================================
            LOADING
        ================================= */}

        {loading && (

          <div className="reviews-state-card">

            <div className="reviews-loader">

              <span></span>
              <span></span>
              <span></span>

            </div>

            <p>
              Loading guest experiences...
            </p>

          </div>

        )}


        {/* =================================
            NO REVIEWS
        ================================= */}

        {!loading && reviews.length === 0 && (

          <div className="reviews-empty">

            <div className="empty-decoration">

              <span>✦</span>
              <span></span>
              <span>✦</span>

            </div>

            <div className="empty-quote">
              “
            </div>

            <div className="empty-stars">
              ☆ ☆ ☆ ☆ ☆
            </div>

            <h3>
              No stories
              <br />
              <span>yet.</span>
            </h3>

            <p>
              Be the first guest to share your
              Trattoria experience.
            </p>

            <div className="empty-line"></div>

          </div>

        )}


        {/* =================================
            REVIEWS
        ================================= */}

        {!loading && reviews.length > 0 && (

          <div className="reviews-grid">

            {reviews.map(function (item, index) {

              return (

                <article
                  className="review-card"
                  key={item._id}
                >

                  <div className="review-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>


                  <div className="review-card-top">

                    <div className="review-card-stars">

                      {"★".repeat(item.rating)}

                      {"☆".repeat(5 - item.rating)}

                    </div>


                    <span className="review-mark">
                      “
                    </span>

                  </div>


                  <p className="review-text">
                    {item.comment}
                  </p>


                  <div className="review-author">

                    <div className="author-avatar">

                      {item.name
                        .charAt(0)
                        .toUpperCase()}

                    </div>


                    <div className="author-info">

                      <h3>
                        {item.name}
                      </h3>

                      <span>
                        TRATTORIA GUEST
                      </span>

                    </div>


                    <span className="review-date">
                      {formatDate(item.createdAt)}
                    </span>

                  </div>

                </article>

              );

            })}

          </div>

        )}

      </section>


      {/* =================================
          BOTTOM
      ================================= */}

      <section className="reviews-bottom">

        <div className="reviews-bottom-line"></div>

        <p>
          GOOD FOOD · GOOD PEOPLE · GOOD MEMORIES
        </p>

        <h2>
          Until next time,
          <br />
          <span>at Trattoria.</span>
        </h2>

        <div className="reviews-bottom-symbol">
          ✦
        </div>

      </section>

    </main>
  );
}

export default Reviews;