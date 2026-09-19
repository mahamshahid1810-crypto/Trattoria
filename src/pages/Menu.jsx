import { useEffect, useState } from "react";

const categories = [
  "All",
  "Pizza",
  "Burgers",
  "Pasta",
  "Sweets",
  "Ice Cream",
  "Starters",
  "Main Course",
  "Drinks",
];

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get dishes from MongoDB
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://trattoria-backend-production.up.railway.app/api/dishes"
        );

        if (!response.ok) {
          throw new Error("Failed to load menu");
        }

        const data = await response.json();

        setDishes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  // Filter dishes
  const filteredDishes =
    activeCategory === "All"
      ? dishes
      : dishes.filter(
          (dish) => dish.category === activeCategory
        );

  // Add to cart
  const addToCart = (dish) => {
    setCart((currentCart) => [
      ...currentCart,
      dish,
    ]);
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <section className="menu" id="menu">

      {/* HEADER */}
      <div className="section-heading">
        <p className="section-label">
          OUR MENU
        </p>

        <h2>
          Something delicious
          <br />
          <span>for everyone.</span>
        </h2>

        <p>
          Explore our carefully selected Italian dishes,
          freshly prepared by our chefs every day.
        </p>
      </div>

      {/* CART */}
      <div className="cart-box">
        🛒 Cart
        <span>{cart.length}</span>
      </div>

      {/* CATEGORY BUTTONS */}
      <div className="menu-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={
              activeCategory === category
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveCategory(category)
            }
          >
            {category}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <p className="menu-status">
          Loading menu...
        </p>
      )}

      {/* ERROR */}
      {error && (
        <p className="menu-status">
          {error}
        </p>
      )}

      {/* FOOD CARDS */}
      {!loading && !error && (
        <div className="menu-grid">

          {filteredDishes.length === 0 ? (
            <p className="menu-status">
              No dishes available in this category.
            </p>
          ) : (
            filteredDishes.map((dish) => (
              <article
                className="menu-card"
                key={dish._id}
              >
                <div className="menu-image">

                  <img
                    src={dish.image}
                    alt={dish.name}
                  />

                  <span className="menu-category">
                    {dish.category}
                  </span>

                </div>

                <div className="menu-card-content">

                  <div className="menu-title">

                    <h3>{dish.name}</h3>

                    <span>
                      ${dish.price}
                    </span>

                  </div>

                  {/* RATING */}
                  <div className="rating">
                    ★★★★★
                    <small>4.9</small>
                  </div>

                  <p>
                    {dish.description}
                  </p>

                  {/* ADD TO CART */}
                  <button
                    className="add-cart"
                    onClick={() =>
                      addToCart(dish)
                    }
                  >
                    🛒 Add to Cart
                  </button>

                </div>
              </article>
            ))
          )}

        </div>
      )}

      {/* CART NOTIFICATION */}
      {cart.length > 0 && (
        <div className="cart-message">

          <strong>
            🛒 {cart.length} item
            {cart.length !== 1 ? "s" : ""} added
          </strong>

          <button onClick={clearCart}>
            Clear Cart
          </button>

        </div>
      )}

    </section>
  );
}

export default Menu;