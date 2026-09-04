import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://eventmanagerapi-1.onrender.com";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getEvent = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const response = await fetch(
          `${API_URL}/api/Events/${Id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                  }
                : {}),
            },
          }
        );

        const responseText = await response.text();

        console.log("Event details status:", response.status);
        console.log("Event details response:", responseText);

        let data;

        try {
          data = JSON.parse(responseText);
        } catch {
          data = responseText;
        }

        if (!response.ok) {
          throw new Error(
            typeof data === "object"
              ? data.message ||
                  data.title ||
                  "Unable to load event"
              : data || "Unable to load event"
          );
        }

        setEvent(data);
      } catch (error) {
        console.error("Error loading event:", error);
        setError(
          error.message ||
            "Unable to load event. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getEvent();
    }
  }, [id]);

  // LOADING
  if (loading) {
    return (
      <div style={styles.messagePage}>
        <h2>Loading event...</h2>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div style={styles.messagePage}>
        <h1>Unable to Load Event</h1>
        <p>{error}</p>

        <button
          onClick={() => navigate("/events")}
          style={styles.backButton}
        >
          ← Back to Events
        </button>
      </div>
    );
  }

  // EVENT NOT FOUND
  if (!event) {
    return (
      <div style={styles.messagePage}>
        <h1>Event Not Found</h1>
        <p>Sorry, we couldn't find this event.</p>

        <button
          onClick={() => navigate("/events")}
          style={styles.backButton}
        >
          ← Back to Events
        </button>
      </div>
    );
  }

  const eventName =
    event.eventName ||
    event.title ||
    event.name ||
    "Event";

  const eventDate =
    event.eventDate ||
    event.date;

  const location =
    event.location ||
    event.venue ||
    event.address ||
    "Not available";

  const price =
    event.ticketPrice ??
    event.price ??
    "Free";

  const description =
    event.description ||
    event.details ||
    "No description available.";

  const image =
    event.imageUrl ||
    event.image;

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        {/* IMAGE */}
        <div style={styles.imageContainer}>
          {image ? (
            <img
              src={image}
              alt={eventName}
              style={styles.image}
            />
          ) : (
            <div style={styles.imagePlaceholder}>
              Event
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div style={styles.content}>

          <h1 style={styles.title}>
            {eventName}
          </h1>

          <p style={styles.info}>
            📅 <strong>Date:</strong>{" "}
            {eventDate
              ? new Date(eventDate).toLocaleString(
                  "en-NG",
                  {
                    dateStyle: "long",
                    timeStyle: "short",
                  }
                )
              : "Not available"}
          </p>

          <p style={styles.info}>
            📍 <strong>Location:</strong>{" "}
            {location}
          </p>

          <p style={styles.info}>
            💰 <strong>Price:</strong>{" "}
            {typeof price === "number"
              ? `₦${price.toLocaleString()}`
              : price}
          </p>

          <hr style={styles.line} />

          <h2>About this event</h2>

          <p style={styles.description}>
            {description}
          </p>

          <button
            type="button"
            onClick={() => navigate("/events")}
            style={styles.backButton}
          >
            ← Back to Events
          </button>

        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "50px 30px",
    background: "#f5f7fb",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },

  imageContainer: {
    width: "100%",
    height: "320px",
    background: "#6f7ee8",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  imagePlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "28px",
    fontWeight: "bold",
  },

  content: {
    padding: "35px",
  },

  title: {
    color: "#333",
    marginBottom: "25px",
  },

  info: {
    color: "#555",
    margin: "12px 0",
    fontSize: "16px",
  },

  line: {
    margin: "30px 0",
    border: "none",
    borderTop: "1px solid #ddd",
  },

  description: {
    color: "#555",
    lineHeight: "1.8",
    fontSize: "16px",
  },

  backButton: {
    marginTop: "25px",
    padding: "12px 24px",
    backgroundColor: "#5267e8",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
  },

  messagePage: {
    minHeight: "100vh",
    padding: "50px",
    textAlign: "center",
    background: "#f5f7fb",
    fontFamily: "Arial, sans-serif",
  },
};