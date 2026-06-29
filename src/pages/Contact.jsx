import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [isDarkMode] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const bgGradient = isDarkMode
    ? "linear-gradient(135deg, #0f1729 0%, rgba(20, 45, 100, 0.8) 100%)"
    : "linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)";

  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";
  const inputBg = isDarkMode ? "rgba(30, 58, 138, 0.5)" : "rgba(59, 130, 246, 0.1)";

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We will contact you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ background: bgGradient, minHeight: "100vh" }}>
      <Navbar />
      <style>{`
        @media (max-width: 768px) {
          .contact-container { padding: 40px 20px !important; }
          .contact-title { font-size: 28px !important; }
          .contact-grid { gap: 25px !important; }
        }
      `}</style>
      
      <div className="contact-container" style={{ padding: "clamp(30px, 5vw, 60px) clamp(16px, 3vw, 40px)", maxWidth: "1000px", margin: "0 auto" }}>
        <h1 className="contact-title" style={{ fontSize: "clamp(28px, 6vw, 36px)", fontWeight: "bold", color: textPrimary, marginBottom: "clamp(25px, 5vw, 40px)", textAlign: "center" }}>
          Contact Us
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "40px", marginBottom: "60px" }}>
          {[
            { icon: Mail, title: "Email", value: "info@neurovox.com" },
            { icon: Phone, title: "Phone", value: "+1 (555) 123-4567" },
            { icon: MapPin, title: "Address", value: "123 Tech Street, Innovation City" }
          ].map((contact, i) => {
            const Icon = contact.icon;
            return (
              <div key={i} style={{ textAlign: "center" }}>
                <Icon size={40} color="#3b82f6" style={{ margin: "0 auto 15px" }} />
                <h3 style={{ fontSize: "18px", fontWeight: "600", color: textPrimary, marginBottom: "10px" }}>
                  {contact.title}
                </h3>
                <p style={{ color: textSecondary }}>
                  {contact.value}
                </p>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} style={{
          backgroundColor: isDarkMode ? "rgba(30, 58, 138, 0.5)" : "rgba(255, 255, 255, 0.8)",
          border: isDarkMode ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(59, 130, 246, 0.2)",
          padding: "40px",
          borderRadius: "12px",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", color: textPrimary, marginBottom: "8px", fontWeight: "500" }}>
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: inputBg,
                border: isDarkMode ? "1px solid rgba(59, 130, 246, 0.4)" : "1px solid rgba(59, 130, 246, 0.3)",
                color: isDarkMode ? "white" : "#0f1729",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", color: textPrimary, marginBottom: "8px", fontWeight: "500" }}>
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: inputBg,
                border: isDarkMode ? "1px solid rgba(59, 130, 246, 0.4)" : "1px solid rgba(59, 130, 246, 0.3)",
                color: isDarkMode ? "white" : "#0f1729",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", color: textPrimary, marginBottom: "8px", fontWeight: "500" }}>
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows="5"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: inputBg,
                border: isDarkMode ? "1px solid rgba(59, 130, 246, 0.4)" : "1px solid rgba(59, 130, 246, 0.3)",
                color: isDarkMode ? "white" : "#0f1729",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
                fontFamily: "inherit"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            Send Message
          </button>
        </form>
      </div>
      <Footer isAuthenticated={false} />
    </div>
  );
}
