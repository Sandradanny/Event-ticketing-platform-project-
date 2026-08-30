```jsx
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

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

        {/* Login Options */}
        <div style={styles.loginBox}>
          <h3 style={styles.loginTitle}>Sign In to Continue</h3>

          <button
            style={styles.userButton}
            onClick={() => navigate("/login?role=user")}
          >
            Sign in as User
          </button>

          <button
            style={styles.adminButton}
            onClick={() => navigate("/login?role=admin")}
          >
            Sign in as Admin
          </button>
        </div>

        {/* Explore Events */}
        <button
          style={styles.button}
          onClick={() => navigate("/login?role=user")}
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
    marginBottom: "30px",
    color: "#f1f1f1",
  },

  loginBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    marginBottom: "25px",
  },

  loginTitle: {
    fontSize: "22px",
    marginBottom: "5px",
  },

  userButton: {
    width: "220px",
    padding: "13px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#e099cc",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  adminButton: {
    width: "220px",
    padding: "13px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
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
```
