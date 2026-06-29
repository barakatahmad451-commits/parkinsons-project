import { Link } from "react-router-dom";
import { Brain, Menu, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDarkMode } from "../context/DarkModeContext";

export default function Home() {
  const { isDarkMode } = useDarkMode();

  const bgGradient = isDarkMode
    ? "linear-gradient(135deg, #0f1729 0%, rgba(20, 45, 100, 0.8) 100%)"
    : "linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)";

  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";

  return (
    <div style={{ background: bgGradient, minHeight: "100vh" }}>
      <Navbar />
      
      <style>{`
        @media (max-width: 768px) {
          .home-container { padding: 40px 20px !important; }
          .hero-section { padding-top: 40px !important; padding-bottom: 60px !important; }
          .hero-title { font-size: 32px !important; }
          .hero-description { font-size: 16px !important; }
          .hero-button { font-size: 14px !important; padding: 10px 24px !important; }
          .brain-icon { width: 60px !important; height: 60px !important; }
        }
        @media (max-width: 480px) {
          .home-container { padding: 30px 15px !important; }
          .hero-section { padding-top: 30px !important; padding-bottom: 50px !important; }
          .hero-title { font-size: 28px !important; }
          .hero-description { font-size: 14px !important; }
          .hero-button { font-size: 13px !important; padding: 8px 20px !important; }
          .brain-icon { width: 50px !important; height: 50px !important; }
          .features-grid { gap: 20px !important; }
          .feature-card { padding: 20px !important; }
          .feature-title { font-size: 16px !important; }
          .feature-desc { font-size: 13px !important; }
        }
      `}</style>
      
      <div className="home-container" style={{ padding: "clamp(30px, 5vw, 60px) clamp(15px, 5vw, 40px)", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Hero Section */}
        <div className="hero-section" style={{ textAlign: "center", paddingTop: "clamp(30px, 10vw, 60px)", paddingBottom: "clamp(40px, 10vw, 80px)" }}>
          <div className="brain-icon" style={{ display: "flex", justifyContent: "center", marginBottom: "clamp(20px, 5vw, 30px)", width: "80px", height: "80px", margin: "0 auto clamp(20px, 5vw, 30px)" }}>
            <Brain size="clamp(50, 15vw, 80)" color="#3b82f6" />
          </div>
          <h1 className="hero-title" style={{ 
            fontSize: "clamp(28px, 8vw, 48px)", 
            fontWeight: "bold", 
            color: textPrimary,
            marginBottom: "20px",
            lineHeight: "1.2"
          }}>
            NeuroVox
          </h1>
          <p className="hero-description" style={{ 
            fontSize: "clamp(14px, 4vw, 20px)", 
            color: textSecondary, 
            marginBottom: "40px",
            maxWidth: "600px",
            margin: "0 auto 40px",
            lineHeight: "1.5"
          }}>
            Advanced Voice Analysis Technology for Neurological Health Screening
          </p>
          <Link className="hero-button" to="/screening" style={{
            display: "inline-block",
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "clamp(8px, 2vw, 12px) clamp(20px, 5vw, 40px)",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "clamp(13px, 3vw, 16px)",
            fontWeight: "600",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}>
            Start Screening
          </Link>
        </div>

        {/* Features Grid */}
        <div className="features-grid" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(clamp(250px, 100%, 280px), 1fr))", 
          gap: "clamp(20px, 3vw, 30px)",
          marginTop: "clamp(40px, 10vw, 60px)"
        }}>
          {[
            { title: "Accurate", desc: "AI-powered analysis for precise results" },
            { title: "Fast", desc: "Get insights in seconds" },
            { title: "Secure", desc: "Your data is encrypted and private" }
          ].map((feature, i) => (
            <div key={i} className="feature-card" style={{
              backgroundColor: isDarkMode ? "rgba(30, 58, 138, 0.5)" : "rgba(255, 255, 255, 0.8)",
              border: isDarkMode ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(59, 130, 246, 0.2)",
              padding: "clamp(20px, 5vw, 30px)",
              borderRadius: "12px",
              textAlign: "center",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(59, 130, 246, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}>
              <h3 className="feature-title" style={{ color: "#3b82f6", marginBottom: "10px", fontSize: "clamp(16px, 3vw, 18px)", fontWeight: "600" }}>
                {feature.title}
              </h3>
              <p className="feature-desc" style={{ color: textSecondary, fontSize: "clamp(13px, 2vw, 14px)", lineHeight: "1.5" }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer isAuthenticated={false} />
    </div>
  );
}
