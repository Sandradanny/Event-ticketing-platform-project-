import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get events from the backend API
  useEffect(() => {
    fetch(
      "https://eventmanagerapi-1.onrender.com/api/Events?pageNumber=1&pageSize=10"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Events from API:", data);

        // The API may return an array or a paginated object
        const eventList = Array.isArray(data)
          ? data
          : data.items || data.data || [];

        setEvents(eventList);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* HERO SECTION */}
      <div style={styles.hero}>
        <div style={styles.overlay}></div>

        <div style={styles.content}>
          <h1 style={styles.title}>
            Discover Events.
            <br />
            Create Memories.
          </h1>

          <p style={styles.subtitle}>
            Find exciting events happening around you and get your tickets
            with ease.
          </p>

          <div style={styles.loginBox}>
            <h3 style={styles.loginTitle}>Sign In to Continue</h3>

            <button
              style={styles.userButton}
              onClick={() => navigate("/login?role=user")}
            >
              Sign in as User
            </button>

            <button
              style={styles.adminButton}
              onClick={() => navigate("/login?role=admin")}
            >
              Sign in as Admin
            </button>
          </div>

          <p style={styles.registerText}>
            Don't have an account?
          </p>

          <button
            style={styles.registerButton}
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>
        </div>
      </div>

      {/* UPCOMING EVENTS SECTION */}
      <section style={styles.eventsSection}>
        <h2 style={styles.eventsTitle}>Upcoming Events</h2>

        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No upcoming events available.</p>
        ) : (
          <div style={styles.eventsGrid}>
            {events.map((event) => (
              <div key={event.id} style={styles.eventCard}>
                <h3 style={styles.eventName}>
                  {event.eventName}
                </h3>

                <p style={styles.eventDescription}>
                  {event.eventDescription}
                </p>

                <p>
                  <strong>Venue:</strong>{" "}
                  {event.eventvenue}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {event.eventDate
                    ? new Date(event.eventDate).toLocaleDateString()
                    : "Date not available"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>© 2026 Event Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  hero: {
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2000&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0, 0, 0, 0.55)",
  },

  content: {
    position: "relative",
    zIndex: 1,
    color: "white",
    textAlign: "center",
    maxWidth: "750px",
    padding: "30px",
  },

  title: {
    fontSize: "58px",
    lineHeight: "1.1",
    marginBottom: "20px",
    fontWeight: "700",
  },

  subtitle: {
    fontSize: "20px",
    lineHeight: "1.6",
    marginBottom: "30px",
    color: "#f1f1f1",
  },

  loginBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
  },

  loginTitle: {
    fontSize: "22px",
    marginBottom: "5px",
  },

  userButton: {
    width: "220px",
    padding: "13px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#e099cc",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  adminButton: {
    width: "220px",
    padding: "13px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  registerText: {
    marginBottom: "8px",
  },

  registerButton: {
    padding: "12px 28px",
    fontSize: "15px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "transparent",
    border: "1px solid white",
    borderRadius: "8px",
    cursor: "pointer",
  },

  eventsSection: {
    padding: "50px 30px",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
  },

  eventsTitle: {
    fontSize: "32px",
    marginBottom: "30px",
  },

  eventsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    maxWidth: "1100px",
    margin: "0 auto",
  },

  eventCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "left",
  },

  eventName: {
    fontSize: "20px",
    marginBottom: "10px",
  },

  eventDescription: {
    color: "#555",
    lineHeight: "1.5",
  },

  footer: {
    padding: "25px",
    backgroundColor: "#222",
    color: "white",
    textAlign: "center",
  },
};