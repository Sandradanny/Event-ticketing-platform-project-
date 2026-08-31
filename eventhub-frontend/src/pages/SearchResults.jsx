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

  // Get all events when page opens
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/Events?pageNumber=1&pageSize=10`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();

      // Handles common API response formats
      const eventList = Array.isArray(data)
        ? data
        : data.items || data.data || data.events || [];

      setEvents(eventList);
    } catch (error) {
      console.error(error);
      setError("Unable to load events.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (searchTerm.trim()) {
        params.append("SearchTerm", searchTerm.trim());
      }

      if (venue.trim()) {
        params.append("Venue", venue.trim());
      }

      if (eventDate) {
        params.append("EventDate", eventDate);
      }

      const response = await fetch(
        `${API_URL}/api/Events/search?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();

      const eventList = Array.isArray(data)
        ? data
        : data.items || data.data || data.events || [];

      setEvents(eventList);
    } catch (error) {
      console.error(error);
      setError("Unable to search events.");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setVenue("");
    setEventDate("");
    fetchEvents();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Discover Events</h1>

      {/* SEARCH AREA */}
      <form onSubmit={handleSearch} style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />

        <input
          type="text"
          placeholder="Enter venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          style={styles.searchInput}
        />

        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          style={styles.searchInput}
        />

        <button type="submit" style={styles.searchButton}>
          Search
        </button>

        <button
          type="button"
          onClick={clearSearch}
          style={styles.clearButton}
        >
          Clear
        </button>
      </form>

      {loading && <p style={styles.message}>Loading events...</p>}

      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && events.length === 0 && (
        <p style={styles.message}>No events found.</p>
      )}

      {/* EVENTS */}
      <div style={styles.grid}>
        {events.map((event) => (
          <div key={event.id} style={styles.card}>
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

            <div style={styles.content}>
              <h2 style={styles.title}>
                {event.title || event.name}
              </h2>

              <p style={styles.info}>
                📅 <strong>Date:</strong>{" "}
                {event.date || event.eventDate}
              </p>

              <p style={styles.info}>
                📍 <strong>Location:</strong>{" "}
                {event.location || event.venue}
              </p>

              <p style={styles.info}>
                💰 <strong>Price:</strong>{" "}
                {event.price || "Free"}
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

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#f5f7fb",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#333",
  },

  searchBox: {
    maxWidth: "1100px",
    margin: "0 auto 35px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  searchInput: {
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
    backgroundColor: "#6f7ee8",
    display: "flex"