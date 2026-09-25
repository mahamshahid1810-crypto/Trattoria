import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";

import ManageMenu from "./ManageMenu";
import ManageReservations from "./ManageReservations";
import ManageOrders from "./ManageOrders";
import AdminLogin from "./AdminLogin";
import ManageReviews from "./ManageReviews";
import AdminDashboard from "./AdminDashboard";

/* OPEN / CLOSED STATUS BADGE */
function OpenStatus({ openHour = 11, closeHour = 22 }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const currentHour = now.getHours();
  const isOpen = currentHour >= openHour && currentHour < closeHour;

  function formatHour(h) {
    if (h === 0 || h === 24) return "12 AM";
    if (h === 12) return "12 PM";
    if (h > 12) return (h - 12) + " PM";
    return h + " AM";
  }

  return (
    <div className={`open-badge ${isOpen ? "open" : "closed"}`}>
      <span className="open-dot"></span>
      {isOpen
        ? `Open Now · Closes at ${formatHour(closeHour)}`
        : `Closed · Opens at ${formatHour(openHour)}`}
    </div>
  );
}

/* CLOSED BANNER */
function ClosedBanner({ openHour = 11, closeHour = 22 }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const currentHour = now.getHours();
  const isOpen = currentHour >= openHour && currentHour < closeHour;

  if (isOpen) return null;

  function formatHour(h) {
    if (h === 0 || h === 24) return "12 AM";
    if (h === 12) return "12 PM";
    if (h > 12) return (h - 12) + " PM";
    return h + " AM";
  }

  return (
    <div className="closed-banner">
      <span className="closed-banner-icon">🔴</span>
      <div>
        <strong>We're currently closed</strong>
        <p>
          You can browse the menu, but orders are only accepted between{" "}
          {formatHour(openHour)} and {formatHour(closeHour)}.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <Link
        to="/"
        className="logo"
        onClick={closeMenu}
      >
        TRATTORIA
      </Link>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div
        className={
          menuOpen
            ? "nav-links active"
            : "nav-links"
        }
      >
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/about" onClick={closeMenu}>
          About
        </Link>

        <Link to="/menu" onClick={closeMenu}>
          Menu
        </Link>

        <Link to="/gallery" onClick={closeMenu}>
          Gallery
        </Link>

        <Link to="/reviews" onClick={closeMenu}>
          Reviews
        </Link>

        <Link to="/contact" onClick={closeMenu}>
          Contact
        </Link>

               <Link
          to={
            cartCount === 0 &&
            localStorage.getItem("trattoria_active_order_id")
              ? "/order-placed"
              : "/checkout"
          }
          className="cart-nav-btn"
          onClick={closeMenu}
        >
          {cartCount === 0 &&
          localStorage.getItem("trattoria_active_order_id")
            ? "📦 My Order"
            : "🛒 Cart"}

          {cartCount > 0 && (
            <span>{cartCount}</span>
          )}
        </Link>

        <Link
          to="/reservation"
          className="reserve-btn"
          onClick={closeMenu}
        >
          Reserve Table
        </Link>
      </div>
    </nav>
  );
}

/* =========================================================
   HOME
========================================================= */

function Home() {
    const heroImages = [
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=85",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevSlide(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentSlide]);
  return (
    <main>
       <section
        className="hero"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "82vh",
          display: "flex",
          alignItems: "center",
          padding: "120px 7% 80px",
          background: "none",
        }}
      >
        {/* Base layer - previous image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${heroImages[prevSlide]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />

        {/* Top layer - current image fades in */}
        <div
          key={currentSlide}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${heroImages[currentSlide]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1,
            animation: "heroFadeIn 1.5s ease-in-out",
          }}
        />

        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background:
              "linear-gradient(90deg, rgba(15,12,10,0.82), rgba(15,12,10,0.48), rgba(15,12,10,0.15))",
          }}
        />

        {/* Text */}
        <div
          className="hero-content"
          style={{
            position: "relative",
            zIndex: 3,
            maxWidth: "700px",
            color: "white",
          }}
        >
          <OpenStatus openHour={11} closeHour={22} />
          <p>
            AUTHENTIC ITALIAN CUISINE
          </p>

          <h1>
            Authentic Taste,
            <br />
            <span>
              Crafted With Passion
            </span>
          </h1>

          <p>
            Experience authentic Italian flavors,
            handmade pasta, wood-fired pizza and
            unforgettable moments.
          </p>

          <div className="hero-buttons">
            <Link
              to="/menu"
              className="primary-btn"
            >
              Explore Menu
            </Link>

            <Link
              to="/reservation"
              className="secondary-btn"
            >
              Reserve a Table
            </Link>
          </div>
               </div>

        <style>{`
          @keyframes heroFadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
        `}</style>
      </section>

      <section className="home-intro">
        <p>
          WELCOME TO TRATTORIA
        </p>

        <h2>
          Italian food made with{" "}
          <span>passion</span>
        </h2>

        <p>
          Fresh ingredients, traditional recipes
          and a warm atmosphere come together
          to create an unforgettable dining
          experience.
        </p>

        <Link
          to="/about"
          className="primary-btn"
        >
          Discover Our Story
        </Link>
      </section>
    </main>
  );
}

/* =========================================================
   ABOUT
========================================================= */

