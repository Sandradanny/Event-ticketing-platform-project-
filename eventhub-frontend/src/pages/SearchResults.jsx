import { Link } from "react-router-dom";

export default function SearchResults() {
  const events = [
    {
      id: 1,
      title: "Northern Regional Thanksgiving",
      date: "31 August 2026",
      location: "RCCG House of Grace, Isolo, Lagos",
      price: "Free",
    },
    {
      id: 2,
      title: "Tech & Innovation Conference 2026",
      date: "12 September 2026",
      location: "Lagos, Nigeria",
      price: "₦5,000",
    },
    {
      id: 3,
      title: "Afrobeats Live Experience",
      date: "19 September 2026",
      location: "Eko Convention Centre, Lagos",
      price: "₦15,000",
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Events</h1>

      <div style={styles.grid}>
        {events.map((event) => (
          <div style={styles.card} key={event.id}>
            <div style={styles.image}>
              Event
            </div>

            <div style={styles.content}>
              <h2 style={styles.title}>{event.title}</h2>

              <p>📅 {event.date}</p>
              <p>📍 {event.location}</p>

              <div style={styles.bottom}>
                <span style={styles.price}>{event.price}</span>

                <Link
                  to={`/event/${event.id}`}
                  style={styles.button}
                >
                  View Details
                </Link>
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
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
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
    fontSize: "24px",
    fontWeight: "bold",
  },

  content: {
    padding: "20px",
  },

  title: {
    marginBottom: "15px",
    fontSize: "20px",
  },

  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  },

  price: {
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#e099cc",
    color: "white",
    textDecoration: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
  },
};