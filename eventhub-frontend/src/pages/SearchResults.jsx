import { useNavigate } from "react-router-dom";
import events from "../data/events";

export default function SearchResults() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Search Results</h1>

      <div style={styles.grid}>
        {events.map((event) => (
          <div key={event.id} style={styles.card}>
            
            <div style={styles.image}>
              Event
            </div>

            <div style={styles.content}>
              <h2 style={styles.title}>{event.title}</h2>

              <p style={styles.info}>
                📅 {event.date}
              </p>

              <p style={styles.info}>
                📍 {event.location}
              </p>

              <div style={styles.bottom}>
                <span style={styles.price}>
                  {event.price}
                </span>

                <button
                  style={styles.button}
                  onClick={() => navigate(`/event/${event.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#f5f7fb",
    minHeight: "100vh",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#333",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    maxWidth: "1100px",
    margin: "0 auto",
  },

  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  image: {
    height: "180px",
    backgroundColor: "#e099cc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "22px",
    fontWeight: "bold",
  },

  content: {
    padding: "20px",
  },

  title: {
    marginTop: 0,
    marginBottom: "15px",
    color: "#333",
  },

  info: {
    color: "#666",
    margin: "8px 0",
  },

  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  },

  price: {
    fontWeight: "bold",
    color: "#333",
  },

  button: {
    backgroundColor: "#e099cc",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "12px 18px",
    cursor: "pointer",
    fontSize: "14px",
  },
};