import { useEffect, useState } from "react";

function ManageMenu() {
  const [dishes, setDishes] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchDishes = async () => {
    try {
      setError("");

      const response = await fetch(
        "https://trattoria-backend-production.up.railway.app/api/dishes"
      );

      if (!response.ok) {
        throw new Error("Failed to load dishes");
      }

      const data = await response.json();
      setDishes(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      description: "",
      price: "",
      image: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (
      !form.name ||
      !form.category ||
      !form.description ||
      !form.price ||
      !form.image
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const url = editingId
        ? `https://trattoria-backend-production.up.railway.app/api/dishes/${editingId}`
        : "https://trattoria-backend-production.up.railway.app/api/dishes";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong"
        );
      }

      if (editingId) {
        setDishes((previous) =>
          previous.map((dish) =>
            dish._id === editingId ? data : dish
          )
        );

        setMessage("Dish updated successfully.");
      } else {
        setDishes((previous) => [
          data,
          ...previous,
        ]);

        setMessage("Dish added successfully.");
      }

      resetForm();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (dish) => {
    setEditingId(dish._id);

    setForm({
      name: dish.name,
      category: dish.category,
      description: dish.description,
      price: dish.price,
      image: dish.image,
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `https://trattoria-backend-production.up.railway.app/api/dishes/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete dish"
        );
      }

      setDishes((previous) =>
        previous.filter((dish) => dish._id !== id)
      );

      setMessage("Dish deleted successfully.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="manage-menu-page">

      {/* HEADER */}

      <section className="manage-header">

        <div>
          <span className="manage-eyebrow">
            TRATTORIA ADMIN
          </span>

          <h1>
            {editingId
              ? "Edit Dish"
              : "Manage Menu"}
          </h1>

          <p>
            Keep your restaurant menu fresh,
            organized and up to date.
          </p>
        </div>

        <div className="dish-count">
          <strong>{dishes.length}</strong>
          <span>Menu Items</span>
        </div>

      </section>

      {/* FORM */}

      <section className="manage-form-card">

        <div className="form-title">

          <div className="form-icon">
            {editingId ? "✎" : "+"}
          </div>

          <div>
            <h2>
              {editingId
                ? "Update Dish"
                : "Add New Dish"}
            </h2>

            <p>
              {editingId
                ? "Make changes to this menu item."
                : "Add a new item to your restaurant menu."}
            </p>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="manage-form-grid">

            <div className="form-group">
              <label>Dish Name</label>

              <input
                type="text"
                name="name"
                placeholder="e.g. Truffle Pasta"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">
                  Choose category
                </option>

                <option value="Pizza">
                  Pizza
                </option>

                <option value="Pasta">
                  Pasta
                </option>

                <option value="Burgers">
                  Burgers
                </option>

                <option value="Starters">
                  Starters
                </option>

                <option value="Main Course">
                  Main Course
                </option>

                <option value="Sweets">
                  Sweets
                </option>

                <option value="Ice Cream">
                  Ice Cream
                </option>

                <option value="Drinks">
                  Drinks
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Price</label>

              <input
                type="number"
                name="price"
                min="1"
                placeholder="e.g. 15"
                value={form.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>

              <input
                type="text"
                name="image"
                placeholder="Paste image URL"
                value={form.image}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>

              <textarea
                name="description"
                placeholder="Describe the dish..."
                rows="4"
                value={form.description}
                onChange={handleChange}
              />
            </div>

          </div>

          {error && (
            <div className="manage-message error">
              {error}
            </div>
          )}

          {message && (
            <div className="manage-message success">
              {message}
            </div>
          )}

          <div className="form-actions">

            <button
              type="submit"
              className="primary-action"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Dish"
                : "Add Dish"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary-action"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </section>

      {/* MENU ITEMS */}

      <section className="manage-items">

        <div className="items-heading">

          <div>
            <span>YOUR MENU</span>
            <h2>All Dishes</h2>
          </div>

          <p>
            {dishes.length} items
          </p>

        </div>

        {dishes.length === 0 ? (
          <div className="empty-menu">
            <div>🍽️</div>
            <h3>No dishes yet</h3>
            <p>
              Add your first dish using the form above.
            </p>
          </div>
        ) : (
          <div className="manage-dishes-grid">

            {dishes.map((dish) => (

              <article
                className="manage-dish-card"
                key={dish._id}
              >

                <div className="manage-dish-image">

                  <img
                    src={dish.image}
                    alt={dish.name}
                  />

                  <span>
                    {dish.category}
                  </span>

                </div>

                <div className="manage-dish-content">

                  <div className="manage-dish-top">

                    <h3>
                      {dish.name}
                    </h3>

                    <strong>
                      Rs {dish.price}
                    </strong>

                  </div>

                  <p>
                    {dish.description}
                  </p>

                  <div className="dish-actions">

                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(dish)
                      }
                    >
                      ✎ Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(dish._id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>
        )}

      </section>

    </main>
  );
}

export default ManageMenu;