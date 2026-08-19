import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back</h1>

        <p style={styles.subtitle}>
          Login to continue to your account
        </p>

        <form>
          <div style={styles.field}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email Address"
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Password</label>

            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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

          <div style={styles.options}>
            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#" style={styles.link}>
              Forgot Password?
            </a>
          </div>

          <button type="submit" style={styles.loginButton}>
            Login
          </button>
        </form>

        <p style={styles.signup}>
          Don't have an account?{" "}
          <a href="#" style={styles.link}>
            Sign Up
          </a>
        </p>
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
    backgroundColor: "#f5f7fb",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.08)",
  },

  title: {
    textAlign: "center",
    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: "30px",
  },

  field: {
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxSizing: "border-box",
  },

  passwordContainer: {
    display: "flex",
    marginTop: "8px",
  },

  passwordInput: {
    flex: 1,
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px 0 0 8px",
  },

  showButton: {
    border: "1px solid #ddd",
    backgroundColor: "#f5f5f5",
    padding: "0 12px",
    borderRadius: "0 8px 8px 0",
    cursor: "pointer",
  },

  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    fontSize: "14px",
  },

  link: {
    color: "#e099cc",
    textDecoration: "none",
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

  signup: {
    textAlign: "center",
    marginTop: "25px",
    color: "#666",
  },
};