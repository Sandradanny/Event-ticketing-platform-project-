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

  // ===============================
  // GET ALL EVENTS
  // ===============================
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

      if (Array.isArray(data)) {
        setEvents(data);
      } else if (data.items) {
        setEvents(data.items);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Error loading events:", error);
      setError("Unable to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load events when page opens
  useEffect(() => {
    getEvents();
  }, []);

  // ===============================
  // SEARCH EVENTS
  // ===============================
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (searchTerm.trim() !== "") {
        params.append("SearchTerm", searchTerm.trim());
      }

      if (venue.trim() !== "") {
        params.append("Venue", venue.trim());
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
      console.error("Search error:", error);
      setError("Unable to search events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // CLEAR SEARCH
  // ===============================
  const handleClear = () => {
    setSearchTerm("");
    setVenue("");
    setEventDate("");

    getEvents();
  };

  return (
    <div style={styles.container}>

      {/* =====================================
          ALL EVENTS SECTION
      ===================================== */}

      <div style={styles.headerSection}>
        <h1 style={styles.heading}>
          Discover Events
        </h1>

        <p style={styles.subheading}>
          Explore exciting events and find something you would love to attend.
        </p>
      </div>

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

      {/* EVENTS */}
      {!loading && !error && events.length > 0 && (
        <div style={styles.grid}>

          {events.map((event) => (
            <div
              key={event.Id}
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
                  {event.eventDate ||
                    event.date ||
                    "Not available"}
                </p>

                <p style={styles.info}>
                  📍 <strong>Location:</strong>{" "}
                  {event.venue ||
                    event.location ||
                    "Not available"}
                </p>

                <p style={styles.info}>
                  💰 <strong>Price:</strong>{" "}
                  {event.price || "Free"}
                </p>

                <button
                  onClick={() =>
                    navigate(`/event/${event.Id}`)
                  }
                  style={styles.button}
                >
                  View Details
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

      {/* NO EVENTS */}
      {!loading && !error && events.length === 0 && (
        <p style={styles.message}>
          No events found.
        </p>
      )}

      {/* =====================================
          SEARCH EVENTS SECTION
      ===================================== */}

      <div style={styles.searchSection}>

        <h2 style={styles.searchHeading}>
          Search Events
        </h2>

        <p style={styles.searchSubtitle}>
          Looking for something specific? Search by event,
          venue or date.
        </p>

        <form
          onSubmit={handleSearch}
          style={styles.searchBox}
        >

          {/* EVENT SEARCH */}
          <input
            type="text"
            placeholder="Search event..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            style={styles.input}
          />

          {/* VENUE */}
          <input
            type="text"
            placeholder="Enter venue..."
            value={venue}
            onChange={(e) =>
              setVenue(e.target.value)
            }
            style={styles.input}
          />

          {/* DATE */}
          <input
            type="date"
            value={eventDate}
            onChange={(e) =>
              setEventDate(e.target.value)
            }
            style={styles.input}
          />

          {/* SEARCH */}
          <button
            type="submit"
            style={styles.searchButton}
          >
            Search
          </button>

          {/* CLEAR */}
          <button
            type="button"
            onClick={handleClear}
            style={styles.clearButton}
          >
            Clear
          </button>

        </form>

      </div>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "50px 30px",
    backgroundColor: "#f5f7fb",
    fontFamily: "Arial, sans-serif",
  },

  headerSection: {
    textAlign: "center",
    marginBottom: "35px",
  },

  heading: {
    color: "#333",
    marginBottom: "10px",
    fontSize: "36px",
  },

  subheading: {
    color: "#666",
    fontSize: "17px",
    margin: 0,
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
    height: "190px",
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
    margin: "9px 0",
  },

  button: {
    width: "100%",
    marginTop: "18px",
    padding: "11px 16px",
    backgroundColor: "#99a9e0",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },

  searchSection: {
    maxWidth: "1100px",
    margin: "60px auto 0",
    paddingTop: "45px",
    borderTop: "1px solid #ddd",
  },

  searchHeading: {
    textAlign: "center",
    color: "#333",
    fontSize: "28px",
    marginBottom: "8px",
  },

  searchSubtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "25px",
  },

  searchBox: {
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