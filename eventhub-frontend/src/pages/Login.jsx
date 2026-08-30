import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Gets the role selected from the homepage
  const role = searchParams.get("role") || "user";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://tmanagerapi-1.onrender.com/api/User/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          // IMPORTANT:
          // Only email and password are sent.
          // We are NOT sending role.
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      console.log("Login successful:", data);

      // Save the response from the backend
      localStorage.setItem("user", JSON.stringify(data));

      // Save which login option was selected
      localStorage.setItem("selectedRole", role);

      setMessage("Login successful!");

      // Send user to events page
      setTimeout(() => {
        navigate("/events");
      }, 700);

    } catch (error) {
      console.error("Login error:", error);

      setMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        {/* TITLE */}
        <h2 style={styles.title}>
          {role === "admin" ? "Admin Login" : "User Login"}
        </h2>

        <p style={styles.subtitle}>
          {role === "admin"
            ? "Login to access your admin account"
            : "Login to continue to your account"}
        </p>

        {/* SELECTED ROLE */}
        <div style={styles.roleBox}>
          You are signing in as{" "}
          <strong>
            {role === "admin" ? "Admin" : "User"}
          </strong>
        </div>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <div style={styles.field}>

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />

          </div>

          {/* PASSWORD */}
          <div style={styles.field}>

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />

          </div>

          {/* OPTIONS */}
          <div style={styles.options}>

            <label>
              <input type="checkbox" />
              {" "}Remember me
            </label>

            <button
              type="button"
              onClick={() =>
                setMessage(
                  "Password reset is not available yet."
                )
              }
              style={styles.forgotButton}
            >
              Forgot Password?
            </button>

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={styles.loginButton}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* MESSAGE */}
        {message && (
          <p style={styles.message}>
            {message}
          </p>
        )}

        {/* SIGN UP */}
        <p style={styles.signupText}>

          Don't have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/signup")}
            style={styles.signupButton}
          >
            Sign Up
          </button>

        </p>

        {/* CHANGE LOGIN TYPE */}
        <button
          type="button"
          onClick={() => navigate("/")}
          style={styles.backButton}
        >
          ← Back to Home
        </button>

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
    maxWidth: "420px",
    backgroundColor: "white",
    padding: "35px",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
  },

  title: {
    textAlign: "center",
    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "20px",
  },

  roleBox: {
    textAlign: "center",
    backgroundColor: "#f0f2ff",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "20px",
  },

  field: {
    marginBottom: "18px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "7px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxSizing: "border-box",
  },

  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    fontSize: "14px",
  },

  forgotButton: {
    border: "none",
    background: "none",
    color: "#5267e8",
    cursor: "pointer",
  },

  loginButton: {
    width: "100%",
    padding: "13px",
    backgroundColor: "#5267e8",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },

  message: {
    textAlign: "center",
    marginTop: "15px",
  },

  signupText: {
    textAlign: "center",
    marginTop: "20px",
  },

  signupButton: {
    border: "none",
    background: "none",
    color: "#5267e8",
    cursor: "pointer",
    fontWeight: "bold",
  },

  backButton: {
    display: "block",
    margin: "15px auto 0",
    border: "none",
    background: "none",
    color: "#666",
    cursor: "pointer",
  },
};