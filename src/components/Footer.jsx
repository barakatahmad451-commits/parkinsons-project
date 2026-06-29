import { Link } from "react-router-dom";
import { Brain, Github, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

export default function Footer({ isAuthenticated = false }) {
  const { isDarkMode } = useDarkMode();
  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";
  const footerBg = isDarkMode 
    ? "linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(20, 45, 100, 0.95) 100%)"
    : "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 249, 255, 0.95) 100%)";
  const footerBorder = isDarkMode 
    ? "1px solid rgba(59, 130, 246, 0.3)" 
    : "1px solid rgba(59, 130, 246, 0.2)";
  const hoverColor = isDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)";

  // Different footer links for authenticated vs public users
  const footerLinks = isAuthenticated 
    ? [
        { label: "Dashboard", path: "/dashboard" },
        { label: "New Analysis", path: "/new-analysis" },
        { label: "My Reports", path: "/my-reports" },
        { label: "Profile", path: "/profile" }
      ]
    : [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
        { label: "Technology", path: "/technology" },
        { label: "Screening", path: "/screening" },
        { label: "For Professionals", path: "/for-professionals" },
        { label: "Contact", path: "/contact" }
      ];

  const productLinks = isAuthenticated
    ? [
        { label: "Start Analysis", path: "/new-analysis" },
        { label: "View Reports", path: "/my-reports" },
        { label: "Download Data", path: "/my-reports" },
        { label: "Export Results", path: "/my-reports" }
      ]
    : [
        { label: "Voice Analysis", path: "/screening" },
        { label: "Health Screening", path: "/screening" },
        { label: "Professional Tools", path: "/for-professionals" },
        { label: "Reports & Analytics", path: "/my-reports" }
      ];

  const socialLinks = [
    { icon: Github, link: "#", label: "GitHub" },
    { icon: Twitter, link: "#", label: "Twitter" },
    { icon: Linkedin, link: "#", label: "LinkedIn" },
    { icon: Mail, link: "mailto:info@neurovox.com", label: "Email" }
  ];

  return (
    <footer style={{
      background: footerBg,
      borderTop: footerBorder,
      marginTop: "clamp(50px, 10vw, 80px)",
      backdropFilter: "blur(10px)",
      boxShadow: isDarkMode 
        ? "0 -4px 20px rgba(0, 0, 0, 0.2)" 
        : "0 -4px 20px rgba(59, 130, 246, 0.1)"
    }}>
      <style>{`
        @media (max-width: 768px) {
          .footer-container { padding: 40px 20px 20px !important; }
          .footer-grid { gap: 30px !important; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important; }
          .footer-section-title { font-size: 15px !important; margin-bottom: 15px !important; }
          .footer-section-text { font-size: 13px !important; }
          .footer-bottom { flex-direction: column !important; text-align: center !important; gap: 15px !important; }
          .footer-links-group { gap: 20px !important; }
        }
        @media (max-width: 480px) {
          .footer-container { padding: 30px 15px 15px !important; }
          .footer-grid { gap: 20px !important; grid-template-columns: 1fr !important; }
          .footer-section-title { font-size: 14px !important; }
          .footer-section-text { font-size: 12px !important; }
          .contact-item { gap: 10px !important; }
          .footer-bottom { gap: 10px !important; }
          .footer-links-group { gap: 15px !important; flex-wrap: wrap !important; justify-content: center !important; }
        }
      `}</style>
      <div className="footer-container" style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "clamp(30px, 5vw, 60px) clamp(15px, 5vw, 40px) clamp(15px, 3vw, 30px)"
      }}>
        {/* Main Footer Content */}
        <div className="footer-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(30px, 5vw, 40px)",
          marginBottom: "clamp(30px, 5vw, 50px)"
        }}>
          {/* Brand Section */}
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(8px, 2vw, 12px)",
              marginBottom: "20px",
              fontWeight: "700",
              fontSize: "clamp(16px, 4vw, 18px)",
              color: textPrimary
            }}>
              <div style={{
                width: "clamp(30px, 6vw, 35px)",
                height: "clamp(30px, 6vw, 35px)",
                background: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
                flexShrink: 0
              }}>
                <Brain size={18} color="white" />
              </div>
              NeuroVox
            </div>
            <p className="footer-section-text" style={{
              color: textSecondary,
              fontSize: "clamp(13px, 2vw, 14px)",
              lineHeight: "1.6",
              marginBottom: "20px"
            }}>
              Advanced Voice Analysis Technology for Neurological Health Screening. Empowering healthcare through innovation.
            </p>
            {/* Social Links */}
            <div style={{
              display: "flex",
              gap: "clamp(10px, 2vw, 15px)",
              flexWrap: "wrap"
            }}>
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.link}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "clamp(36px, 8vw, 40px)",
                      height: "clamp(36px, 8vw, 40px)",
                      backgroundColor: hoverColor,
                      borderRadius: "8px",
                      color: textPrimary,
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "rgba(59, 130, 246, 0.4)";
                      e.target.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = hoverColor;
                      e.target.style.transform = "translateY(0)";
                    }}
                    title={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Products Section */}
          <div>
            <h3 className="footer-section-title" style={{
              color: textPrimary,
              fontSize: "clamp(15px, 3vw, 16px)",
              fontWeight: "600",
              marginBottom: "20px"
            }}>
              Products
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {productLinks.map((item, idx) => (
                <li key={idx} style={{ marginBottom: "12px" }}>
                  <Link to={item.path} style={{
                    color: textSecondary,
                    textDecoration: "none",
                    fontSize: "clamp(13px, 2vw, 14px)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#3b82f6";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = textSecondary;
                  }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="footer-section-title" style={{
              color: textPrimary,
              fontSize: "clamp(15px, 3vw, 16px)",
              fontWeight: "600",
              marginBottom: "20px"
            }}>
              Company
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {footerLinks.map((link, idx) => (
                <li key={idx} style={{ marginBottom: "12px" }}>
                  <Link to={link.path} style={{
                    color: textSecondary,
                    textDecoration: "none",
                    fontSize: "clamp(13px, 2vw, 14px)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#3b82f6";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = textSecondary;
                  }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="footer-section-title" style={{
              color: textPrimary,
              fontSize: "clamp(15px, 3vw, 16px)",
              fontWeight: "600",
              marginBottom: "20px"
            }}>
              Contact Us
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 2vw, 15px)" }}>
              <div className="contact-item" style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <MapPin size={18} color="#3b82f6" style={{ marginTop: "2px", flexShrink: 0 }} />
                <span style={{ color: textSecondary, fontSize: "clamp(13px, 2vw, 14px)", lineHeight: "1.5" }}>
                  123 Innovation Street<br />
                  Tech City, TC 12345
                </span>
              </div>
              <div className="contact-item" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <Phone size={18} color="#3b82f6" style={{ flexShrink: 0 }} />
                <a href="tel:+1234567890" style={{
                  color: textSecondary,
                  fontSize: "clamp(13px, 2vw, 14px)",
                  textDecoration: "none",
                  transition: "color 0.2s"
                }}
                onMouseEnter={(e) => e.target.style.color = "#3b82f6"}
                onMouseLeave={(e) => e.target.style.color = textSecondary}>
                  +1 (234) 567-890
                </a>
              </div>
              <div className="contact-item" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <Mail size={18} color="#3b82f6" style={{ flexShrink: 0 }} />
                <a href="mailto:info@neurovox.com" style={{
                  color: textSecondary,
                  fontSize: "clamp(13px, 2vw, 14px)",
                  textDecoration: "none",
                  transition: "color 0.2s"
                }}
                onMouseEnter={(e) => e.target.style.color = "#3b82f6"}
                onMouseLeave={(e) => e.target.style.color = textSecondary}>
                  info@neurovox.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          borderTop: footerBorder,
          paddingTop: "clamp(20px, 3vw, 30px)",
          marginTop: "clamp(15px, 3vw, 20px)"
        }}>
          {/* Bottom Footer */}
          <div className="footer-bottom" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "clamp(15px, 3vw, 20px)"
          }}>
            <p style={{
              color: textSecondary,
              fontSize: "clamp(12px, 2vw, 13px)"
            }}>
              © 2026 NeuroVox. All rights reserved.
            </p>
            <div className="footer-links-group" style={{
              display: "flex",
              gap: "clamp(15px, 3vw, 30px)",
              flexWrap: "wrap",
              justifyContent: "flex-end"
            }}>
              <Link to="#" style={{
                color: textSecondary,
                fontSize: "clamp(12px, 2vw, 13px)",
                textDecoration: "none",
                transition: "color 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.color = "#3b82f6"}
              onMouseLeave={(e) => e.target.style.color = textSecondary}>
                Privacy Policy
              </Link>
              <Link to="#" style={{
                color: textSecondary,
                fontSize: "clamp(12px, 2vw, 13px)",
                textDecoration: "none",
                transition: "color 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.color = "#3b82f6"}
              onMouseLeave={(e) => e.target.style.color = textSecondary}>
                Terms of Service
              </Link>
              <Link to="#" style={{
                color: textSecondary,
                fontSize: "clamp(12px, 2vw, 13px)",
                textDecoration: "none",
                transition: "color 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.color = "#3b82f6"}
              onMouseLeave={(e) => e.target.style.color = textSecondary}>
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
