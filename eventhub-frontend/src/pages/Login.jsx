import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    // Temporary frontend login
    alert("Login successful!");

    // Take the user back to the events page
    navigate("/events");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back Cutie🥰</h1>

        <p style={styles.subtitle}>
          Login to continue to your account
        </p>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Password */}
          <div style={styles.field}>
            <label style={styles.label}>Password</label>

            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.passwordInput}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.showButton}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember me + Forgot password */}
          <div style={styles.options}>
            <label>
              <input type="checkbox" />
              {" "}Remember me
            </label>

            <button
              type="button"
              onClick={() => alert("Password reset coming soon.")}
              style={styles.linkButton}
            >
              Forgot Password?
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            style={styles.loginButton}
          >
            Login
          </button>
        </form>

        {/* Sign up */}
        <p style={styles.signupText}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.signupLink}>
            Sign Up
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
    marginBottom: "20px",
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

  passwordContainer: {
    display: "flex",
    gap: "8px",
  },

  passwordInput: {
    flex: 1,
    padding: "13px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    minWidth: 0,
  },

  showButton: {
    padding: "0 15px",
    border: "none",
    borderRadius: "8px",
    background: "#eee",
    cursor: "pointer",
  },

  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    fontSize: "14px",
  },

  linkButton: {
    background: "none",
    border: "none",
    color: "#e099cc",
    cursor: "pointer",
    fontSize: "14px",
  },

  loginButton: {
    width: "100%",
    padding: "13px",
    backgroundColor: "#e099cc",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },

  signupText: {
    textAlign: "center",
    marginTop: "25px",
    color: "#666",
  },

  signupLink: {
    color: "#e099cc",
    fontWeight: "bold",
    textDecoration: "none",
  },
};