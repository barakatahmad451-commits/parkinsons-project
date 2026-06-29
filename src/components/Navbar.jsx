import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain, Menu, X, LogOut, Sun, Moon } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

export default function Navbar({ isAuthenticated = false, setIsLoggedIn = null }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";
  const navBg = isDarkMode 
    ? "linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(20, 45, 100, 0.95) 100%)"
    : "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 249, 255, 0.95) 100%)";
  const navBorder = isDarkMode 
    ? "1px solid rgba(59, 130, 246, 0.3)" 
    : "1px solid rgba(59, 130, 246, 0.2)";

  const publicLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Technology", path: "/technology" },
    { label: "Screening", path: "/screening" },
    { label: "For Professionals", path: "/for-professionals" },
    { label: "Contact", path: "/contact" },
    { label: "Login", path: "/login" }
  ];

  const authenticatedLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "New Analysis", path: "/new-analysis" },
    { label: "My Reports", path: "/my-reports" },
    { label: "Profile", path: "/profile" },
    { label: "Admin Login", path: "/admin-login" }
  ];

  const handleLogout = () => {
    if (setIsLoggedIn) {
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  return (
    <nav style={{
      background: navBg,
      borderBottom: navBorder,
      padding: "0 clamp(15px, 5vw, 30px)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      backdropFilter: "blur(10px)",
      boxShadow: isDarkMode 
        ? "0 4px 20px rgba(0, 0, 0, 0.2)" 
        : "0 4px 20px rgba(59, 130, 246, 0.1)"
    }}>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-toggle { display: block !important; }
        }
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-toggle { display: none !important; }
        }
      `}</style>
      <div style={{ 
        maxWidth: "1400px", 
        margin: "0 auto", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        height: "clamp(60px, 10vh, 70px)",
        width: "100%"
      }}>
        {/* Logo */}
        <Link to={isAuthenticated ? "/dashboard" : "/"} style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(8px, 2vw, 12px)",
          textDecoration: "none",
          color: textPrimary,
          fontWeight: "700",
          fontSize: "clamp(18px, 5vw, 22px)",
          transition: "all 0.3s ease",
          whiteSpace: "nowrap"
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
        }}
        >
          <div style={{
            width: "clamp(35px, 8vw, 40px)",
            height: "clamp(35px, 8vw, 40px)",
            background: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)"
          }}>
            <Brain size={Math.min(24, Math.max(18, parseInt(window.innerWidth / 50)))} color="white" />
          </div>
          NeuroVox
        </Link>

        {/* Desktop Navigation */}
        <div className="desktop-nav" style={{ 
          display: "flex", 
          gap: "clamp(20px, 3vw, 35px)", 
          alignItems: "center"
        }}>
          {(isAuthenticated ? authenticatedLinks : publicLinks).map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              style={{
                color: textSecondary,
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.3s ease",
                cursor: "pointer",
                paddingBottom: "5px",
                borderBottom: "2px solid transparent"
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#3b82f6";
                e.target.style.borderBottomColor = "#3b82f6";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = textSecondary;
                e.target.style.borderBottomColor = "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
              border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
              color: textPrimary,
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              width: "40px",
              height: "40px"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
              e.target.style.transform = "scale(1)";
            }}
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#dc2626";
                e.target.style.boxShadow = "0 6px 20px rgba(239, 68, 68, 0.4)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#ef4444";
                e.target.style.boxShadow = "0 4px 15px rgba(239, 68, 68, 0.3)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-menu-toggle"
          style={{
            display: "none",
            backgroundColor: "transparent",
            border: "none",
            color: textPrimary,
            cursor: "pointer",
            padding: "8px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div style={{
          flexDirection: "column",
          gap: "15px",
          padding: "20px",
          backgroundColor: isDarkMode ? "rgba(15, 23, 42, 0.99)" : "rgba(255, 255, 255, 0.99)",
          borderTop: navBorder,
          animation: "slideDown 0.3s ease-out",
          display: "flex"
        }}>
          <style>{`
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
          
          {(isAuthenticated ? authenticatedLinks : publicLinks).map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              style={{
                color: textPrimary,
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                padding: "10px",
                borderRadius: "6px",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onClick={() => setIsOpen(false)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = isDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)";
                e.target.style.color = "#3b82f6";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = textPrimary;
              }}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Mobile Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
              border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
              color: textPrimary,
              padding: "10px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              width: "100%"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
            }}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
          
          {isAuthenticated && (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                padding: "10px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                textAlign: "left",
                marginTop: "10px"
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
