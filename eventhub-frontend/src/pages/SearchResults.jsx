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
              <img
                src={event.image}
                alt={event.title}
                style={styles.eventImage}
              />
            </div>

            <div style={styles.content}>
              <h2 style={styles.title}>{event.title}</h2>

              <p style={styles.info}>
                📅 <strong>Date:</strong> {event.date}
              </p>

              <p style={styles.info}>
                📍 <strong>Location:</strong> {event.location}
              </p>

              <p style={styles.info}>
                💰 <strong>Price:</strong> {event.price}
              </p>

              <div style={styles.bottom}>
                <button
                  onClick={() => navigate(`/event/${event.id}`)}
                  style={styles.button}
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

image: {
  height: "180px",
  backgroundColor: "#6f7ee8",
  overflow: "hidden",
},

eventImage: {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
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
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  },

  image: {
    height: "180px",
    backgroundColor: "#99a4e0",
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
    marginBottom: "15px",
    color: "#333",
    fontSize: "20px",
  },

  info: {
    color: "#666",
    margin: "8px 0",
  },

  bottom: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  },

  button: {
    padding: "10px 16px",
    backgroundColor: "#99a9e0",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
};
