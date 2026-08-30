import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  <div>
  <h3>Sign In</h3>

  <button
    onClick={() => navigate("/login?role=user")}
  >
    Sign in as User
  </button>

  <button
    onClick={() => navigate("/login?role=admin")}
  >
    Sign in as Admin
  </button>
</div>

  return (
    <div style={styles.hero}>
      <div style={styles.overlay}></div>

      <div style={styles.content}>
        <h1 style={styles.title}>
          Discover Events.
          <br />
          Create Memories.
        </h1>

        <p style={styles.subtitle}>
          Find exciting events happening around you and get your tickets
          with ease.
        </p>

        <button
          style={styles.button}
          onClick={() => navigate("/events")}
        >
          Explore Events
        </button>
      </div>
    </div>
  );
}

const styles = {
  hero: {
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2000&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0, 0, 0, 0.55)",
  },

  content: {
    position: "relative",
    zIndex: 1,
    color: "white",
    textAlign: "center",
    maxWidth: "750px",
    padding: "30px",
  },

  title: {
    fontSize: "58px",
    lineHeight: "1.1",
    marginBottom: "20px",
    fontWeight: "700",
  },

  subtitle: {
    fontSize: "20px",
    lineHeight: "1.6",
    marginBottom: "35px",
    color: "#f1f1f1",
  },

  button: {
    padding: "15px 35px",
    fontSize: "17px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#e099cc",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};