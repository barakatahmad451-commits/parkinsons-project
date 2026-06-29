import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDarkMode } from "../context/DarkModeContext";

export default function ForProfessionals() {
  const { isDarkMode } = useDarkMode();

  const bgGradient = isDarkMode
    ? "linear-gradient(135deg, #0f1729 0%, rgba(20, 45, 100, 0.8) 100%)"
    : "linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)";

  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";

  const features = [
    {
      title: "Patient Management",
      description: "Comprehensive tools for managing multiple patient records"
    },
    {
      title: "Advanced Analytics",
      description: "Detailed analysis reports for clinical decision-making"
    },
    {
      title: "Data Export",
      description: "Export patient data in multiple formats"
    },
    {
      title: "API Access",
      description: "Integrate NeuroVox into your existing systems"
    }
  ];

  return (
    <div style={{ background: bgGradient, minHeight: "100vh" }}>
      <Navbar />
      <style>{`
        @media (max-width: 768px) {
          .prof-container { padding: 40px 20px !important; }
          .prof-title { font-size: 28px !important; }
        }
      `}</style>
      
      <div className="prof-container" style={{ padding: "clamp(30px, 5vw, 60px) clamp(16px, 3vw, 40px)", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 className="prof-title" style={{ fontSize: "clamp(28px, 6vw, 36px)", fontWeight: "bold", color: textPrimary, marginBottom: "clamp(30px, 5vw, 50px)", textAlign: "center" }}>
          For Healthcare Professionals
        </h1>
        
        <p style={{ fontSize: "18px", color: textSecondary, marginBottom: "50px" }}>
          Empower your clinical practice with NeuroVox's professional tools
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px", marginBottom: "50px" }}>
          {features.map((feature, i) => (
            <div key={i} style={{
              backgroundColor: isDarkMode ? "rgba(30, 58, 138, 0.5)" : "rgba(255, 255, 255, 0.8)",
              border: isDarkMode ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(59, 130, 246, 0.2)",
              padding: "30px",
              borderRadius: "12px"
            }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#3b82f6", marginBottom: "10px" }}>
                {feature.title}
              </h3>
              <p style={{ color: textSecondary, fontSize: "14px", lineHeight: "1.6" }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link to="/login" style={{
            display: "inline-block",
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "12px 40px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "600"
          }}>
            Professional Login
          </Link>
        </div>
      </div>
      <Footer isAuthenticated={false} />
    </div>
  );
}
