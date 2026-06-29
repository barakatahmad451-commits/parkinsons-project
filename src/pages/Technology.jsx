import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDarkMode } from "../context/DarkModeContext";

export default function Technology() {
  const { isDarkMode } = useDarkMode();

  const bgGradient = isDarkMode
    ? "linear-gradient(135deg, #0f1729 0%, rgba(20, 45, 100, 0.8) 100%)"
    : "linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)";

  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";

  const technologies = [
    {
      name: "Machine Learning",
      description: "Advanced ML algorithms trained on extensive voice datasets"
    },
    {
      name: "Deep Neural Networks",
      description: "Deep learning models for pattern recognition in voice signals"
    },
    {
      name: "Signal Processing",
      description: "Advanced audio signal analysis and feature extraction"
    },
    {
      name: "Cloud Computing",
      description: "Scalable infrastructure for real-time analysis"
    }
  ];

  return (
    <div style={{ background: bgGradient, minHeight: "100vh" }}>
      <Navbar />
      <style>{`
        @media (max-width: 768px) {
          .tech-container { padding: 40px 20px !important; }
          .tech-title { font-size: 28px !important; }
          .tech-grid { gap: 20px !important; }
        }
      `}</style>
      
      <div className="tech-container" style={{ padding: "clamp(30px, 5vw, 60px) clamp(16px, 3vw, 40px)", maxWidth: "1000px", margin: "0 auto" }}>
        <h1 className="tech-title" style={{ fontSize: "clamp(28px, 6vw, 36px)", fontWeight: "bold", color: textPrimary, marginBottom: "clamp(25px, 5vw, 40px)" }}>
          Our Technology
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px" }}>
          {technologies.map((tech, i) => (
            <div key={i} style={{
              backgroundColor: isDarkMode ? "rgba(30, 58, 138, 0.5)" : "rgba(255, 255, 255, 0.8)",
              border: isDarkMode ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(59, 130, 246, 0.2)",
              padding: "30px",
              borderRadius: "12px"
            }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#3b82f6", marginBottom: "10px" }}>
                {tech.name}
              </h3>
              <p style={{ color: textSecondary, fontSize: "14px", lineHeight: "1.6" }}>
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer isAuthenticated={false} />
    </div>
  );
}
