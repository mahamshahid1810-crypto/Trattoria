import { useState } from "react";

const menuItems = [
  // 🍕 PIZZA
  {
    name: "Margherita Pizza",
    category: "Pizza",
    description: "Tomato, mozzarella, fresh basil and olive oil.",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Pepperoni Pizza",
    category: "Pizza",
    description: "Mozzarella, tomato sauce and spicy pepperoni.",
    price: 17,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Four Cheese Pizza",
    category: "Pizza",
    description: "Mozzarella, parmesan, gorgonzola and fontina.",
    price: 19,
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Truffle Pizza",
    category: "Pizza",
    description: "Mushrooms, mozzarella, parmesan and truffle oil.",
    price: 24,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Vegetable Pizza",
    category: "Pizza",
    description: "Peppers, mushrooms, olives and onions.",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=700&q=85",
  },

  // 🍔 BURGERS
  {
    name: "Classic Trattoria Burger",
    category: "Burgers",
    description: "Beef, cheddar, lettuce, tomato and house sauce.",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Double Cheese Burger",
    category: "Burgers",
    description: "Two beef patties, double cheddar and special sauce.",
    price: 19,
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Crispy Chicken Burger",
    category: "Burgers",
    description: "Crispy chicken, lettuce, tomato and creamy sauce.",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Mushroom Swiss Burger",
    category: "Burgers",
    description: "Beef, mushrooms, Swiss cheese and herbs.",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "BBQ Bacon Burger",
    category: "Burgers",
    description: "Beef, crispy bacon, cheddar and BBQ sauce.",
    price: 19,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=85",
  },

  // 🍝 PASTA
  {
    name: "Creamy Carbonara",
    category: "Pasta",
    description: "Spaghetti, parmesan, egg yolk and pancetta.",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Truffle Pasta",
    category: "Pasta",
    description: "Homemade pasta with creamy truffle sauce.",
    price: 21,
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Spaghetti Bolognese",
    category: "Pasta",
    description: "Spaghetti with slow-cooked beef tomato ragu.",
    price: 17,
    image:
      "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Fettuccine Alfredo",
    category: "Pasta",
    description: "Fresh fettuccine with creamy parmesan sauce.",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Lasagna",
    category: "Pasta",
    description: "Beef ragu, béchamel, pasta and mozzarella.",
    price: 19,
    image:
      "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=700&q=85",
  },

  // 🍰 SWEETS
  {
    name: "Classic Tiramisu",
    category: "Sweets",
    description: "Mascarpone, espresso, cocoa and ladyfingers.",
    price: 8,
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Chocolate Cake",
    category: "Sweets",
    description: "Rich chocolate cake with creamy frosting.",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Panna Cotta",
    category: "Sweets",
    description: "Silky vanilla cream with fresh berry sauce.",
    price: 9,
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Chocolate Fondant",
    category: "Sweets",
    description: "Warm chocolate cake with a molten chocolate center.",
    price: 11,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476a?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Strawberry Tart",
    category: "Sweets",
    description: "Fresh strawberries, cream and buttery pastry.",
    price: 9,
    image:
      "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=700&q=85",
  },

  // 🍨 ICE CREAM
  {
    name: "Vanilla Gelato",
    category: "Ice Cream",
    description: "Classic smooth Italian vanilla gelato.",
    price: 6,
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Chocolate Gelato",
    category: "Ice Cream",
    description: "Rich and creamy Italian chocolate gelato.",
    price: 6,
    image:
      "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Pistachio Gelato",
    category: "Ice Cream",
    description: "Creamy Sicilian pistachio gelato.",
    price: 7,
    image:
      "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Strawberry Gelato",
    category: "Ice Cream",
    description: "Fresh strawberry gelato made with real fruit.",
    price: 6,
    image:
      "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Hazelnut Gelato",
    category: "Ice Cream",
    description: "Roasted hazelnut gelato with a smooth finish.",
    price: 7,
    image:
      "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=85",
  },

  // 🥗 STARTERS
  {
    name: "Bruschetta",
    category: "Starters",
    description: "Toasted bread, tomatoes, basil and olive oil.",
    price: 9,
    image:
      "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Garlic Bread",
    category: "Starters",
    description: "Crispy Italian bread with garlic butter and herbs.",
    price: 7,
    image:
      "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Caprese Salad",
    category: "Starters",
    description: "Fresh mozzarella, tomatoes, basil and olive oil.",
    price: 11,
    image:
      "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Calamari Fritti",
    category: "Starters",
    description: "Crispy calamari with lemon and herbs.",
    price: 14,
    image:
      "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Arancini",
    category: "Starters",
    description: "Golden Italian rice balls filled with mozzarella.",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=85",
  },

  // 🍗 MAIN COURSE
  {
    name: "Chicken Parmesan",
    category: "Main Course",
    description: "Crispy chicken, tomato sauce and mozzarella.",
    price: 19,
    image:
      "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Grilled Chicken",
    category: "Main Course",
    description: "Juicy grilled chicken with herbs and vegetables.",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Italian Beef Steak",
    category: "Main Course",
    description: "Tender grilled steak with rosemary and potatoes.",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Herb Salmon",
    category: "Main Course",
    description: "Fresh salmon with herbs, lemon and vegetables.",
    price: 27,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Seafood Risotto",
    category: "Main Course",
    description: "Creamy risotto with fresh seafood and parmesan.",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=700&q=85",
  },

  // 🥤 DRINKS
  {
    name: "Fresh Lemonade",
    category: "Drinks",
    description: "Fresh lemon, mint and ice.",
    price: 6,
    image:
      "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f3e?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Italian Espresso",
    category: "Drinks",
    description: "Rich traditional Italian espresso.",
    price: 4,
    image:
      "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Cappuccino",
    category: "Drinks",
    description: "Espresso with steamed milk and creamy foam.",
    price: 5,
    image:
      "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Berry Smoothie",
    category: "Drinks",
    description: "Fresh mixed berries blended with creamy yogurt.",
    price: 7,
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Peach Iced Tea",
    category: "Drinks",
    description: "Refreshing peach iced tea with fresh mint.",
    price: 6,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=85",
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

function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter(
          (item) => item.category === activeCategory
        );

  const addToCart = (item) => {
    setCart((currentCart) => [...currentCart, item]);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <section className="menu" id="menu">

      {/* HEADER */}
      <div className="section-heading">
        <p className="section-label">OUR MENU</p>

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
              activeCategory === category ? "active" : ""
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FOOD CARDS */}
      <div className="menu-grid">
        {filteredItems.map((item) => (
          <article
            className="menu-card"
            key={item.name}
          >
            <div className="menu-image">
              <img
                src={item.image}
                alt={item.name}
              />

              <span className="menu-category">
                {item.category}
              </span>
            </div>

            <div className="menu-card-content">

              <div className="menu-title">
                <h3>{item.name}</h3>

                <span>
                  ${item.price}
                </span>
              </div>

              {/* RATING */}
              <div className="rating">
                ★★★★★
                <small>4.9</small>
              </div>

              <p>{item.description}</p>

              {/* ADD TO CART */}
              <button
                className="add-cart"
                onClick={() => addToCart(item)}
              >
                🛒 Add to Cart
              </button>

            </div>
          </article>
        ))}
      </div>

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