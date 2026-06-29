import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDarkMode } from "../context/DarkModeContext";

export default function NotFound() {
  const { isDarkMode } = useDarkMode();

  const bgGradient = isDarkMode
    ? "linear-gradient(135deg, #0f1729 0%, rgba(20, 45, 100, 0.8) 100%)"
    : "linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)";

  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";

  return (
    <div style={{
      background: bgGradient,
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px"
    }}>
      <div style={{
        textAlign: "center",
        maxWidth: "500px"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px"
        }}>
          <AlertCircle size={120} color="#ef4444" strokeWidth={1} />
        </div>
        
        <h1 style={{
          fontSize: "72px",
          fontWeight: "900",
          color: "#ef4444",
          marginBottom: "20px",
          background: "linear-gradient(135deg, #ef4444, #f87171)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          404
        </h1>
        
        <h2 style={{
          fontSize: "32px",
          fontWeight: "700",
          color: textPrimary,
          marginBottom: "15px"
        }}>
          Page Not Found
        </h2>
        
        <p style={{
          fontSize: "18px",
          color: textSecondary,
          marginBottom: "40px",
          lineHeight: "1.6"
        }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track!
        </p>
        
        <Link to="/" style={{
          display: "inline-block",
          backgroundColor: "#3b82f6",
          color: "white",
          padding: "14px 40px",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "16px",
          fontWeight: "600",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
          cursor: "pointer"
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 8px 25px rgba(59, 130, 246, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 4px 15px rgba(59, 130, 246, 0.3)";
        }}>
          <Home size={18} style={{ display: "inline", marginRight: "8px", verticalAlign: "middle" }} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
