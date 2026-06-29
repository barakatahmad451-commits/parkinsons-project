import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Brain, Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDarkMode } from "../context/DarkModeContext";
import { useNotification } from "../context/NotificationContext";

export default function AdminLogin({ setIsAdminLoggedIn }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const validateForm = () => {
    const nextErrors = { email: "", password: "" };
    let isValid = true;

    if (!email.trim()) {
      nextErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid admin email";
      isValid = false;
    }

    if (!password) {
      nextErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(nextErrors);
    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      addNotification("Please fix the admin login form", "error");
      return;
    }

    if (email.trim().toLowerCase() !== "admin@neurovox.com" || password !== "Admin@123") {
      setErrors({ email: "Invalid admin credentials", password: "Invalid admin credentials" });
      addNotification("Invalid admin credentials", "error");
      return;
    }

    setIsLoading(true);
    addNotification("Signing in to admin panel", "info");

    setTimeout(() => {
      setIsLoading(false);
      setIsAdminLoggedIn(true);
      addNotification("Admin login successful", "success");
      navigate("/admin/dashboard");
    }, 1200);
  };

  const bgGradient = isDarkMode
    ? "linear-gradient(135deg, #0f1729 0%, rgba(20, 45, 100, 0.8) 100%)"
    : "linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)";

  const cardBg = isDarkMode
    ? "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(20, 45, 100, 0.9) 100%)"
    : "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(230, 240, 250, 0.95) 100%)";

  const cardBorder = isDarkMode
    ? "1px solid rgba(59, 130, 246, 0.3)"
    : "1px solid rgba(59, 130, 246, 0.2)";

  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";

  return (
    <div style={{ minHeight: "100vh", background: bgGradient }}>
      <Navbar isAuthenticated={false} />
      <div style={{ maxWidth: "520px", margin: "0 auto", padding: "clamp(24px, 5vw, 48px) 16px 48px" }}>
        <div style={{ background: cardBg, border: cardBorder, borderRadius: "24px", padding: "32px", boxShadow: "0 20px 60px rgba(59, 130, 246, 0.12)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "linear-gradient(135deg, #3b82f6, #0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Brain size={24} color="white" />
            </div>
            <div>
              <h2 style={{ margin: 0, color: textPrimary, fontSize: "26px" }}>Admin Login</h2>
              <p style={{ margin: "4px 0 0", color: textSecondary }}>Access the admin control center</p>
            </div>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", color: textPrimary, fontWeight: 600, marginBottom: "8px" }}>Admin Email</label>
              <div style={{ display: "flex", alignItems: "center", background: "rgba(59, 130, 246, 0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "12px", padding: "0 12px" }}>
                <Mail size={18} color="#3b82f6" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@neurovox.com"
                  style={{ width: "100%", border: "none", outline: "none", background: "transparent", padding: "12px", color: textPrimary }}
                />
              </div>
              {errors.email ? <p style={{ color: "#ef4444", margin: "6px 0 0", fontSize: "13px" }}>{errors.email}</p> : null}
            </div>

            <div>
              <label style={{ display: "block", color: textPrimary, fontWeight: 600, marginBottom: "8px" }}>Password</label>
              <div style={{ display: "flex", alignItems: "center", background: "rgba(59, 130, 246, 0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "12px", padding: "0 12px" }}>
                <Lock size={18} color="#3b82f6" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  style={{ width: "100%", border: "none", outline: "none", background: "transparent", padding: "12px", color: textPrimary }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: "transparent", border: "none", cursor: "pointer", color: textSecondary }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password ? <p style={{ color: "#ef4444", margin: "6px 0 0", fontSize: "13px" }}>{errors.password}</p> : null}
            </div>

            <button type="submit" disabled={isLoading} style={{ padding: "12px 16px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #3b82f6, #0ea5e9)", color: "white", fontWeight: 700, cursor: "pointer" }}>
              {isLoading ? "Signing in..." : "Sign in as Admin"}
            </button>
          </form>

          <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "6px", color: textSecondary, fontSize: "14px" }}>
            <AlertCircle size={16} />
            <span>Use admin credentials to manage content and users.</span>
          </div>

          <div style={{ marginTop: "16px" }}>
            <Link to="/login" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 600 }}>Go to user login</Link>
          </div>
        </div>
      </div>
      <Footer isAuthenticated={false} />
    </div>
  );
}
