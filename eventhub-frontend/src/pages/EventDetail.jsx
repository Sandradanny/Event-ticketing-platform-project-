import { useParams } from "react-router-dom";

export default function EventDetail() {
  const { id } = useParams();

  const event = events.find(
    (event) => String(event.id) === String(id)
  );

  if (!event) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          minHeight: "100vh",
          background: "#f5f7fb",
        }}
      >
        <h1>Event Not Found</h1>
        <p>Sorry, we couldn't find this event.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "50px",
        background: "#f5f7fb",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "white",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>
          {event.title}
        </h1>

        <p>
          📅 <strong>Date:</strong> {event.date}
        </p>

        <p>
          📍 <strong>Location:</strong> {event.location}
        </p>

        <p>
          💰 <strong>Price:</strong> {event.price}
        </p>

        <hr style={{ margin: "25px 0" }} />

        <h2>About this event</h2>

        <p style={{ lineHeight: "1.7" }}>
          {event.description || "More information about this event will be available soon."}
        </p>

        <button
          style={{
            marginTop: "25px",
            padding: "12px 24px",
            background: "#e099cc",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Attend Event
        </button>
      </div>
    </div>
  );
}