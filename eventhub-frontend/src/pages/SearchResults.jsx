import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://eventmanagerapi-1.onrender.com";

export default function SearchResults() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get all events
  const getEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/Events?pageNumber=1&pageSize=10`
      );

      if (!response.ok) {
        throw new Error("Unable to load events");
      }

      const data = await response.json();

      console.log("Events from API:", data);

      // Get events from the response
      if (Array.isArray(data)) {
        setEvents(data);
      } else if (data.items) {
        setEvents(data.items);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error(error);
      setError("Unable to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  // Search events
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (searchTerm.trim() !== "") {
        params.append("SearchTerm", searchTerm);
      }

      if (venue.trim() !== "") {
        params.append("Venue", venue);
      }

      if (eventDate !== "") {
        params.append("EventDate", eventDate);
      }

      const response = await fetch(
        `${API_URL}/api/Events/search?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();

      console.log("Search results:", data);

      if (Array.isArray(data)) {
        setEvents(data);
      } else if (data.items) {
        setEvents(data.items);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error(error);
      setError("Unable to search events.");
    } finally {
      setLoading(false);
    }
  };

  // Clear search
  const handleClear = () => {
    setSearchTerm("");
    setVenue("");
    setEventDate("");

    getEvents();
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.heading}>
        Search Events
      </h1>

      {/* SEARCH FORM */}
      <form
        onSubmit={handleSearch}
        style={styles.searchBox}
      >

        <input
          type="text"
          placeholder="Search event..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Enter venue..."
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          style={styles.input}
        />

        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          style={styles.input}
        />

        <button
          type="submit"
          style={styles.searchButton}
        >
          Search
        </button>

        <button
          type="button"
          onClick={handleClear}
          style={styles.clearButton}
        >
          Clear
        </button>

      </form>

      {/* LOADING */}
      {loading && (
        <p style={styles.message}>
          Loading events...
        </p>
      )}

      {/* ERROR */}
      {error && (
        <p style={styles.error}>
          {error}
        </p>
      )}

      {/* NO RESULTS */}
      {!loading && !error && events.length === 0 && (
        <p style={styles.message}>
          No events found.
        </p>
      )}

      {/* EVENT CARDS */}
      {!loading && events.length > 0 && (
        <div style={styles.grid}>

          {events.map((event) => (
            <div
              key={event.id}
              style={styles.card}
            >

              {/* IMAGE */}
              <div style={styles.image}>

                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    style={styles.eventImage}
                  />
                ) : (
                  <span>Event</span>
                )}

              </div>

              {/* CONTENT */}
              <div style={styles.content}>

                <h2 style={styles.title}>
                  {event.title}
                </h2>

                <p style={styles.info}>
                  📅 <strong>Date:</strong>{" "}
                  {event.eventDate || event.date || "Not available"}
                </p>

                <p style={styles.info}>
                  📍 <strong>Location:</strong>{" "}
                  {event.venue || event.location || "Not available"}
                </p>

                <p style={styles.info}>
                  💰 <strong>Price:</strong>{" "}
                  {event.price || "Free"}
                </p>

                <div style={styles.bottom}>

                  <button
                    onClick={() =>
                      navigate(`/event/${event.id}`)
                    }
                    style={styles.button}
                  >
                    View Details
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    backgroundColor: "#f5f7fb",
    fontFamily: "Arial, sans-serif",
  },

  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
  },

  searchBox: {
    maxWidth: "1100px",
    margin: "0 auto 35px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  input: {
    flex: "1",
    minWidth: "180px",
    padding: "13px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  searchButton: {
    padding: "13px 22px",
    backgroundColor: "#6f7ee8",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  clearButton: {
    padding: "13px 22px",
    backgroundColor: "#ddd",
    color: "#333",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  grid: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
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
    backgroundColor: "#6f7ee8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    overflow: "hidden",
  },

  eventImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
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

  message: {
    textAlign: "center",
    color: "#666",
    marginTop: "30px",
  },

  error: {
    textAlign: "center",
    color: "red",
    marginTop: "30px",
  },
};