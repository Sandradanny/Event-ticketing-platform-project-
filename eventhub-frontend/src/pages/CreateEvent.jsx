import { useState } from "react";
import { apiFetch } from "../api";

export default function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventvenue, setEventvenue] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const data = await apiFetch("/Event", {
        method: "POST",
        body: JSON.stringify({
          eventName: eventName,
          eventDescription: eventDescription,
          eventvenue: eventvenue,
          eventDate: eventDate,
        }),
      });

      console.log("Event created:", data);

      setMessage("Event created successfully! 🎉");

      setEventName("");
      setEventDescription("");
      setEventvenue("");
      setEventDate("");
    } catch (error) {
      console.error("CREATE EVENT ERROR:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Event</h2>

        <form onSubmit={handleSubmit}>
          <label>Event Name</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter event name"
            required
          />

          <label>Description</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder="Enter event description"
            required
          />

          <label>Venue</label>
          <input
            type="text"
            value={eventvenue}
            onChange={(e) => setEventvenue(e.target.value)}
            placeholder="Enter event venue"
            required
          />

          <label>Date</label>
          <input
            type="datetime-local"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7ff",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },
};