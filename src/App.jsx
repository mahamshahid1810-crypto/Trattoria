import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";


/* =========================================================
   NAVBAR
========================================================= */

function Navbar({ cartCount }) {

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

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
          to="/checkout"
          className="cart-nav-btn"
          onClick={closeMenu}
        >
          🛒 Cart

          {cartCount > 0 && (
            <span>
              {cartCount}
            </span>
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

  return (
    <main>

      <section className="hero">

        <div className="hero-content">

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

  const [
    activeCategory,
    setActiveCategory
  ] = useState("All");


  /* =======================================================
     DISHES
  ======================================================= */

  const dishes = [

    {
      name: "Margherita Pizza",
      category: "Pizza",
      description:
        "Tomato, mozzarella, fresh basil and extra virgin olive oil.",
      price: 15,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=90",
    },


    {
      name: "Pepperoni Pizza",
      category: "Pizza",
      description:
        "Mozzarella, tomato sauce and spicy Italian pepperoni.",
      price: 17,
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=90",
    },


    {
      name: "Classic Trattoria Burger",
      category: "Burgers",
      description:
        "Premium beef, cheddar, lettuce, tomato and house sauce.",
      price: 16,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=90",
    },


    {
      name: "Double Cheese Burger",
      category: "Burgers",
      description:
        "Two juicy beef patties, melted cheddar and special sauce.",
      price: 19,
      image:
        "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=900&q=90",
    },


    {
      name: "Creamy Carbonara",
      category: "Pasta",
      description:
        "Spaghetti, parmesan, egg yolk and crispy pancetta.",
      price: 18,
      image:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=900&q=90",
    },


    {
      name: "Truffle Pasta",
      category: "Pasta",
      description:
        "Fresh homemade pasta with creamy truffle sauce.",
      price: 21,
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=90",
    },


    {
      name: "Classic Tiramisu",
      category: "Sweets",
      description:
        "Mascarpone, espresso, cocoa and Italian ladyfingers.",
      price: 8,
      image:
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=90",
    },


    {
      name: "Chocolate Cake",
      category: "Sweets",
      description:
        "Rich chocolate cake with creamy chocolate frosting.",
      price: 10,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=90",
    },


    {
      name: "Vanilla Gelato",
      category: "Ice Cream",
      description:
        "Smooth classic Italian vanilla gelato.",
      price: 6,
      image:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=90",
    },


    {
      name: "Pistachio Gelato",
      category: "Ice Cream",
      description:
        "Creamy Sicilian pistachio gelato.",
      price: 7,
      image:
        "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=900&q=90",
    },


    {
      name: "Bruschetta",
      category: "Starters",
      description:
        "Toasted Italian bread, tomatoes, basil and olive oil.",
      price: 9,
      image:
        "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=900&q=90",
    },


    {
      name: "Garlic Bread",
      category: "Starters",
      description:
        "Crispy Italian bread with garlic butter and herbs.",
      price: 7,
      image:
        "https://www.foodandwine.com/thmb/pxx49mdooRZWdYRsBFzygKIU4AE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/parmesan-garlic-bread-FT-RECIPE0825-2c5ceae59ad34210886c4576e89617cd.jpg",
    },


    {
      name: "Chicken Parmesan",
      category: "Main Course",
      description:
        "Crispy chicken, tomato sauce, mozzarella and herbs.",
      price: 19,
      image:
        "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=900&q=90",
    },


    {
      name: "Italian Beef Steak",
      category: "Main Course",
      description:
        "Tender grilled steak with rosemary and roasted potatoes.",
      price: 29,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqGR5hEbe6-xyp1v6beN5nbk3VBixcIrZhPBlxfQDqdVeYzlb0Mz1biQtb&s=10",
    },


    {
      name: "Fresh Lemonade",
      category: "Drinks",
      description:
        "Fresh lemon, mint and ice.",
      price: 6,
      image:
        "https://thumbs.dreamstime.com/b/cold-water-lemon-mint-leaf-fresh-lemonade-lime-slice-ice-cubes-nonalcoholic-beverage-cocktail-glass-black-95092476.jpg",
    },


    {
      name: "Cappuccino",
      category: "Drinks",
      description:
        "Espresso with steamed milk and creamy Italian foam.",
      price: 5,
      image:
        "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=90",
    },

  ];


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
          (dish) =>
            dish.category === activeCategory
        );


  /* =======================================================
     ADD TO CART
  ======================================================= */

  const addToCart = (dish) => {

    const existingItem =
      cart.find(
        (item) =>
          item.name === dish.name
      );


    if (existingItem) {

      setCart(
        cart.map(
          (item) =>
            item.name === dish.name
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...dish,
          quantity: 1,
        },
      ]);

    }

  };


  const cartCount =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  return (
    <main className="page menu-page">

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


      {/* CART */}

      <Link
        to="/checkout"
        className="cart-counter"
      >

        🛒 Cart

        <span>
          {cartCount}
        </span>

      </Link>


      {/* CATEGORIES */}

      <div className="menu-categories">

        {categories.map(
          (category) => (

            <button
              key={category}
              className={
                activeCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() =>
                setActiveCategory(
                  category
                )
              }
            >
              {category}
            </button>

          )
        )}

      </div>


      {/* DISHES */}

      <div className="menu-grid">

        {filteredDishes.map(
          (dish) => (

            <article
              className="dish-card"
              key={dish.name}
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
                    ${dish.price}
                  </strong>

                </div>


                <div className="dish-rating">

                  ★★★★★

                  <small>
                    4.9
                  </small>

                </div>


                <p>
                  {dish.description}
                </p>


                <button
                  className="dish-btn"
                  onClick={() =>
                    addToCart(dish)
                  }
                >
                  🛒 Add to Cart
                </button>

              </div>

            </article>

          )
        )}

      </div>


      {/* CART NOTIFICATION */}

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

function Checkout({ cart, setCart }) {

  const navigate = useNavigate();


  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [city, setCity] =
    useState("");

  const [payment, setPayment] =
    useState("Cash on Delivery");


  /* =======================================================
     QUANTITY
  ======================================================= */

  const increaseQuantity = (itemName) => {

    setCart(
      cart.map(
        (item) =>
          item.name === itemName
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
      )
    );

  };


  const decreaseQuantity = (itemName) => {

    setCart(
      cart
        .map(
          (item) =>
            item.name === itemName
              ? {
                  ...item,
                  quantity:
                    item.quantity - 1,
                }
              : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );

  };


  const removeItem = (itemName) => {

    setCart(
      cart.filter(
        (item) =>
          item.name !== itemName
      )
    );

  };


  /* =======================================================
     PAYMENT
  ======================================================= */

  const subtotal =
    cart.reduce(
      (total, item) =>
        total +
        item.price *
          item.quantity,
      0
    );


  const deliveryFee =
    cart.length > 0
      ? 3
      : 0;


  const total =
    subtotal + deliveryFee;


  /* =======================================================
     CONFIRM ORDER
  ======================================================= */

  const confirmOrder = (e) => {

    e.preventDefault();


    if (cart.length === 0) {

      alert(
        "Your cart is empty. Please add some delicious food first!"
      );

      return;

    }


    /* Generate simple order number */

    const orderNumber =
      "TR" +
      Math.floor(
        100000 +
        Math.random() * 900000
      );


    /*
      FIRST ALERT
    */

    alert(
      `Order confirmed! 🎉\n\nThank you ${name}!\n\nTotal Payment: $${total.toFixed(
        2
      )}\n\nYour order will arrive in 30–40 minutes.\n\nOrder #${orderNumber}`
    );


    /*
      CLEAR CART
    */

    setCart([]);


    /*
      CLEAR CUSTOMER INFORMATION
    */

    setName("");
    setPhone("");
    setAddress("");
    setCity("");
    setPayment("Cash on Delivery");


    /*
      AFTER ALERT:
      GO TO ORDER PLACED PAGE
    */

    navigate("/order-placed", {
      state: {
        orderNumber: orderNumber,
        customerName: name,
        total: total,
        city: city,
        address: address,
      },
    });

  };


  /* =======================================================
     EMPTY CART
  ======================================================= */

  if (cart.length === 0) {

    return (

      <main className="page checkout-page">

        <p className="small-title">
          YOUR ORDER
        </p>


        <h1>
          Your Cart is Empty
        </h1>


        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>


          <h2>
            Nothing here yet
          </h2>


          <p>
            Add your favorite Italian
            dishes to start your order.
          </p>


          <Link
            to="/menu"
            className="primary-btn"
          >
            Browse Menu
          </Link>

        </div>

      </main>

    );

  }


  return (

    <main className="page checkout-page">

      <p className="small-title">
        YOUR ORDER
      </p>


      <h1>
        Confirm Your Order
      </h1>


      <div className="checkout-layout">


        {/* =================================================
            ORDER ITEMS
        ================================================= */}

        <section className="order-section">

          <h2>
            Your Items
          </h2>


          {cart.map(
            (item) => (

              <div
                className="order-item"
                key={item.name}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />


                <div className="order-item-info">

                  <h3>
                    {item.name}
                  </h3>


                  <p>
                    ${item.price} each
                  </p>


                  <div className="quantity-controls">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(
                          item.name
                        )
                      }
                    >
                      −
                    </button>


                    <span>
                      {item.quantity}
                    </span>


                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(
                          item.name
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                </div>


                <div className="order-item-right">

                  <strong>
                    $
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </strong>


                  <button
                    type="button"
                    className="remove-item"
                    onClick={() =>
                      removeItem(
                        item.name
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            )
          )}

        </section>


        {/* =================================================
            ORDER SUMMARY
        ================================================= */}

        <aside className="checkout-summary">

          <h2>
            Order Summary
          </h2>


          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              ${subtotal.toFixed(2)}
            </strong>

          </div>


          <div className="summary-row">

            <span>
              Delivery Fee
            </span>

            <strong>
              ${deliveryFee.toFixed(2)}
            </strong>

          </div>


          <div className="summary-divider"></div>


          <div className="summary-total">

            <span>
              Total Payment
            </span>

            <strong>
              ${total.toFixed(2)}
            </strong>

          </div>


          <p className="delivery-note">
            🚚 Estimated delivery: 30–40 minutes
          </p>

        </aside>

      </div>


      {/* =================================================
          CUSTOMER DETAILS
      ================================================= */}

      <section className="order-details">

        <h2>
          Confirm Your Details
        </h2>


        <form
          onSubmit={confirmOrder}
          className="order-form"
        >


          {/* NAME */}

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              required
            />

          </div>


          {/* PHONE */}

          <div className="form-group">

            <label>
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="+92 300 1234567"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              required
            />

          </div>


          {/* ADDRESS */}

          <div className="form-group full-width">

            <label>
              Delivery Address
            </label>

            <input
              type="text"
              placeholder="House number, street, area"
              value={address}
              onChange={(e) =>
                setAddress(
                  e.target.value
                )
              }
              required
            />

          </div>


          {/* CITY */}

          <div className="form-group">

            <label>
              area
            </label>

            <select
              value={city}
              onChange={(e) =>
                setCity(
                  e.target.value
                )
              }
              required
            >

              <option value="">
                Select your area
              </option>

              <option value="kaghan colony">
                kaghan colony
              </option>

              <option value="jinahabad">
                jinahabad
              </option>

              <option value="kehal">
                kehal
              </option>

              <option value="supply">
                supply
              </option>

              <option value="mandian">
                mandian
              </option>

              <option value="mirpur">
                jhangi
              </option>

            </select>

          </div>


          {/* PAYMENT */}

          <div className="form-group">

            <label>
              Payment Method
            </label>

            <select
              value={payment}
              onChange={(e) =>
                setPayment(
                  e.target.value
                )
              }
            >

              <option value="Cash on Delivery">
                Cash on Delivery
              </option>

              <option value="Card Payment">
                Card Payment
              </option>

              <option value="PayPal">
                PayPal
              </option>

            </select>

          </div>


          {/* =================================================
              FINAL CONFIRM BUTTON
          ================================================= */}

          <button
            type="submit"
            className="confirm-order-btn"
          >

            <span>
              Confirm Your Order
            </span>

            <strong>
              ${total.toFixed(2)}
            </strong>

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


  /*
     Get order information from navigation
  */

  let orderData = null;

  try {

    const locationState =
      window.history.state?.usr;

    orderData = locationState;

  } catch {
    orderData = null;
  }


  /*
     IMPORTANT:
     React Router navigation state is normally
     available through useLocation.
  */

  return (
    <OrderPlacedContent
      orderData={orderData}
      navigate={navigate}
    />
  );
}


/* =========================================================
   ORDER PLACED CONTENT
========================================================= */

function OrderPlacedContent({
  orderData,
  navigate
}) {

  const [showInfo, setShowInfo] =
    useState(true);


  return (

    <main
      style={{
        minHeight: "80vh",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 20px",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "650px",
          textAlign: "center",
          background: "#ffffff",
          padding: "45px 30px",
          borderRadius: "24px",
          boxShadow:
            "0 15px 50px rgba(0,0,0,0.10)",
        }}
      >

        {/* PROGRESS */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "30px",
          }}
        >

          <div
            style={{
              width: "70px",
              height: "5px",
              background: "#b21f3a",
              borderRadius: "10px",
            }}
          />

          <div
            style={{
              width: "70px",
              height: "5px",
              background: "#eadfe1",
              borderRadius: "10px",
            }}
          />

          <div
            style={{
              width: "70px",
              height: "5px",
              background: "#eadfe1",
              borderRadius: "10px",
            }}
          />

          <div
            style={{
              width: "70px",
              height: "5px",
              background: "#eadfe1",
              borderRadius: "10px",
            }}
          />

        </div>


        {/* STEP */}

        <p
          style={{
            color: "#b21f3a",
            fontWeight: "800",
            fontSize: "22px",
            letterSpacing: "2px",
            marginBottom: "15px",
          }}
        >
          STEP 1
        </p>


        {/* DELIVERY ICON */}

        <div
          style={{
            fontSize: "75px",
            marginBottom: "10px",
          }}
        >
          🛵
        </div>


        {/* ORDER PLACED */}

        <h1
          style={{
            fontSize: "48px",
            fontWeight: "900",
            color: "#111",
            margin: "10px 0 20px",
            letterSpacing: "1px",
          }}
        >
          ORDER PLACED
        </h1>


        {/* DELIVERY */}

        <p
          style={{
            fontSize: "22px",
            color: "#555",
            marginBottom: "8px",
          }}
        >
          Expected Delivery Time
        </p>


        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, #fff2f4, #ffe5ea)",
            borderRadius: "18px",
            padding: "18px 35px",
            margin: "10px 0 25px",
          }}
        >

          <strong
            style={{
              fontSize: "38px",
              color: "#b21f3a",
            }}
          >
            30–40
          </strong>

          <span
            style={{
              fontSize: "20px",
              color: "#555",
              marginLeft: "10px",
            }}
          >
            minutes
          </span>

        </div>


        {/* MESSAGE */}

        <p
          style={{
            color: "#666",
            fontSize: "17px",
            lineHeight: "1.7",
            maxWidth: "480px",
            margin: "0 auto 25px",
          }}
        >
          Your delicious food is being prepared
          by our chefs. Our delivery rider will
          bring your order to you as soon as
          possible.
        </p>


        {/* ORDER INFO */}

        {showInfo && (

          <div
            style={{
              background: "#faf7f7",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "25px",
              textAlign: "left",
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >

              <span>
                Order Number
              </span>

              <strong>
                #{orderData?.orderNumber || "TR000000"}
              </strong>

            </div>


            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >

              <span>
                Total Payment
              </span>

              <strong>
                $
                {orderData?.total
                  ? Number(
                      orderData.total
                    ).toFixed(2)
                  : "0.00"}
              </strong>

            </div>

          </div>

        )}


        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >

          <button
            onClick={() =>
              setShowInfo(!showInfo)
            }
            style={{
              padding: "13px 22px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {showInfo
              ? "Hide Details"
              : "View Details"}
          </button>


          <button
            onClick={() =>
              navigate("/menu")
            }
            style={{
              padding: "13px 25px",
              borderRadius: "10px",
              border: "none",
              background: "#b21f3a",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Order More Food
          </button>

        </div>

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

        {images.map(
          (image, index) => (

            <img
              key={index}
              src={image}
              alt={`Trattoria ${index + 1}`}
            />

          )
        )}

      </div>

    </main>

  );
}


/* =========================================================
   REVIEWS
========================================================= */

function Reviews() {

  return (

    <main className="page">

      <p className="small-title">
        GUEST EXPERIENCES
      </p>


      <h1>
        What Our Guests Say
      </h1>


      <div className="reviews">


        <div className="review">

          <div>
            ★★★★★
          </div>

          <p>
            "Amazing food, beautiful
            atmosphere and wonderful service."
          </p>

          <strong>
            Sarah M.
          </strong>

        </div>


        <div className="review">

          <div>
            ★★★★★
          </div>

          <p>
            "The pasta was incredible.
            Definitely one of my favorite
            restaurants."
          </p>

          <strong>
            James R.
          </strong>

        </div>


        <div className="review">

          <div>
            ★★★★★
          </div>

          <p>
            "Authentic Italian taste and a
            very relaxing atmosphere."
          </p>

          <strong>
            Olivia K.
          </strong>

        </div>


      </div>

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
            Monday – Sunday
          </p>

          <p>
            11:00 AM – 11:00 PM
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

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const [guests, setGuests] =
    useState("");


  const handleReservation = (e) => {

    e.preventDefault();


    alert(
      `Your reservation has been received! 🎉\n\nThank you ${name}!\n\nGuests: ${guests}\nDate: ${date}\nTime: ${time}\n\nWe look forward to seeing you at Trattoria!`
    );


    /*
       CLEAR FORM AFTER ALERT
    */

    setName("");
    setEmail("");
    setPhone("");
    setDate("");
    setTime("");
    setGuests("");

  };


  return (

    <main className="page reservation-page">

      <p className="small-title">
        BOOK YOUR TABLE
      </p>


      <h1>
        Make a Reservation
      </h1>


      <form
        className="reservation-form"
        onSubmit={handleReservation}
      >


        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          required
        />


        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          required
        />


        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
          required
        />


        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(
              e.target.value
            )
          }
          required
        />


        <input
          type="time"
          value={time}
          onChange={(e) =>
            setTime(
              e.target.value
            )
          }
          required
        />


        <input
          type="number"
          placeholder="Number of Guests"
          min="1"
          value={guests}
          onChange={(e) =>
            setGuests(
              e.target.value
            )
          }
          required
        />


        <button
          type="submit"
          className="primary-btn"
        >
          Confirm Reservation
        </button>

      </form>

    </main>

  );
}


/* =========================================================
   APP
========================================================= */

function App() {

  /*
     GLOBAL CART

     Menu → Cart → Checkout
     all share this same cart.
  */

  const [cart, setCart] =
    useState([]);


  const cartCount =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  return (

    <BrowserRouter>

      <Navbar
        cartCount={cartCount}
      />


      <Routes>


        {/* HOME */}

        <Route
          path="/"
          element={
            <Home />
          }
        />


        {/* ABOUT */}

        <Route
          path="/about"
          element={
            <About />
          }
        />


        {/* MENU */}

        <Route
          path="/menu"
          element={
            <Menu
              cart={cart}
              setCart={setCart}
            />
          }
        />


        {/* CHECKOUT */}

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              setCart={setCart}
            />
          }
        />


        {/* ORDER PLACED */}

        <Route
          path="/order-placed"
          element={
            <OrderPlaced />
          }
        />


        {/* GALLERY */}

        <Route
          path="/gallery"
          element={
            <Gallery />
          }
        />


        {/* REVIEWS */}

        <Route
          path="/reviews"
          element={
            <Reviews />
          }
        />


        {/* CONTACT */}

        <Route
          path="/contact"
          element={
            <Contact />
          }
        />


        {/* RESERVATION */}

        <Route
          path="/reservation"
          element={
            <Reservation />
          }
        />


      </Routes>

    </BrowserRouter>
  );
}


export default App;