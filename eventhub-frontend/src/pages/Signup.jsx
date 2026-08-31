import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    setMessage("");

    // Check that all fields are filled
    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Check passwords
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Split full name into first name and last name
    const nameParts = name.trim().split(/\s+/);

    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    // Require both first and last name
    if (!lastName) {
      setMessage("Please enter your first and last name.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://eventmanagerapi-1.onrender.com/api/User/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: 1,
          }),
        }
      );

      // Get response from backend
      const data = await response.json();

      console.log("Registration response:", data);

      // Check if backend returned an error
      if (!response.ok) {
        throw new Error(
          data.message ||
            data.title ||
            "Registration failed. Please try again."
        );
      }

      // Registration successful
      setMessage("Account created successfully!");

      // Wait briefly, then go to login
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Registration error:", error);

      setMessage(
        error.message || "Failed to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1 style={styles.title}>
          Create Account
        </h1>

        <p style={styles.subtitle}>
          Sign up to start discovering and attending events.
        </p>

        <form onSubmit={handleSignup}>

          {/* FULL NAME */}
          <div style={styles.field}>
            <label style={styles.label}>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your first and last name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div style={styles.field}>
            <label style={styles.label}>
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
              style={styles.input}
            />
          </div>

          {/* SIGN UP BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.signupButton,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {/* MESSAGE */}
        {message && (
          <p style={styles.message}>
            {message}
          </p>
        )}

        {/* LOGIN */}
        <p style={styles.loginText}>
          Already have an account?{" "}

          <Link
            to="/login"
            style={styles.loginLink}
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f5f7fb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    background: "white",
    padding: "35px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },

  title: {
    textAlign: "center",
    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "30px",
  },

  field: {
    marginBottom: "18px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    padding: "13px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  signupButton: {
    width: "100%",
    padding: "13px",
    backgroundColor: "#e099cc",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "10px",
  },

  message: {
    textAlign: "center",
    marginTop: "15px",
    fontWeight: "500",
  },

  loginText: {
    textAlign: "center",
    marginTop: "25px",
    color: "#666",
  },

  loginLink: {
    color: "#e099cc",
    fontWeight: "bold",
    textDecoration: "none",
  },
};