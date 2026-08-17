import React from 'react';

export default function SearchResults() {
  const events = [
    {
      title: "Northern Regional Thanksgiving",
      date: "31 August 2026",
      location: "RCCG House of Grace, Isolo,Lagos",
      price: "Free",
    },
    {
      title: "Tech & Innovation Conference 2026",
      date: "12 September 2026",
      location: "Lagos, Nigeria",
      price: "₦5,000",
    },
    {
      title: "Afrobeats Live Concert",
      date: "19 September 2026",
      location: "Eko Convention Centre, Lagos",
      price: "₦15,000",
    },
    {
      title: "Business Growth Workshop",
      date: "26 September 2026",
      location: "Victoria Island, Lagos",
      price: "₦3,500",
    },
    {
      title: "Creative Arts & Culture Festival",
      date: "3 October 2026",
      location: "Freedom Park, Lagos",
      price: "₦2,000",
    },
    {
      title: "Digital Skills Bootcamp",
      date: "10 October 2026",
      location: "Yaba, Lagos",
      price: "₦7,500",
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Upcoming Events</h1>

      <p style={styles.subheading}>
        Discover exciting events, conferences, concerts and experiences.
      </p>

      <div style={styles.grid}>
        {events.map((event, index) => (
          <div style={styles.card} key={index}>
            <div style={styles.image}>
              Event
            </div>

            <div style={styles.content}>
              <h2>{event.title}</h2>

              <p>📅 {event.date}</p>
              <p>📍 {event.location}</p>

              <div style={styles.bottom}>
                <span>{event.price}</span>
                <button>View Details</button>
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
    fontSize: "36px",
    marginBottom: "10px",
  },

  subheading: {
    textAlign: "center",
    color: "#666",
    marginBottom: "35px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
  },

  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },

  image: {
    height: "150px",
    backgroundColor: "#e0e7ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },

  content: {
    padding: "20px",
  },

  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  },
};