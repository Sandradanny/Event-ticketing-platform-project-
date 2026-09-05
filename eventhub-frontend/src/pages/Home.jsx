import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events from backend
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

        const eventList = Array.isArray(data)
          ? data
          : data.items || data.data || [];

        setEvents(eventList);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setError("Unable to load events.");
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.page}>
      {/* ================= HERO SECTION ================= */}
      <section style={styles.hero}>
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
      </section>

      {/* ================= EVENTS SECTION ================= */}
      <section style={styles.eventsSection}>
        <h2 style={styles.eventsTitle}>Upcoming Events</h2>

        {loading && (
          <p style={styles.message}>Loading events...</p>
        )}

        {error && (
          <p style={styles.error}>{error}</p>
        )}

        {!loading && !error && events.length === 0 && (
          <p style={styles.message}>
            No upcoming events available.
          </p>
        )}

        {!loading && !error && events.length > 0 && (
          <div style={styles.eventsGrid}>
            {events.map((event, index) => (
              <div
                key={event.id || event.eventId || index}
                style={styles.eventCard}
              >
                <h3 style={styles.eventName}>
                  {event.eventName || "Event"}
                </h3>

                <p style={styles.eventDescription}>
                  {event.eventDescription ||
                    "No description available."}
                </p>

                <p style={styles.eventInfo}>
                  <strong>Venue:</strong>{" "}
                  {event.eventvenue || "Venue not available"}
                </p>

                <p style={styles.eventInfo}>
                  <strong>Date:</strong>{" "}
                  {event.eventDate
                    ? new Date(
                        event.eventDate
                      ).toLocaleDateString()
                    : "Date not available"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= FOOTER ================= */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <h3 style={styles.footerTitle}>
            Event Manager
          </h3>

          <p style={styles.footerText}>
            Discover exciting events and create unforgettable
            memories.
          </p>

          <p style={styles.copyright}>
            © 2026 Event Manager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },

  /* HERO */
  hero: {
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2000&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

  /* EVENTS */
  eventsSection: {
    padding: "60px 30px",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
    minHeight: "400px",
  },

  eventsTitle: {
    fontSize: "34px",
    marginBottom: "35px",
    color: "#222",
  },

  eventsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px",
    maxWidth: "1100px",
    margin: "0 auto",
  },

  eventCard: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 3px 12px rgba(0, 0, 0, 0.12)",
    textAlign: "left",
  },

  eventName: {
    fontSize: "21px",
    marginBottom: "12px",
    color: "#222",
  },

  eventDescription: {
    color: "#555",
    lineHeight: "1.5",
    marginBottom: "15px",
  },

  eventInfo: {
    color: "#444",
    marginBottom: "8px",
  },

  message: {
    fontSize: "18px",
    color: "#555",
  },

  error: {
    fontSize: "18px",
    color: "red",
  },

  /* FOOTER */
  footer: {
    backgroundColor: "#222",
    color: "white",
    padding: "40px 20px",
    textAlign: "center",
  },

  footerContent: {
    maxWidth: "900px",
    margin: "0 auto",
  },

  footerTitle: {
    fontSize: "24px",
    marginBottom: "10px",
  },

  footerText: {
    color: "#ddd",
    marginBottom: "20px",
  },

  copyright: {
    color: "#aaa",
    fontSize: "14px",
  },
};