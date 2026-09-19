import { useEffect, useState } from "react";

function ManageReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://trattoria-backend-production.up.railway.app/api/reservations"
      );

      if (!response.ok) {
        throw new Error("Failed to load reservations");
      }

      const data = await response.json();

      setReservations(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    try {
      setError("");

      const response = await fetch(
        `https://trattoria-backend-production.up.railway.app/api/reservations/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete reservation"
        );
      }

      setReservations((previous) =>
        previous.filter(
          (reservation) => reservation._id !== id
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="manage-reservations-page">

      <div className="manage-reservations-header">

        <div>
          <span className="manage-eyebrow">
            TRATTORIA ADMIN
          </span>

          <h1>Reservations</h1>

          <p>
            View and manage your restaurant reservations.
          </p>
        </div>

        <div className="reservation-count">
          <strong>{reservations.length}</strong>
          <span>Reservations</span>
        </div>

      </div>

      {error && (
        <div className="reservation-admin-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="reservation-loading">
          Loading reservations...
        </div>
      ) : reservations.length === 0 ? (
        <div className="reservation-empty">
          <div>📅</div>

          <h2>No Reservations Yet</h2>

          <p>
            Customer reservations will appear here.
          </p>
        </div>
      ) : (
        <div className="reservations-table-wrapper">

          <table className="reservations-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id}>

                  <td>
                    <strong>
                      {reservation.name}
                    </strong>
                  </td>

                  <td>
                    {reservation.email}
                  </td>

                  <td>
                    {reservation.phone}
                  </td>

                  <td>
                    {reservation.date}
                  </td>

                  <td>
                    {reservation.time}
                  </td>

                  <td>
                    {reservation.guests}
                  </td>

                  <td>
                    <button
                      className="reservation-delete-btn"
                      onClick={() =>
                        handleDelete(
                          reservation._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </main>
  );
}

export default ManageReservations;
