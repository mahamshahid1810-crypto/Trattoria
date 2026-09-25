import { useEffect, useState } from "react";

function ManageReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");

  // =========================================================
  // GET REVIEWS
  // =========================================================

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

  // =========================================================
  // START EDIT
  // =========================================================

  function startEdit(review) {
    setEditingId(review._id);
    setEditName(review.name);
    setEditRating(review.rating);
    setEditComment(review.comment);
  }

  // =========================================================
  // CANCEL EDIT
  // =========================================================

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
    setEditRating(5);
    setEditComment("");
  }

  // =========================================================
  // UPDATE REVIEW
  // =========================================================

  async function handleUpdate(e) {
    e.preventDefault();

    if (editName.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    if (editComment.trim().length < 5) {
      setError("Review must be at least 5 characters.");
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `https://trattoria-backend-production.up.railway.app/api/reviews/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editName,
            rating: Number(editRating),
            comment: editComment,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update review"
        );
      }

      setReviews(function (oldReviews) {
        return oldReviews.map(function (review) {
          if (review._id === editingId) {
            return data;
          }

          return review;
        });
      });

      cancelEdit();
    } catch (error) {
      setError(error.message);
    }
  }

  // =========================================================
  // DELETE REVIEW
  // =========================================================

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `https://trattoria-backend-production.up.railway.app/api/reviews/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete review"
        );
      }

      setReviews(function (oldReviews) {
        return oldReviews.filter(function (review) {
          return review._id !== id;
        });
      });
    } catch (error) {
      setError(error.message);
    }
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="manage-reviews-page">
        <div className="manage-reviews-container">
          <p className="manage-reviews-loading">
            Loading reviews...
          </p>
        </div>
      </main>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="manage-reviews-page">

      <div className="manage-reviews-container">

        {/* HEADER */}

        <div className="manage-reviews-header">

          <div>
            <span className="manage-reviews-eyebrow">
              TRATTORIA ADMIN
            </span>

            <h1>Manage Reviews</h1>

            <p>
              View, edit and delete customer reviews.
            </p>
          </div>

          <a
            href="/admin"
            className="manage-reviews-back-btn"
          >
            ← Dashboard
          </a>

        </div>


        {/* ERROR */}

        {error && (
          <div className="manage-reviews-error">
            {error}
          </div>
        )}


        {/* REVIEWS */}

          {reviews.length === 0 ? (

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e9e1d8",
              borderRadius: "24px",
              padding: "60px 30px",
              textAlign: "center",
              maxWidth: "560px",
              margin: "40px auto 0",
              boxShadow: "0 20px 50px rgba(45, 30, 20, 0.08)",
            }}
          >
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "32px",
                color: "#171513",
                marginBottom: "10px",
              }}
            >
              No Reviews Yet
            </h2>

            <p
              style={{
                color: "#77716a",
                fontSize: "15px",
                lineHeight: 1.6,
              }}
            >
              Customer reviews will appear here.
            </p>
          </div>

        ) : (

          <div className="manage-reviews-list">

            {reviews.map(function (review) {

              return (
                <article
                  className="manage-review-card"
                  key={review._id}
                >

                  {editingId === review._id ? (

                    /* =================================================
                       EDIT FORM
                    ================================================= */

                    <form
                      className="manage-review-edit-form"
                      onSubmit={handleUpdate}
                    >

                      <h2>Edit Review</h2>

                      <label>
                        Customer Name
                      </label>

                      <input
                        type="text"
                        value={editName}
                        onChange={function (e) {
                          setEditName(e.target.value);
                        }}
                      />

                      <label>
                        Rating
                      </label>

                      <select
                        value={editRating}
                        onChange={function (e) {
                          setEditRating(e.target.value);
                        }}
                      >
                        <option value="1">
                          1 Star
                        </option>

                        <option value="2">
                          2 Stars
                        </option>

                        <option value="3">
                          3 Stars
                        </option>

                        <option value="4">
                          4 Stars
                        </option>

                        <option value="5">
                          5 Stars
                        </option>
                      </select>

                      <label>
                        Review
                      </label>

                      <textarea
                        value={editComment}
                        onChange={function (e) {
                          setEditComment(e.target.value);
                        }}
                        rows="5"
                      />

                      <div className="manage-review-edit-actions">

                        <button
                          type="submit"
                          className="manage-review-save-btn"
                        >
                          Save Changes
                        </button>

                        <button
                          type="button"
                          className="manage-review-cancel-btn"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>

                      </div>

                    </form>

                  ) : (

                    /* =================================================
                       REVIEW DISPLAY
                    ================================================= */

                    <>

                      <div className="manage-review-top">

                        <div>

                          <h2>
                            {review.name}
                          </h2>

                          <div className="manage-review-stars">
                            {"★".repeat(review.rating)}
                            {"☆".repeat(
                              5 - review.rating
                            )}
                          </div>

                        </div>

                        <span className="manage-review-rating">
                          {review.rating}/5
                        </span>

                      </div>


                      <p className="manage-review-comment">
                        {review.comment}
                      </p>


                      <div className="manage-review-actions">

                        <button
                          type="button"
                          className="manage-review-edit-btn"
                          onClick={function () {
                            startEdit(review);
                          }}
                        >
                          ✏️ Edit
                        </button>

                        <button
                          type="button"
                          className="manage-review-delete-btn"
                          onClick={function () {
                            handleDelete(review._id);
                          }}
                        >
                          🗑️ Delete
                        </button>

                      </div>

                    </>

                  )}

                </article>
              );

            })}

          </div>

        )}

      </div>

    </main>
  );
}

export default ManageReviews