function About() {
  return (
    <main className="page">
      <p className="small-title">
        OUR STORY
      </p>

      <h1>
        About Trattoria
      </h1>

      <div className="about-layout">
        <img
          src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=85"
          alt="Beautiful Italian restaurant"
        />

        <div>
          <h2>
            Where every dish tells a story.
          </h2>

          <p>
            Trattoria was created from a love
            of traditional Italian cooking.
            We believe food should bring people
            together and create beautiful memories.
          </p>

          <p>
            Our chefs prepare every dish with
            fresh ingredients, traditional
            techniques and a modern touch.
          </p>

          <Link
            to="/menu"
            className="primary-btn"
          >
            Explore Our Menu
          </Link>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   MENU
========================================================= */

function Menu({ cart, setCart }) {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const [dishes, setDishes] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function fetchDishes() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://trattoria-backend-production.up.railway.app/api/dishes"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load dishes"
          );
        }

        const data =
          await response.json();

        setDishes(data);
      } catch (error) {
        console.error(
          "Error fetching dishes:",
          error
        );

        setError(
          "Unable to load menu. Please make sure the backend server is running."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDishes();
  }, []);

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

  const filteredDishes =
    activeCategory === "All"
      ? dishes
      : dishes.filter(
          function (dish) {
            return (
              dish.category ===
              activeCategory
            );
          }
        );

  function addToCart(dish) {
    const existingItem =
      cart.find(function (item) {
        return item._id === dish._id;
      });

    if (existingItem) {
      if (existingItem.quantity >= 15) {
        window.alert(
          "You can order a maximum of 15 of the same item."
        );
        return;
      }

      setCart(
        cart.map(function (item) {
          if (item._id === dish._id) {
            return {
              ...item,
              quantity:
                item.quantity + 1,
            };
          }

          return item;
        })
      );

      return;
    }

    if (cart.length >= 10) {
      window.alert(
        "You can order a maximum of 10 different items in one order."
      );
      return;
    }

    setCart([
      ...cart,
      {
        ...dish,
        quantity: 1,
      },
    ]);
  }

  const cartCount =
    cart.reduce(function (
      total,
      item
    ) {
      return (
        total + item.quantity
      );
    }, 0);

  return (
    <main className="page menu-page">
      <ClosedBanner openHour={11} closeHour={22} />
      <p className="small-title">
        OUR MENU
      </p>

      <h1>
        Italian Favorites
      </h1>

      <p className="menu-subtitle">
        Discover authentic Italian flavors,
        freshly prepared with passion.
      </p>

      <Link
        to="/checkout"
        className="cart-counter"
      >
        🛒 Cart
        <span>{cartCount}</span>
      </Link>

      <div className="menu-categories">
        {categories.map(function (
          category
        ) {
          return (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={function () {
                setActiveCategory(
                  category
                );
              }}
            >
              {category}
            </button>
          );
        })}
      </div>

        {loading && (
        <div className="menu-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div className="dish-card skeleton-card" key={i}>
              <div className="skeleton-image"></div>
              <div className="dish-info">
                <div className="skeleton-line skeleton-title"></div>
                <div className="skeleton-line skeleton-rating"></div>
                <div className="skeleton-line skeleton-text"></div>
                <div className="skeleton-line skeleton-text short"></div>
                <div className="skeleton-button"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && error && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
          }}
        >
          <h2>
            Unable to Load Menu
          </h2>

          <p>{error}</p>
        </div>
      )}

      {!loading &&
        !error &&
        filteredDishes.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
            }}
          >
            <h2>
              No dishes found
            </h2>

            <p>
              There are no dishes in this category yet.
            </p>
          </div>
        )}

      {!loading &&
        !error &&
        filteredDishes.length > 0 && (
          <div className="menu-grid">
            {filteredDishes.map(function (
              dish
            ) {
              return (
                <article
                  className="dish-card"
                  key={dish._id}
                >
                  <div className="dish-image">
                    <img
                      src={dish.image}
                      alt={dish.name}
                    />

                    <span>
                      {dish.category}
                    </span>
                  </div>

                  <div className="dish-info">
                    <div className="dish-heading">
                      <h2>
                        {dish.name}
                      </h2>

                      <strong>
                      Rs {dish.price}
                      </strong>
                    </div>

                    <div className="dish-rating">
                      ★★★★★
                      <small>4.9</small>
                    </div>

                    <p>
                      {dish.description}
                    </p>

                    <button
                      className="dish-btn"
                      onClick={function () {
                        addToCart(dish);
                      }}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      {cart.length > 0 && (
        <div className="cart-notification">
          🛒{" "}
          <strong>
            {cartCount}
          </strong>{" "}
          item
          {cartCount !== 1
            ? "s"
            : ""}{" "}
          added

          <Link
            to="/checkout"
            className="view-cart-link"
          >
            View Cart
          </Link>
        </div>
      )}
    </main>
  );
}

/* =========================================================
   CHECKOUT
========================================================= */
/* =========================================================
   CHECKOUT
========================================================= */

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [payment, setPayment] =
    useState("Cash on Delivery");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState("");

  const namePattern =
    /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;

  const emailPattern =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const phonePattern =
    /^03[0-9]{9}$/;

  const allowedCities = [
    "Kaghan Colony",
    "Jinnahabad",
    "Kehal",
    "Supply",
    "Mandian",
    "Jhangi",
  ];

  const allowedPayments = [
    "Cash on Delivery",
    "Card Payment",
    "PayPal",
  ];

  function isValidName(value) {
    const cleanValue = value.trim();

    return (
      cleanValue.length >= 2 &&
      cleanValue.length <= 50 &&
      namePattern.test(cleanValue)
    );
  }

  function isValidEmail(value) {
    const cleanValue =
      value.trim().toLowerCase();

    return (
      cleanValue.length >= 6 &&
      cleanValue.length <= 100 &&
      emailPattern.test(cleanValue) &&
      !cleanValue.includes("..")
    );
  }

  /* Handles: 03001234567, 0300-1234567, 0300 1234567,
     +92 300 1234567, +923001234567, 92 300 1234567,
     923001234567, 3001234567 */
  function normalizePhone(value) {
    let normalized =
      value.trim().replace(/[\s-]/g, "");

    if (normalized.startsWith("+92")) {
      normalized =
        "0" + normalized.slice(3);
    } else if (
      normalized.startsWith("92") &&
      normalized.length === 12
    ) {
      normalized =
        "0" + normalized.slice(2);
    } else if (
      normalized.startsWith("3") &&
      normalized.length === 10
    ) {
      normalized = "0" + normalized;
    }

    return normalized;
  }

  function isValidPhone(value) {
    const normalized = normalizePhone(value);

    if (!phonePattern.test(normalized)) {
      return false;
    }

    const phoneDigits = normalized.slice(1);

    const allSame = phoneDigits
      .split("")
      .every(function (digit) {
        return digit === phoneDigits[0];
      });

    return !allSame;
  }

  function isValidCity(value) {
    return allowedCities.includes(value.trim());
  }

  function isValidAddress(value) {
    const cleanValue = value.trim();

    if (
      cleanValue.length < 5 ||
      cleanValue.length > 150
    ) {
      return false;
    }

    return /[A-Za-z0-9]/.test(cleanValue);
  }

  function isValidPayment(value) {
    return allowedPayments.includes(value);
  }
  /* Only clear an error — never raise one while typing.
     Errors only appear when user clicks Confirm Your Order. */
  function checkField(field, value) {
    if (errorField !== field) {
      return;
    }

    let valid = true;

    if (field === "name") {
      valid = isValidName(value);
    }

    if (field === "email") {
      valid = isValidEmail(value);
    }

    if (field === "phone") {
      valid = isValidPhone(value);
    }

    if (field === "city") {
      valid = isValidCity(value);
    }

    if (field === "address") {
      valid = isValidAddress(value);
    }

    if (field === "payment") {
      valid = isValidPayment(value);
    }

    if (valid) {
      setError("");
      setErrorField("");
    }
  }

  function increaseQuantity(itemId) {
    const selectedItem = cart.find(function (item) {
      return item._id === itemId;
    });

    if (selectedItem && selectedItem.quantity >= 15) {
      setError(
        "Maximum 15 of the same item can be ordered."
      );
      setErrorField("cart");
      return;
    }

    setError("");
    setErrorField("");

    setCart(
      cart.map(function (item) {
        if (item._id === itemId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      })
    );
  }

  function decreaseQuantity(itemId) {
    setError("");
    setErrorField("");

    setCart(
      cart
        .map(function (item) {
          if (item._id === itemId) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        })
        .filter(function (item) {
          return item.quantity > 0;
        })
    );
  }

  function removeItem(itemId) {
    setError("");
    setErrorField("");

    setCart(
      cart.filter(function (item) {
        return item._id !== itemId;
      })
    );
  }

  const cartCount = cart.reduce(function (total, item) {
    return total + Number(item.quantity);
  }, 0);

  const subtotal = cart.reduce(function (total, item) {
    return (
      total +
      Number(item.price) * Number(item.quantity)
    );
  }, 0);

  const extraDeliveryUnits = Math.max(
    0,
    Math.ceil(Math.max(0, cartCount - 3) / 3)
  );

  const deliveryFee =
    cart.length > 0 ? 3 + extraDeliveryUnits : 0;

  const total = subtotal + deliveryFee;

  async function confirmOrder(e) {
    e.preventDefault();

    setError("");
    setErrorField("");
        const currentHour = new Date().getHours();
    const openHour = 11;
    const closeHour = 22;

    if (currentHour < openHour || currentHour >= closeHour) {
      setError(
        "We are currently closed. Orders can only be placed between 11 AM and 10 PM."
      );
      setErrorField("closed");
      return;
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanAddress = address.trim();
    const cleanCity = city.trim();

    if (cart.length === 0) {
      setError("Your cart is empty.");
      setErrorField("cart");
      return;
    }

    if (cart.length > 10) {
      setError(
        "You can order a maximum of 10 different items."
      );
      setErrorField("cart");
      return;
    }

    if (cartCount < 1) {
      setError("Your cart is empty.");
      setErrorField("cart");
      return;
    }

    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      const itemQuantity = Number(item.quantity);
      const itemPrice = Number(item.price);

      if (
        !item.name ||
        !item.image ||
        !Number.isInteger(itemQuantity) ||
        itemQuantity < 1 ||
        itemQuantity > 15 ||
        !Number.isFinite(itemPrice) ||
        itemPrice <= 0
      ) {
        setError(
          "There is an issue with an item in your cart."
        );
        setErrorField("cart");
        return;
      }
    }
    if (!isValidName(cleanName)) {
      setError("Please enter valid data.");
      setErrorField("name");
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setError("Please enter valid data.");
      setErrorField("email");
      return;
    }

    const normalizedPhone = normalizePhone(cleanPhone);
     if (!isValidPhone(cleanPhone)) {
      setError("Please enter valid data.");
      setErrorField("phone");
      return;
    }
     if (!isValidCity(cleanCity)) {
      setError("Please enter valid data.");
      setErrorField("city");
      return;
    }

       if (!isValidAddress(cleanAddress)) {
      setError("Please enter valid data.");
      setErrorField("address");
      return;
    }
      if (!isValidPayment(payment)) {
      setError("Please enter valid data.");
      setErrorField("payment");
      return;
    }

    if (!Number.isFinite(total) || total <= 0) {
      setError("Your order total is invalid.");
      setErrorField("cart");
      return;
    }

    try {
      setLoading(true);

      const orderItems = cart.map(function (item) {
        return {
          name: item.name.trim(),
          price: Number(item.price),
          quantity: Number(item.quantity),
          image: item.image,
        };
      });

      const orderData = {
        customerName: cleanName,
        email: cleanEmail,
        phone: normalizedPhone,
        address: cleanAddress + ", " + cleanCity,
        items: orderItems,
        total: Number(total.toFixed(2)),
      };

      const response = await fetch(
        "https://trattoria-backend-production.up.railway.app/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error("Order could not be saved");
      }

      const orderNumber =
        data.orderNumber ||
        (data._id
          ? "TR" +
            data._id
              .toString()
              .slice(-6)
              .toUpperCase()
          : "TR000000");

      if (data._id) {
        localStorage.setItem(
          "trattoria_active_order_id",
          data._id.toString()
        );
      }

      localStorage.setItem(
        "trattoria_order_number",
        orderNumber
      );

      const customerName = cleanName;
      const selectedCity = cleanCity;
      const selectedAddress = cleanAddress;
      const selectedPayment = payment;
      const orderTime = new Date().getTime();

      setCart([]);

      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCity("");

      setError("");
      setErrorField("");

      localStorage.setItem(
        "trattoria_order_time",
        orderTime.toString()
      );

      navigate("/order-placed", {
        state: {
          orderNumber: orderNumber,
          customerName: customerName,
          total: total,
          city: selectedCity,
          address: selectedAddress,
          payment: selectedPayment,
          orderTime: orderTime,
        },
      });

    } catch (error) {
      console.error("Order error:", error);

      setError(
        "Unable to save your order. Please check your connection and try again."
      );
      setErrorField("server");

    } finally {
      setLoading(false);
    }
  }

  if (cart.length === 0) {
    return (
      <main className="page checkout-page">
        <p className="small-title">YOUR ORDER</p>

        <h1>Your Cart is Empty</h1>

        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <h2>Nothing here yet</h2>

          <p>
            Add your favorite Italian dishes
            to start your order.
          </p>

          <Link to="/menu" className="primary-btn">
            Browse Menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page checkout-page">
         <ClosedBanner openHour={11} closeHour={22} />
      <p className="small-title">YOUR ORDER</p>
         

      <h1>Confirm Your Order</h1>

      <div className="checkout-layout">
        <section className="order-section">
          <h2>Your Items</h2>

          <p
            style={{
              fontSize: "14px",
              color: "#777",
              marginBottom: "20px",
            }}
          >
            Maximum 15 of each item and maximum
            10 different items per order.
          </p>

          {cart.map(function (item) {
            return (
              <div className="order-item" key={item._id}>
                <img src={item.image} alt={item.name} />

                <div className="order-item-info">
                  <h3>{item.name}</h3>

                  <p>Rs {item.price} each</p>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={function () {
                        decreaseQuantity(item._id);
                      }}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={function () {
                        increaseQuantity(item._id);
                      }}
                      disabled={item.quantity >= 15}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="order-item-right">
             <strong>
                    Rs{" "}
                    {(
                      Number(item.price) *
                      Number(item.quantity)
                    ).toFixed(2)}
                  </strong>

                  <button
                    type="button"
                    className="remove-item"
                    onClick={function () {
                      removeItem(item._id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <strong>{cartCount}</strong>
          </div>

          <div className="summary-row">
            <span>Different Items</span>
            <strong>{cart.length} / 10</strong>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>Rs {subtotal.toFixed(2)}</strong>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <strong>Rs {deliveryFee.toFixed(2)}</strong>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total Payment</span>
            <strong>Rs {total.toFixed(2)}</strong>
          </div>

          <p className="delivery-note">
            🚚 Estimated delivery: 30–40 minutes
          </p>
        </aside>
      </div>

      <section className="order-details">
        <h2>Confirm Your Details</h2>

        <form
          onSubmit={confirmOrder}
          className="order-form"
          noValidate
        >
          {error && (
            <p
              style={{
                gridColumn: "1 / -1",
                color: "#b21f3a",
                background: "#fff2f4",
                border: "1px solid #f3c2cc",
                padding: "12px 15px",
                borderRadius: "10px",
                fontWeight: "600",
                margin: 0,
              }}
            >
              ⚠ {error}
            </p>
          )}

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={function (e) {
                const value = e.target.value;
                setName(value);
                checkField("name", value);
              }}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={function (e) {
                const value = e.target.value;
                setEmail(value);
                checkField("email", value);
              }}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              placeholder="+92 300 1234567"
              value={phone}
              onChange={function (e) {
                const value = e.target.value;
                setPhone(value);
                checkField("phone", value);
              }}
              required
            />

            <small>
              Example: 03001234567 or +92 300 1234567
            </small>
          </div>

          <div className="form-group">
            <label>Area</label>

            <select
              value={city}
              onChange={function (e) {
                const value = e.target.value;
                setCity(value);
                checkField("city", value);
              }}
              required
            >
              <option value="">Select your area</option>
              <option value="Kaghan Colony">
                Kaghan Colony
              </option>
              <option value="Jinnahabad">
                Jinnahabad
              </option>
              <option value="Kehal">Kehal</option>
              <option value="Supply">Supply</option>
              <option value="Mandian">Mandian</option>
              <option value="Jhangi">Jhangi</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label>Delivery Address</label>

            <input
              type="text"
              placeholder="House number, street, area"
              value={address}
              onChange={function (e) {
                const value = e.target.value;
                setAddress(value);
                checkField("address", value);
              }}
              required
            />

            <small>
              Enter a complete delivery address.
            </small>
          </div>

          <div className="form-group">
            <label>Payment Method</label>

            <select
              value={payment}
              onChange={function (e) {
                const value = e.target.value;
                setPayment(value);
                checkField("payment", value);
              }}
            >
              <option value="Cash on Delivery">
                Cash on Delivery
              </option>
              <option value="Card Payment">
                Card Payment
              </option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>

          <button
            type="submit"
            className="confirm-order-btn"
            disabled={loading}
          >
            <span>
              {loading
                ? "Saving Order..."
                : "Confirm Your Order"}
            </span>

            <strong>Rs {total.toFixed(2)}</strong>
          </button>
        </form>
      </section>
    </main>
  );
}
/* =========================================================
   ORDER PLACED
========================================================= */

function OrderPlaced() {
  const navigate = useNavigate();
  const location = useLocation();

  const orderData =
    location.state || {};

  const [showInfo, setShowInfo] =
    useState(true);

  const [order, setOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

    const [review, setReview] =
    useState("");

  const [rating, setRating] =
    useState(5);
    
  const [reviewError, setReviewError] =
    useState("");

  const [reviewSubmitted, setReviewSubmitted] =
    useState(false);
    

  /* -----------------------------------------
     GET REAL ORDER FROM MONGODB
  ----------------------------------------- */

  useEffect(() => {
    let cancelled = false;

    async function fetchOrder() {
      try {
        setLoading(true);
        setError("");

        const savedOrderId =
          localStorage.getItem(
            "trattoria_active_order_id"
          );

        if (!savedOrderId) {
          if (!cancelled) {
            setLoading(false);
            setError(
              "Order information could not be found."
            );
          }

          return;
        }

        const response =
          await fetch(
            "https://trattoria-backend-production.up.railway.app/api/orders/" +
              savedOrderId
          );

        let data = {};

        try {
          data =
            await response.json();
        } catch {
          data = {};
        }

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load order"
          );
        }

        if (!cancelled) {
          setOrder(data);
        }
      } catch (error) {
        console.error(
          "Order fetch error:",
          error
        );

        if (!cancelled) {
          setError(
            "Unable to load your order. Please make sure the backend server is running."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchOrder();

    return function () {
      cancelled = true;
    };
  }, []);

  /* -----------------------------------------
     CHECK ORDER STATUS
  ----------------------------------------- */

  useEffect(() => {
    const savedOrderId =
      localStorage.getItem(
        "trattoria_active_order_id"
      );

    if (!savedOrderId) {
      return;
    }

    async function refreshOrder() {
      try {
        const response =
          await fetch(
            "https://trattoria-backend-production.up.railway.app/api/orders/" +
              savedOrderId
          );

        if (!response.ok) {
          return;
        }

         const data =
          await response.json();

        setOrder(data);

        /* Once delivered or cancelled, clear the active
           order so the navbar stops showing "My Order". */
           if (data.status === "Cancelled") {
          localStorage.removeItem(
            "trattoria_active_order_id"
          );
        }
      } catch (error) {
        console.error(
          "Order status refresh error:",
          error
        );
      }
    }

    const timer =
      setInterval(
        refreshOrder,
        10000
      );

    return function () {
      clearInterval(timer);
    };
  }, []);

  /* -----------------------------------------
     REAL ORDER STATUS
  ----------------------------------------- */

  const orderStatus =
    order?.status ||
    "Pending";

  const canReview =
    orderStatus ===
    "Delivered";

  const isCancelled =
    orderStatus ===
    "Cancelled";

  /* -----------------------------------------
     REVIEW
  ----------------------------------------- */
  async function submitReview(e) {
    e.preventDefault();

    setReviewError("");

    const cleanReview = review.trim();

    if (cleanReview.length < 10) {
      setReviewError(
        "Review must be at least 10 characters."
      );
      return;
    }

    if (cleanReview.length > 500) {
      setReviewError(
        "Review cannot exceed 500 characters."
      );
      return;
    }

    try {
      const response = await fetch(
        "https://trattoria-backend-production.up.railway.app/api/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name:
              order?.customerName ||
              orderData.customerName ||
              "Customer",
            rating: Number(rating),
            comment: cleanReview,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      setReviewSubmitted(true);
      setReview("");
      setReviewError("");
    } catch (error) {
      console.error("Review submission error:", error);

      setReviewError(
        "Unable to submit review. Please try again."
      );
    }
  }
  /* -----------------------------------------
     ORDER NUMBER
  ----------------------------------------- */

  const orderNumber =
    order?.orderNumber ||
    orderData.orderNumber ||
    localStorage.getItem(
      "trattoria_order_number"
    ) ||
    "TR000000";

  /* -----------------------------------------
     CUSTOMER NAME
  ----------------------------------------- */

  const customerName =
    order?.customerName ||
    orderData.customerName ||
    "Customer";

  /* -----------------------------------------
     TOTAL
  ----------------------------------------- */

  const orderTotal =
    order?.total ??
    orderData.total ??
    0;

  /* -----------------------------------------
     ADDRESS
  ----------------------------------------- */

  const orderAddress =
    order?.address ||
    (
      orderData.address &&
      orderData.city
        ? orderData.address +
          ", " +
          orderData.city
        : orderData.address
    ) ||
    "Not provided";

  /* -----------------------------------------
     PAYMENT
  ----------------------------------------- */

  const paymentMethod =
    orderData.payment ||
    "Cash on Delivery";

  /* -----------------------------------------
     STATUS TEXT
  ----------------------------------------- */

  function getStatusText() {
    if (
      orderStatus ===
      "Pending"
    ) {
      return "Order received";
    }

    if (
      orderStatus ===
      "Preparing"
    ) {
      return "Preparing your order";
    }

    if (
      orderStatus ===
      "Out for Delivery"
    ) {
      return "Your order is out for delivery";
    }

    if (
      orderStatus ===
      "Delivered"
    ) {
      return "Your order has been delivered";
    }

    if (
      orderStatus ===
      "Cancelled"
    ) {
      return "Your order has been cancelled";
    }

    return "Preparing your order";
  }

  if (loading) {
    return (
      <main className="order-page">
        <div className="order-card">
          <div className="order-confirmed-label">
            <span className="order-check">
              ✓
            </span>

            <span>
              ORDER CONFIRMED
            </span>
          </div>

          <div className="order-status-icon">
            🛵
          </div>

          <h1>
            LOADING ORDER
          </h1>

          <p className="order-subtitle">
            Please wait while we load your order.
          </p>
        </div>
      </main>
    );
  }

  if (error && !order) {
    return (
      <main className="order-page">
        <div className="order-card">
          <div className="order-confirmed-label">
            <span className="order-check">
              ✓
            </span>

            <span>
              ORDER CONFIRMED
            </span>
          </div>

          <div className="order-status-icon">
            🛵
          </div>

          <h1>
            ORDER PLACED
          </h1>

          <p className="order-subtitle">
            Your order was placed successfully.
          </p>

          <p className="order-description">
            {error}
          </p>

          <button
            className="primary-btn"
            onClick={function () {
              navigate("/");
            }}
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="order-page">

      {/* =====================================================
          MAIN ORDER CARD
      ===================================================== */}

      <div className="order-card">

        {/* TOP LABEL */}

        <div className="order-confirmed-label">
          <span className="order-check">
            ✓
          </span>

          <span>
            ORDER CONFIRMED
          </span>
        </div>

        {/* DELIVERY ICON */}

        <div
          className={`order-status-icon ${
            canReview
              ? "order-delivered-icon"
              : ""
          }`}
        >
          {isCancelled
            ? "✕"
            : canReview
            ? "✓"
            : "🛵"}
        </div>
{orderStatus === "Cancelled" ? (
          <>
            <div className="delivered-label">
              ORDER CANCELLED
            </div>

            <h1 className="delivered-heading">
              ORDER CANCELLED
            </h1>

            <p className="order-subtitle">
              Unfortunately, your order has been cancelled.
            </p>

            <div className="delivered-status">
              <span>
                ✕
              </span>

              <span>
                Your order has been cancelled
              </span>
            </div>

            <p className="order-description">
              Please contact Trattoria if you need
              more information about your order.
            </p>

            <div
              style={{
                marginTop: "25px",
              }}
            >
              <button
                className="primary-btn"
                onClick={function () {
                  localStorage.removeItem(
                    "trattoria_active_order_id"
                  );
                  window.location.href = "/";
                }}
              >
                Back to Home
              </button>
            </div>
          </>
        ) : orderStatus === "Delivered" ? (
          <>
            <div className="delivered-label">
              ORDER DELIVERED
            </div>

            <h1 className="delivered-heading">
              THANK YOU!
            </h1>

            <p className="order-subtitle">
              Your order has been delivered.
              We hope you enjoyed your
              Trattoria experience.
            </p>

            <div className="delivered-status">
              <span>
                ✓
              </span>

              <span>
                Your order has been delivered
              </span>
            </div>

            <p className="order-description">
              Thank you for dining with
              Trattoria. We look forward to
              serving you again soon.
            </p>
            <div className="order-review-card">
              {!reviewSubmitted ? (
                <>
                                  <div className="review-stars-large">
                    {[1, 2, 3, 4, 5].map(function (star) {
                      return (
                        <span
                          key={star}
                          onClick={function () {
                            setRating(star);
                          }}
                          style={{
                            cursor: "pointer",
                            color:
                              star <= rating
                                ? "#b07a4f"
                                : "#d9c8b3",
                            fontSize: "34px",
                            margin: "0 4px",
                            transition: "0.15s ease",
                          }}
                        >
                          ★
                        </span>
                      );
                    })}
                  </div>

                  <p
                    style={{
                      color: "#806f63",
                      fontSize: "13px",
                      marginBottom: "20px",
                    }}
                  >
                    {rating === 5
                      ? "Excellent"
                      : rating === 4
                      ? "Very Good"
                      : rating === 3
                      ? "Good"
                      : rating === 2
                      ? "Fair"
                      : "Poor"}
                  </p>

                  <h2>Share Your Experience</h2>

                  <p>
                    Your feedback helps us make
                    every Trattoria experience
                    better.
                  </p>

                  <form onSubmit={submitReview}>
                    <textarea
                      value={review}
                      onChange={function (e) {
                        setReview(e.target.value);
                      }}
                      placeholder="Tell us about your meal..."
                      maxLength="500"
                      required
                    />
                    <div className="review-character-count">
                      {review.length}/500
                    </div>

                    {reviewError && (
                      <p
                        style={{
                          color: "#b21f3a",
                          background: "#fff2f4",
                          border: "1px solid #f3c2cc",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: "600",
                          margin: "10px 0 0",
                        }}
                      >
                        ⚠ {reviewError}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="order-review-btn"
                    >
                      Submit Review
                    </button>
                  </form>
                </>
              ) : (
                <div className="review-success">
                  <div className="review-success-icon">✓</div>

                  <h2>Thank You!</h2>

                  <p>Your feedback means a lot to Trattoria.</p>
                </div>
              )}
            </div>
            <div
              style={{
                marginTop: "25px",
              }}
            >
              <button
                className="primary-btn"
                onClick={function () {
                  localStorage.removeItem(
                    "trattoria_active_order_id"
                  );
                  window.location.href = "/";
                }}
              >
                Back to Home
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>
              {orderStatus === "Pending"
                ? "ORDER RECEIVED"
                : orderStatus === "Preparing"
                ? "PREPARING YOUR ORDER"
                : orderStatus === "Out for Delivery"
                ? "OUT FOR DELIVERY"
                : "ORDER PLACED"}
            </h1>

            <p className="order-subtitle">
              {orderStatus === "Pending"
                ? "We have received your order."
                : orderStatus === "Preparing"
                ? "Our chefs are preparing your meal."
                : orderStatus === "Out for Delivery"
                ? "Your order is on the way to you."
                : "Your order is being prepared."}
            </p>

            <div className="delivery-status">
              <span className="delivery-status-dot"></span>

              <span>
                {getStatusText()}
              </span>
            </div>

                        <div className="delivery-time-card">
              <span className="delivery-time-label">
                EXPECTED DELIVERY
              </span>

              <div className="delivery-time">
                <strong>30–40</strong>
                <span>minutes</span>
              </div>
            </div>

            <p className="order-description">
              Your delicious food is being
              prepared by our chefs. Our
              delivery rider will bring your
              order to you as soon as possible.
            </p>
          </>
        )}
            
        {/* =====================================================
            ORDER INFORMATION
        ===================================================== */}

        {showInfo && (
          <div className="order-info">

            <div className="order-info-title">
              ORDER DETAILS
            </div>

            <div className="order-info-grid">

              <div className="order-info-item">
                <span>
                  ORDER NUMBER
                </span>

                <strong>
                  {orderNumber}
                </strong>
              </div>

              <div className="order-info-item">
                <span>
                  CUSTOMER
                </span>

                <strong>
                  {customerName}
                </strong>
              </div>

              <div className="order-info-item">
                <span>
                  TOTAL
                </span>

           <strong>
                  Rs{" "}
                  {Number(
                    orderTotal
                  ).toFixed(2)}
                </strong>
              </div>

              <div className="order-info-item">
                <span>
                  PAYMENT
                </span>

                <strong>
                  {paymentMethod}
                </strong>
              </div>

              <div className="order-info-item full-width">
                <span>
                  DELIVERY ADDRESS
                </span>

                <strong>
                  {orderAddress}
                </strong>
              </div>

              <div className="order-info-item">
                <span>
                  STATUS
                </span>

                <strong>
                  {orderStatus}
                </strong>
              </div>

            </div>

            <button
              type="button"
              className="order-info-toggle"
              onClick={function () {
                setShowInfo(false);
              }}
            >
              Hide Order Details
            </button>

          </div>
        )}

        {!showInfo && (
          <button
            type="button"
            className="order-info-toggle"
            onClick={function () {
              setShowInfo(true);
            }}
          >
            Show Order Details
          </button>
        )}

      </div>
    </main>
  );
}

/* =========================================================
   GALLERY
========================================================= */

function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
  ];

  return (
    <main className="page">
      <p className="small-title">
        OUR RESTAURANT
      </p>

      <h1>
        Gallery
      </h1>

      <div className="gallery">
        {images.map(function (
          image,
          index
        ) {
          return (
            <img
              key={index}
              src={image}
              alt={
                "Trattoria " +
                (index + 1)
              }
            />
          );
        })}
      </div>
    </main>
  );
}

/* =========================================================
   REVIEWS
========================================================= */

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function fetchReviews() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://trattoria-backend-production.up.railway.app/api/reviews"
      );

      if (!response.ok) {
        throw new Error("Failed to load reviews");
      }

      const data = await response.json();

      setReviews(data);
    } catch (error) {
      console.error("Reviews error:", error);
      setError("Unable to load reviews.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    setFormError("");

    if (name.trim().length < 2) {
      setFormError(
        "Name must be at least 2 characters."
      );
      return;
    }

    if (comment.trim().length < 5) {
      setFormError(
        "Review must be at least 5 characters."
      );
      return;
    }

    if (comment.trim().length > 500) {
      setFormError(
        "Review cannot exceed 500 characters."
      );
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
            name: name.trim(),
            rating: Number(rating),
            comment: comment.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit review"
        );
      }

      setReviews(function (previous) {
        return [data, ...previous];
      });

      setName("");
      setRating(5);
      setComment("");
    } catch (error) {
      console.error(
        "Submit review error:",
        error
      );

      setFormError(
        "Unable to submit review. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page reviews-page">
      <p className="small-title">
        GUEST EXPERIENCES
      </p>

      <h1>
        What Our Guests Say
      </h1>

      <p className="reviews-intro">
        Every visit has a story. Share yours with us.
      </p>


      {/* REVIEWS */}

      <section className="reviews-section">
        <div className="reviews-section-heading">
          <span>FROM OUR GUESTS</span>

          <h2>
            Recent Reviews
          </h2>
        </div>

        {loading ? (
          <div className="reviews-loading">
            Loading reviews...
          </div>
        ) : error ? (
          <div className="reviews-error">
            {error}
          </div>
        ) : reviews.length === 0 ? (
          <div className="reviews-empty">
            <h3>
              No reviews yet
            </h3>

            <p>
              Be the first guest to share your experience.
            </p>
          </div>
        ) : (
          <div className="reviews">
            {reviews.map(function (review) {
              return (
                <div
                  className="review"
                  key={review._id}
                >
                  <div className="review-stars">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>

                  <p>
                    "{review.comment}"
                  </p>

                  <strong>
                    {review.name}
                  </strong>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

/* =========================================================
   CONTACT
========================================================= */

function Contact() {
  return (
    <main className="page">
      <p className="small-title">
        GET IN TOUCH
      </p>

      <h1>
        Contact Us
      </h1>

      <div className="contact-box">
        <div>
          <h2>
            Visit Trattoria
          </h2>

          <p>
            📍 Main Street, Abbottabad, Pakistan
          </p>

          <p>
            📞 +92 300 1234567
          </p>

          <p>
            ✉️ hello@trattoria.com
          </p>
        </div>

        <div>
          <h2>
            Opening Hours
          </h2>

          <p>
            Monday – Thursday: 11:00 AM – 10:00 PM
          </p>

          <p>
            Friday – Sunday: 11:00 AM – 11:30 PM
          </p>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   RESERVATION
========================================================= */
function Reservation() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [myReservation, setMyReservation] = useState(null);
  const [checkingReservation, setCheckingReservation] = useState(true);

  const OPEN_HOUR = 11;
  const CLOSE_HOUR = 22;

  useEffect(() => {
    async function checkExisting() {
      const savedId = localStorage.getItem("trattoria_my_reservation_id");
      if (!savedId) {
        setCheckingReservation(false);
        return;
      }
      try {
        const response = await fetch(
          "https://trattoria-backend-production.up.railway.app/api/reservations"
        );
        if (!response.ok) {
          setCheckingReservation(false);
          return;
        }
        const list = await response.json();
        const found = list.find(function (r) {
          return r._id === savedId;
        });
        if (found) {
          setMyReservation(found);
        } else {
          localStorage.removeItem("trattoria_my_reservation_id");
        }
      } catch (error) {
        console.error("Reservation check failed:", error);
      } finally {
        setCheckingReservation(false);
      }
    }
    checkExisting();
  }, []);

  useEffect(() => {
    if (!myReservation) return;
    const savedId = localStorage.getItem("trattoria_my_reservation_id");
    if (!savedId) return;
    async function refresh() {
      try {
        const response = await fetch(
          "https://trattoria-backend-production.up.railway.app/api/reservations"
        );
        if (!response.ok) return;
        const list = await response.json();
        const found = list.find(function (r) {
          return r._id === savedId;
        });
        if (!found) {
          localStorage.removeItem("trattoria_my_reservation_id");
          setMyReservation(null);
        } else {
          setMyReservation(found);
        }
      } catch (error) {
        console.error("Refresh failed:", error);
      }
    }
    const timer = setInterval(refresh, 10000);
    return function () {
      clearInterval(timer);
    };
  }, [myReservation]);

  async function handleReservation(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    if (!cleanName || !cleanEmail || !cleanPhone || !date || !time || !guests) {
      setError("Please enter valid data.");
      return;
    }

    const namePattern = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
    if (cleanName.length < 2 || cleanName.length > 50 || !namePattern.test(cleanName)) {
      setError("Please enter valid data.");
      return;
    }

    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (
      cleanEmail.length < 6 ||
      cleanEmail.length > 100 ||
      !emailPattern.test(cleanEmail) ||
      cleanEmail.includes("..")
    ) {
      setError("Please enter valid data.");
      return;
    }

    let normalizedPhone = cleanPhone.replace(/[\s-]/g, "");
    if (normalizedPhone.startsWith("+92")) {
      normalizedPhone = "0" + normalizedPhone.slice(3);
    }
    const phonePattern = /^03[0-9]{9}$/;
    if (!phonePattern.test(normalizedPhone)) {
      setError("Please enter valid data.");
      return;
    }
    const phoneDigits = normalizedPhone.slice(1);
    const allSame = phoneDigits.split("").every(function (digit) {
      return digit === phoneDigits[0];
    });
    if (allSame) {
      setError("Please enter valid data.");
      return;
    }

    const guestNumber = Number(guests);
    if (!Number.isInteger(guestNumber) || guestNumber < 1 || guestNumber > 15) {
      setError("Please enter valid data. Maximum 15 people can be reserved at a time.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date + "T00:00:00");
    selectedDate.setHours(0, 0, 0, 0);
    if (Number.isNaN(selectedDate.getTime()) || selectedDate < today) {
      setError("Please enter valid data.");
      return;
    }

    const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
    if (!timePattern.test(time)) {
      setError("Please enter valid data.");
      return;
    }
    const hourPart = Number(time.split(":")[0]);
    const minutePart = Number(time.split(":")[1]);
    if (hourPart < OPEN_HOUR || hourPart >= CLOSE_HOUR || (hourPart === CLOSE_HOUR - 1 && minutePart > 30)) {
      setError("Reservation time must be between 11:00 AM and 9:30 PM.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://trattoria-backend-production.up.railway.app/api/reservations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            phone: normalizedPhone,
            date: date,
            time: time,
            guests: guestNumber,
          }),
        }
      );

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error("Reservation could not be saved");
      }

      if (data._id) {
        localStorage.setItem("trattoria_my_reservation_id", data._id.toString());
      }

      setMyReservation(data);
      setMessage("Reservation confirmed! Thank you " + cleanName + ". 🎉");
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("");
      setGuests("");
    } catch (error) {
      console.error("Reservation error:", error);
      setError("Please enter valid data.");
    } finally {
      setLoading(false);
    }
  }

  if (checkingReservation) {
    return (
      <main style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#faf7f2" }}>
        <p style={{ color: "#77716a" }}>Checking your reservations…</p>
      </main>
    );
  }

  if (myReservation) {
    const r = myReservation;
    const firstLetter = (r.name || "G").charAt(0).toUpperCase();
    return (
      <main style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 20px", background: "#faf7f2" }}>
        <div style={{ maxWidth: "620px", width: "100%", background: "#ffffff", border: "1px solid #e9e1d8", borderRadius: "24px", padding: "45px 40px", textAlign: "center", boxShadow: "0 20px 50px rgba(45, 30, 20, 0.08)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#eaf6ea", border: "1px solid #b9dfb9", color: "#2f7a3f", padding: "6px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", marginBottom: "22px" }}>
            ✓ RESERVATION CONFIRMED
          </div>

          <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "#8b4f35", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px", fontSize: "28px", fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>
            {firstLetter}
          </div>

          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: "32px", lineHeight: 1.2, color: "#171513", marginBottom: "10px" }}>
            Thank you, {r.name}!
          </h2>

          <p style={{ color: "#77716a", fontSize: "15px", lineHeight: 1.7, marginBottom: "32px" }}>
            Your table has been booked at Trattoria. We look forward to serving you.
          </p>

          <div style={{ background: "#faf7f2", border: "1px solid #e9e1d8", borderRadius: "16px", padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", textAlign: "left", marginBottom: "30px" }}>
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "#8b4f35", marginBottom: "6px" }}>DATE</div>
              <div style={{ color: "#171513", fontWeight: 700 }}>{r.date}</div>
            </div>
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "#8b4f35", marginBottom: "6px" }}>TIME</div>
              <div style={{ color: "#171513", fontWeight: 700 }}>{r.time}</div>
            </div>
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "#8b4f35", marginBottom: "6px" }}>GUESTS</div>
              <div style={{ color: "#171513", fontWeight: 700 }}>{r.guests} {Number(r.guests) === 1 ? "person" : "people"}</div>
            </div>
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "#8b4f35", marginBottom: "6px" }}>PHONE</div>
              <div style={{ color: "#171513", fontWeight: 700 }}>{r.phone}</div>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "#8b4f35", marginBottom: "6px" }}>EMAIL</div>
              <div style={{ color: "#171513", fontWeight: 700, wordBreak: "break-all" }}>{r.email}</div>
            </div>
          </div>

          <p style={{ color: "#77716a", fontSize: "13px", marginBottom: "22px" }}>
            Need to cancel or change? Please contact Trattoria directly.
          </p>

          <Link to="/" style={{ display: "inline-block", background: "#171513", color: "#ffffff", padding: "13px 28px", borderRadius: "50px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page reservation-page">
      <p className="small-title">BOOK YOUR TABLE</p>
      <h1>Make a Reservation</h1>

      <form className="reservation-form" onSubmit={handleReservation}>
            <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            width: "100%",
          }}
        >
          <label
            htmlFor="res-time"
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#3f3934",
              marginBottom: "2px",
            }}
          >
            Select Time (11:00 AM – 9:30 PM)
          </label>
          <select
            id="res-time"
            value={time}
            onChange={function (e) {
              setTime(e.target.value);
            }}
            required
            style={{
              width: "100%",
              padding: "14px 40px 14px 16px",
              border: "1px solid #e9e1d8",
              borderRadius: "12px",
              outline: "none",
              background:
                "#fcfaf7 url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238b4f35' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\") no-repeat right 14px center",
              backgroundSize: "16px",
              fontFamily: "inherit",
              fontSize: "15px",
              color: "#171513",
              boxSizing: "border-box",
              appearance: "none",
              WebkitAppearance: "none",
            }}
          >
            <option value="">Choose a time</option>
            <option value="11:00">11:00 AM</option>
            <option value="11:30">11:30 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="12:30">12:30 PM</option>
            <option value="13:00">1:00 PM</option>
            <option value="13:30">1:30 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="14:30">2:30 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="15:30">3:30 PM</option>
            <option value="16:00">4:00 PM</option>
            <option value="16:30">4:30 PM</option>
            <option value="17:00">5:00 PM</option>
            <option value="17:30">5:30 PM</option>
            <option value="18:00">6:00 PM</option>
            <option value="18:30">6:30 PM</option>
            <option value="19:00">7:00 PM</option>
            <option value="19:30">7:30 PM</option>
            <option value="20:00">8:00 PM</option>
            <option value="20:30">8:30 PM</option>
            <option value="21:00">9:00 PM</option>
            <option value="21:30">9:30 PM</option>
          </select>
          <small
            style={{
              color: "#77716a",
              fontSize: "12px",
              marginTop: "4px",
            }}
          >
            Open daily from 11:00 AM to 10:00 PM.
          </small>
        </div>

        <div className="reservation-field">
          <label htmlFor="res-guests">Number of Guests</label>
          <input id="res-guests" type="number" placeholder="1–15" min="1" max="15" value={guests} onChange={function (e) { setGuests(e.target.value); }} required />
        </div>

        {error && <p className="reservation-error">{error}</p>}
        {message && <p className="reservation-success">{message}</p>}

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? "Saving Reservation..." : "Confirm Reservation"}
        </button>
      </form>
    </main>
  );
}

/* =========================================================
   APP
========================================================= */

function AdminRoute({ children }) {
  const isAdmin =
    localStorage.getItem(
      "adminLoggedIn"
    );

  if (isAdmin !== "true") {
    return (
      <Navigate
        to="/admin-login"
        replace
      />
    );
  }

  return children;
}

function App() {
  const [cart, setCart] =
    useState([]);

  const cartCount =
    cart.reduce(function (
      total,
      item
    ) {
      return (
        total + item.quantity
      );
    }, 0);

  return (
    <BrowserRouter>
      <Navbar
        cartCount={cartCount}
      />

      <Routes>

        <Route
          path="/admin-login"
          element={
            <AdminLogin />
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/"
          element={
            <Home />
          }
        />

        <Route
          path="/about"
          element={
            <About />
          }
        />

        <Route
          path="/menu"
          element={
            <Menu
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/order-placed"
          element={
            <OrderPlaced />
          }
        />

        <Route
          path="/gallery"
          element={
            <Gallery />
          }
        />

        {/* PUBLIC - customers can add reviews */}

        <Route
          path="/reviews"
          element={
            <Reviews />
          }
        />

        <Route
          path="/contact"
          element={
            <Contact />
          }
        />

        <Route
          path="/reservation"
          element={
            <Reservation />
          }
        />

        {/* ADMIN ONLY */}

        <Route
          path="/manage-menu"
          element={
            <AdminRoute>
              <ManageMenu />
            </AdminRoute>
          }
        />

        <Route
          path="/manage-orders"
          element={
            <AdminRoute>
              <ManageOrders />
            </AdminRoute>
          }
        />

        <Route
          path="/manage-reservations"
          element={
            <AdminRoute>
              <ManageReservations />
            </AdminRoute>
          }
        />

        <Route
          path="/manage-reviews"
          element={
            <AdminRoute>
              <ManageReviews />
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;