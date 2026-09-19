import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setError("");

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://trattoria-backend-production.up.railway.app/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid username or password.");
        return;
      }

      // Save login status
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("adminUsername", data.admin.username);

      // Go to dashboard
      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error);
      setError("Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">

        <span className="admin-login-eyebrow">
          TRATTORIA
        </span>

        <h1>Admin Login</h1>

        <p>
          Sign in to manage your restaurant.
        </p>

        <form onSubmit={handleLogin}>

          <div className="admin-login-field">
            <label htmlFor="admin-username">
              Username
            </label>

            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Enter username"
            />
          </div>

          <div className="admin-login-field">
            <label htmlFor="admin-password">
              Password
            </label>

            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <button
          type="button"
          className="admin-back-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Website
        </button>

      </div>
    </main>
  );
}

export default AdminLogin;