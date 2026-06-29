import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Brain, Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDarkMode } from "../context/DarkModeContext";
import { useNotification } from "../context/NotificationContext";

export default function Signup({ setIsLoggedIn }) {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    user: "",
    pass: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    pass: "",
    confirm: "",
    agree: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {
      name: "",
      email: "",
      pass: "",
      confirm: "",
      agree: "",
    };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!formData.pass) {
      newErrors.pass = "Password is required";
      isValid = false;
    } else if (formData.pass.length < 6) {
      newErrors.pass = "Password must be at least 6 characters";
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.pass)) {
      newErrors.pass = "Password must contain uppercase, lowercase, and numbers";
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirm) {
      newErrors.confirm = "Please confirm your password";
      isValid = false;
    } else if (formData.confirm !== formData.pass) {
      newErrors.confirm = "Passwords do not match";
      isValid = false;
    }

    // Terms agreement validation
    if (!agreed) {
      newErrors.agree = "You must agree to the terms";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      addNotification("Please fix the errors in the form", "error");
      return;
    }

    setIsLoading(true);
    addNotification("Creating your account...", "info");
    
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      addNotification("Account created successfully! Welcome to NeuroVoice", "success");
      navigate("/dashboard");
    }, 1500);
  };

  const bgGradient = isDarkMode
    ? "linear-gradient(135deg, #0f1729 0%, rgba(20, 45, 100, 0.8) 100%)"
    : "linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)";

  const cardBg = isDarkMode
    ? "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(20, 45, 100, 0.9) 100%)"
    : "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(230, 240, 250, 0.95) 100%)";

  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";
  const inputBg = isDarkMode
    ? "rgba(30, 58, 138, 0.5)"
    : "rgba(59, 130, 246, 0.1)";
  const inputBorder = isDarkMode
    ? "rgba(59, 130, 246, 0.4)"
    : "rgba(59, 130, 246, 0.3)";
  const inputText = isDarkMode ? "white" : "#0f1729";

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: bgGradient,
        overflow: "auto",
        position: "relative",
      }}
    >
      <Navbar isAuthenticated={false} />

      <style>{`
        @keyframes soft-glow { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes float-slow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes brain-expand { 0% { transform: scale(1); filter: brightness(1); } 100% { transform: scale(1.3); filter: brightness(1.4) drop-shadow(0 0 30px rgba(59, 130, 246, 1)) drop-shadow(0 0 60px rgba(6, 182, 212, 0.8)); } }
        @keyframes glow-expand { 0% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), inset 0 0 20px rgba(59, 130, 246, 0.2); } 100% { box-shadow: 0 0 80px rgba(59, 130, 246, 1), inset 0 0 50px rgba(6, 182, 212, 0.8); } }
        .soft-glow { animation: soft-glow 5s ease-in-out infinite; will-change: opacity; }
        .float-slow { animation: float-slow 6s ease-in-out infinite; will-change: transform; }
        .logo-glow { opacity: 0.3; transition: all 0.3s ease; background: linear-gradient(135deg, #3b82f6, #0ea5e9) !important; }
        .logo-glow:hover { opacity: 1; background: transparent !important; animation: glow-expand 0.6s ease-out forwards; }
        .logo-glow:hover svg { animation: brain-expand 0.6s ease-out forwards; }
        @media (max-width: 768px) {
          .signup-container { padding: 30px 15px !important; }
          .signup-card { border-radius: 18px !important; }
          .signup-form { padding: 35px 20px !important; }
        }
      `}</style>

      {/* Background Orbs */}
      <div
        className="soft-glow"
        style={{
          position: "fixed",
          width: "clamp(200px, 80vw, 600px)",
          height: "clamp(200px, 80vw, 600px)",
          background: isDarkMode
            ? "radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent)"
            : "radial-gradient(circle, rgba(59, 130, 246, 0.08), transparent)",
          borderRadius: "50%",
          top: "-20%",
          left: "-10%",
          filter: "blur(80px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        className="soft-glow"
        style={{
          position: "fixed",
          width: "clamp(150px, 60vw, 500px)",
          height: "clamp(150px, 60vw, 500px)",
          background: isDarkMode
            ? "radial-gradient(circle, rgba(6, 182, 212, 0.08), transparent)"
            : "radial-gradient(circle, rgba(6, 182, 212, 0.06), transparent)",
          borderRadius: "50%",
          bottom: "-15%",
          right: "-5%",
          filter: "blur(80px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Decorative Elements */}
      <div
        className="float-slow"
        style={{
          position: "fixed",
          width: "clamp(100px, 50vw, 300px)",
          height: "clamp(100px, 50vw, 300px)",
          background: isDarkMode
            ? "radial-gradient(circle, rgba(16, 185, 129, 0.05), transparent)"
            : "radial-gradient(circle, rgba(16, 185, 129, 0.04), transparent)",
          borderRadius: "50%",
          top: "50%",
          right: "5%",
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Static Particles */}
      {[...Array(40)].map((_, i) => (
        <div
          key={`particle-${i}`}
          style={{
            position: "fixed",
            width: "2px",
            height: "2px",
            background:
              i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#0ea5e9" : "#10b981",
            borderRadius: "50%",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: isDarkMode
              ? 0.3 + Math.random() * 0.3
              : 0.2 + Math.random() * 0.2,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Main Container */}
      <div className="signup-container"
        style={{
          position: "relative",
          zIndex: 30,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(20px, 5vw, 40px)",
        }}
      >
        <div className="signup-card signup-form"
          style={{
            width: "100%",
            maxWidth: "520px",
            background: cardBg,
            border: isDarkMode
              ? "1px solid rgba(59, 130, 246, 0.3)"
              : "1px solid rgba(59, 130, 246, 0.2)",
            borderRadius: "clamp(18px, 5vw, 28px)",
            padding: "clamp(30px, 5vw, 50px)",
            backdropFilter: "blur(20px)",
            boxShadow: isDarkMode
              ? "0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(148, 163, 255, 0.1)"
              : "0 20px 60px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(148, 163, 255, 0.2)",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "40px", textAlign: "center" }}>
            <div
              className="logo-glow"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "70px",
                height: "70px",
                background: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
                borderRadius: "18px",
                marginBottom: "20px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 12px 30px rgba(59, 130, 246, 0.3)",
              }}
            >
              <Brain size={36} color="white" strokeWidth={1.5} />
            </div>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: textPrimary,
                margin: "0 0 8px 0",
              }}
            >
              Create Account
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: textSecondary,
                margin: "0",
                fontWeight: "500",
              }}
            >
              Join our medical platform
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#3b82f6",
                  display: "block",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Full Name
              </label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <User
                  size={18}
                  color="#60a5fa"
                  style={{
                    position: "absolute",
                    left: "12px",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="text"
                  placeholder="Dr. John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 40px",
                    fontSize: "14px",
                    background: inputBg,
                    border: `1px solid ${inputBorder}`,
                    borderRadius: "12px",
                    color: inputText,
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "all 0.3s ease",
                    fontWeight: "500",
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = inputBorder;
                    e.target.style.background = inputBg;
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              {errors.name && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "6px",
                  color: "#ef4444",
                  fontSize: "12px",
                  fontWeight: "500",
                }}>
                  <AlertCircle size={14} />
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#3b82f6",
                  display: "block",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Email Address
              </label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Mail
                  size={18}
                  color="#60a5fa"
                  style={{
                    position: "absolute",
                    left: "12px",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="email"
                  placeholder="doctor@hospital.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 40px",
                    fontSize: "14px",
                    background: inputBg,
                    border: `1px solid ${inputBorder}`,
                    borderRadius: "12px",
                    color: inputText,
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "all 0.3s ease",
                    fontWeight: "500",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(59, 130, 246, 0.8)";
                    e.target.style.background = isDarkMode
                      ? "rgba(30, 58, 138, 0.7)"
                      : "rgba(59, 130, 246, 0.15)";
                    e.target.style.boxShadow =
                      "0 0 12px rgba(59, 130, 246, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = inputBorder;
                    e.target.style.background = inputBg;
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              {errors.email && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "6px",
                  color: "#ef4444",
                  fontSize: "12px",
                  fontWeight: "500",
                }}>
                  <AlertCircle size={14} />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Username */}
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#3b82f6",
                  display: "block",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Username
              </label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <User
                  size={18}
                  color="#60a5fa"
                  style={{
                    position: "absolute",
                    left: "12px",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="text"
                  placeholder="username"
                  value={formData.user}
                  onChange={(e) =>
                    setFormData({ ...formData, user: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 40px",
                    fontSize: "14px",
                    background: inputBg,
                    border: `1px solid ${inputBorder}`,
                    borderRadius: "12px",
                    color: inputText,
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "all 0.3s ease",
                    fontWeight: "500",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(59, 130, 246, 0.8)";
                    e.target.style.background = isDarkMode
                      ? "rgba(30, 58, 138, 0.7)"
                      : "rgba(59, 130, 246, 0.15)";
                    e.target.style.boxShadow =
                      "0 0 12px rgba(59, 130, 246, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = inputBorder;
                    e.target.style.background = inputBg;
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#3b82f6",
                  display: "block",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Password
              </label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Lock
                  size={18}
                  color="#60a5fa"
                  style={{
                    position: "absolute",
                    left: "12px",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={formData.pass}
                  onChange={(e) =>
                    setFormData({ ...formData, pass: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 40px",
                    fontSize: "14px",
                    background: inputBg,
                    border: `1px solid ${inputBorder}`,
                    borderRadius: "12px",
                    color: inputText,
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "all 0.3s ease",
                    fontWeight: "500",
                    letterSpacing: "2px",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(59, 130, 246, 0.8)";
                    e.target.style.background = isDarkMode
                      ? "rgba(30, 58, 138, 0.7)"
                      : "rgba(59, 130, 246, 0.15)";
                    e.target.style.boxShadow =
                      "0 0 12px rgba(59, 130, 246, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = inputBorder;
                    e.target.style.background = inputBg;
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#60a5fa",
                    transition: "color 0.2s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#3b82f6")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#60a5fa")}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.pass && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "6px",
                  color: "#ef4444",
                  fontSize: "12px",
                  fontWeight: "500",
                }}>
                  <AlertCircle size={14} />
                  {errors.pass}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#3b82f6",
                  display: "block",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Confirm Password
              </label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Lock
                  size={18}
                  color="#60a5fa"
                  style={{
                    position: "absolute",
                    left: "12px",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••••"
                  value={formData.confirm}
                  onChange={(e) =>
                    setFormData({ ...formData, confirm: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 40px",
                    fontSize: "14px",
                    background: inputBg,
                    border: `1px solid ${inputBorder}`,
                    borderRadius: "12px",
                    color: inputText,
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "all 0.3s ease",
                    fontWeight: "500",
                    letterSpacing: "2px",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(59, 130, 246, 0.8)";
                    e.target.style.background = isDarkMode
                      ? "rgba(30, 58, 138, 0.7)"
                      : "rgba(59, 130, 246, 0.15)";
                    e.target.style.boxShadow =
                      "0 0 12px rgba(59, 130, 246, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = inputBorder;
                    e.target.style.background = inputBg;
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#60a5fa",
                    transition: "color 0.2s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#3b82f6")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#60a5fa")}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirm && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "6px",
                  color: "#ef4444",
                  fontSize: "12px",
                  fontWeight: "500",
                }}>
                  <AlertCircle size={14} />
                  {errors.confirm}
                </div>
              )}
            </div>

            {/* Terms Checkbox */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: "28px",
                gap: "10px",
              }}
            >
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  accentColor: "#3b82f6",
                  marginTop: "2px",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    fontSize: "13px",
                    color: textSecondary,
                    cursor: "pointer",
                    margin: "0 0 6px 0",
                    fontWeight: "500",
                    display: "block",
                  }}
                >
                  I agree to Terms & Conditions
                </label>
                {errors.agree && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#ef4444",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}>
                    <AlertCircle size={14} />
                    {errors.agree}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !agreed}
              style={{
                width: "100%",
                padding: "13px 20px",
                fontSize: "15px",
                fontWeight: "700",
                background:
                  isLoading || !agreed
                    ? "linear-gradient(135deg, #94a3b8, #64748b)"
                    : "linear-gradient(135deg, #3b82f6, #0ea5e9)",
                border: "none",
                borderRadius: "12px",
                color: "white",
                cursor: isLoading || !agreed ? "not-allowed" : "pointer",
                boxShadow: "0 6px 20px rgba(59, 130, 246, 0.35)",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                letterSpacing: "1px",
                opacity: isLoading || !agreed ? 0.8 : 1,
              }}
              onMouseOver={(e) => {
                if (!isLoading && agreed) {
                  e.target.style.boxShadow =
                    "0 8px 28px rgba(59, 130, 246, 0.45)";
                  e.target.style.transform = "translateY(-2px)";
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading && agreed) {
                  e.target.style.boxShadow =
                    "0 6px 20px rgba(59, 130, 246, 0.35)";
                  e.target.style.transform = "translateY(0)";
                }
              }}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <div style={{ marginTop: "28px", textAlign: "center" }}>
            <p
              style={{
                fontSize: "13px",
                color: textSecondary,
                margin: "0",
                fontWeight: "500",
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#3b82f6",
                  textDecoration: "none",
                  fontWeight: "700",
                  transition: "color 0.2s ease",
                }}
                onMouseOver={(e) => (e.target.style.color = "#0ea5e9")}
                onMouseOut={(e) => (e.target.style.color = "#3b82f6")}
              >
                Sign In
              </Link>
            </p>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "8px 16px",
              background: isDarkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.05)",
              border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"}`,
              borderRadius: "8px",
              color: textSecondary,
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = isDarkMode
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(0, 0, 0, 0.1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = isDarkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.05)";
            }}
          >
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>
      <Footer isAuthenticated={false} />
    </div>
  );
}
