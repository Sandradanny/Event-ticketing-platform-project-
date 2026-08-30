import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // User or Admin
  const [role, setRole] = useState("user");

  // Form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login state
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

          // Send email and password to backend
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

      // Save logged-in user
      localStorage.setItem("user", JSON.stringify(data));

      // Save selected role
      localStorage.setItem("selectedRole", role);

      setMessage("Login successful!");

      // Redirect based on selected role
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/events");
        }
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
          Welcome Back!
        </h2>

        <p style={styles.subtitle}>
          Sign in to continue
        </p>


        {/* =========================
            ROLE SELECTION
        ========================== */}

        <p style={styles.roleTitle}>
          Sign in as
        </p>

        <div style={styles.roleContainer}>

          {/* USER BUTTON */}
          <button
            type="button"
            onClick={() => {
              setRole("user");
              setMessage("");
            }}
            style={{
              ...styles.roleButton,
              ...(role === "user" ? styles.activeRole : {}),
            }}
          >
            <span style={styles.roleIcon}>👤</span>

            <span>User</span>
          </button>


          {/* ADMIN BUTTON */}
          <button
            type="button"
            onClick={() => {
              setRole("admin");
              setMessage("");
            }}
            style={{
              ...styles.roleButton,
              ...(role === "admin" ? styles.activeRole : {}),
            }}
          >
            <span style={styles.roleIcon}>🛡️</span>

            <span>Admin</span>
          </button>

        </div>


        {/* SELECTED ROLE */}
        <div style={styles.roleBox}>

          You are signing in as{" "}

          <strong>
            {role === "admin" ? "Admin" : "User"}
          </strong>

        </div>


        {/* =========================
            LOGIN FORM
        ========================== */}

        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <div style={styles.field}>

            <label style={styles.label}>
              Email Address
            </label>

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

            <label style={styles.label}>
              Password
            </label>

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

            <label style={styles.remember}>
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
            style={{
              ...styles.loginButton,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>


        {/* MESSAGE */}
        {message && (
          <p
            style={{
              ...styles.message,

              color: message.includes("successful")
                ? "green"
                : "red",
            }}
          >
            {message}
          </p>
        )}


        {/* SIGN UP - USER ONLY */}
        {role === "user" && (
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
        )}


        {/* BACK TO HOME */}
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


/* ==========================================
   STYLES
========================================== */

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

    boxShadow:
      "0 5px 20px rgba(0, 0, 0, 0.1)",
  },


  title: {
    textAlign: "center",

    marginBottom: "8px",

    fontSize: "28px",
  },


  subtitle: {
    textAlign: "center",

    color: "#666",

    marginBottom: "25px",
  },


  /* ROLE */

  roleTitle: {
    fontWeight: "600",

    marginBottom: "10px",
  },


  roleContainer: {
    display: "flex",

    gap: "12px",

    marginBottom: "15px",
  },


  roleButton: {
    flex: 1,

    padding: "15px",

    border: "1px solid #ddd",

    borderRadius: "10px",

    backgroundColor: "white",

    cursor: "pointer",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    gap: "7px",

    fontSize: "15px",

    fontWeight: "600",
  },


  activeRole: {
    border: "2px solid #5267e8",

    backgroundColor: "#f0f2ff",

    color: "#5267e8",
  },


  roleIcon: {
    fontSize: "25px",
  },


  roleBox: {
    textAlign: "center",

    backgroundColor: "#f0f2ff",

    padding: "10px",

    borderRadius: "8px",

    marginBottom: "22px",

    fontSize: "14px",

    color: "#444",
  },


  /* FORM */

  field: {
    marginBottom: "18px",
  },


  label: {
    display: "block",

    marginBottom: "7px",

    fontWeight: "500",
  },


  input: {
    width: "100%",

    padding: "12px",

    border: "1px solid #ccc",

    borderRadius: "8px",

    boxSizing: "border-box",

    fontSize: "14px",
  },


  /* OPTIONS */

  options: {
    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: "20px",

    fontSize: "14px",
  },


  remember: {
    display: "flex",

    alignItems: "center",

    gap: "4px",
  },


  forgotButton: {
    border: "none",

    background: "none",

    color: "#5267e8",

    cursor: "pointer",
  },


  /* LOGIN */

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

    fontSize: "14px",
  },


  /* SIGN UP */

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


  /* BACK */

  backButton: {
    display: "block",

    margin: "15px auto 0",

    border: "none",

    background: "none",

    color: "#666",

    cursor: "pointer",
  },

};