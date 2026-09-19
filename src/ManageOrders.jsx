import { useEffect, useState } from "react";

function ManageOrders() {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [updatingId, setUpdatingId] =
    useState("");

  async function fetchOrders() {
    try {
      setLoading(true);
      setError("");

      const response =
        await fetch(
          "https://trattoria-backend-production.up.railway.app/api/orders"
        );

      if (!response.ok) {
        throw new Error(
          "Failed to load orders"
        );
      }

      const data =
        await response.json();

      setOrders(data);
    } catch (error) {
      console.error(
        "Orders error:",
        error
      );

      setError(
        "Unable to load orders. Please make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  async function updateStatus(
    id,
    newStatus
  ) {
    try {
      setUpdatingId(id);
      setError("");

      const response =
        await fetch(
          "https://trattoria-backend-production.up.railway.app/api/orders/" +
            id,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                status:
                  newStatus,
              }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update order"
        );
      }

      setOrders(
        orders.map(function (
          order
        ) {
          if (
            order._id === id
          ) {
            return data;
          }

          return order;
        })
      );
    } catch (error) {
      console.error(
        "Update order error:",
        error
      );

      setError(
        "Unable to update order."
      );
    } finally {
      setUpdatingId("");
    }
  }

  async function deleteOrder(id) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this order?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response =
        await fetch(
          "https://trattoria-backend-production.up.railway.app/api/orders/" +
            id,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete order"
        );
      }

      setOrders(
        orders.filter(function (
          order
        ) {
          return order._id !== id;
        })
      );
    } catch (error) {
      console.error(
        "Delete order error:",
        error
      );

      setError(
        "Unable to delete order."
      );
    }
  }

  function formatDate(date) {
    if (!date) {
      return "N/A";
    }

    return new Date(
      date
    ).toLocaleString();
  }

  return (
    <main className="page manage-orders-page">
      <div className="manage-orders-header">
        <div>
          <span className="manage-eyebrow">
            TRATTORIA ADMIN
          </span>

          <h1>
            Manage Orders
          </h1>

          <p>
            View, update and manage customer
            food orders.
          </p>
        </div>

        <div className="order-count-box">
          <strong>
            {orders.length}
          </strong>

          <span>
            Total Orders
          </span>
        </div>
      </div>

      {error && (
        <div className="order-admin-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="order-loading">
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="order-empty">
          <div>
            🛵
          </div>

          <h2>
            No Orders Yet
          </h2>

          <p>
            Customer orders will appear here.
          </p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(function (
            order
          ) {
            return (
              <article
                className="admin-order-card"
                key={order._id}
              >
                <div className="admin-order-top">
                  <div>
                    <span className="order-label">
                      ORDER
                    </span>

                    <h2>
                      #
                      {order._id
                        .toString()
                        .slice(-6)
                        .toUpperCase()}
                    </h2>
                  </div>

                  <div className="order-date">
                    {formatDate(
                      order.createdAt
                    )}
                  </div>
                </div>

                <div className="admin-order-details">
                  <div>
                    <span>
                      Customer
                    </span>

                    <strong>
                      {order.customerName}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Email
                    </span>

                    <strong>
                      {order.email}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Phone
                    </span>

                    <strong>
                      {order.phone}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Address
                    </span>

                    <strong>
                      {order.address}
                    </strong>
                  </div>
                </div>

                <div className="admin-order-items">
                  <h3>
                    Ordered Items
                  </h3>

                  {order.items &&
                    order.items.map(
                      function (
                        item,
                        index
                      ) {
                        return (
                          <div
                            className="admin-order-item"
                            key={
                              item._id ||
                              index
                            }
                          >
                            <img
                              src={
                                item.image
                              }
                              alt={
                                item.name
                              }
                            />

                            <div>
                              <strong>
                                {item.name}
                              </strong>

                              <span>
                                $
                                {Number(
                                  item.price
                                ).toFixed(
                                  2
                                )}{" "}
                                ×{" "}
                                {
                                  item.quantity
                                }
                              </span>
                            </div>

                            <strong>
                              $
                              {(
                                Number(
                                  item.price
                                ) *
                                Number(
                                  item.quantity
                                )
                              ).toFixed(
                                2
                              )}
                            </strong>
                          </div>
                        );
                      }
                    )}
                </div>

                <div className="admin-order-bottom">
                  <div className="admin-order-total">
                    <span>
                      Total Payment
                    </span>

                    <strong>
                      $
                      {Number(
                        order.total
                      ).toFixed(2)}
                    </strong>
                  </div>

                  <div className="admin-order-actions">
                    <select
                      value={
                        order.status ||
                        "Pending"
                      }
                      disabled={
                        updatingId ===
                        order._id
                      }
                      onChange={function (
                        e
                      ) {
                        updateStatus(
                          order._id,
                          e.target.value
                        );
                      }}
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Preparing">
                        Preparing
                      </option>

                      <option value="Out for Delivery">
                        Out for Delivery
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>

                    <button
                      type="button"
                      className="order-delete-btn"
                      onClick={function () {
                        deleteOrder(
                          order._id
                        );
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default ManageOrders;