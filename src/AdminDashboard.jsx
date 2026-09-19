
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  }

  return (
    <main className="admin-dashboard-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="admin-dashboard-header">

        <div>
          <span className="admin-dashboard-eyebrow">
            TRATTORIA ADMIN
          </span>

          <h1>Admin Dashboard</h1>

          <p>
            Manage your restaurant website from one place.
          </p>
        </div>

        <button
          type="button"
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>


      {/* =================================================
          ADMIN OPTIONS
      ================================================= */}

      <section className="admin-dashboard-grid">

        {/* MANAGE MENU */}

        <Link
          to="/manage-menu"
          className="admin-dashboard-card"
        >
          <div className="admin-card-icon">
            🍝
          </div>

          <div>
            <h2>Manage Menu</h2>

            <p>
              Add, edit and delete dishes from your menu.
            </p>
          </div>

          <span className="admin-card-arrow">
            →
          </span>
        </Link>


        {/* MANAGE ORDERS */}

        <Link
          to="/manage-orders"
          className="admin-dashboard-card"
        >
          <div className="admin-card-icon">
            🛵
          </div>

          <div>
            <h2>Manage Orders</h2>

            <p>
              View customer orders and update their status.
            </p>
          </div>

          <span className="admin-card-arrow">
            →
          </span>
        </Link>


        {/* MANAGE RESERVATIONS */}

        <Link
          to="/manage-reservations"
          className="admin-dashboard-card"
        >
          <div className="admin-card-icon">
            📅
          </div>

          <div>
            <h2>Manage Reservations</h2>

            <p>
              View and manage restaurant reservations.
            </p>
          </div>

          <span className="admin-card-arrow">
            →
          </span>
        </Link>


        {/* MANAGE REVIEWS */}

        <Link
          to="/manage-reviews"
          className="admin-dashboard-card"
        >
          <div className="admin-card-icon">
            ⭐
          </div>

          <div>
            <h2>Manage Reviews</h2>

            <p>
              View, edit and delete customer reviews.
            </p>
          </div>

          <span className="admin-card-arrow">
            →
          </span>
        </Link>

      </section>


      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="admin-dashboard-footer">

        <Link to="/">
          ← Back to Trattoria Website
        </Link>

      </div>

    </main>
  );
}

export default AdminDashboard;