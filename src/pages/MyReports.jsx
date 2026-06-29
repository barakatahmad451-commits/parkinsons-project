import { useState } from "react";
import { FileText, Download, Eye, Share2, Search, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDarkMode } from "../context/DarkModeContext";
import { useNotification } from "../context/NotificationContext";
import { mockPredictionsHistory, generateMockFullReport } from "../utils/mockData";

export default function MyReports({ setIsLoggedIn }) {
  const { isDarkMode } = useDarkMode();
  const { addNotification } = useNotification();
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  const bgGradient = isDarkMode
    ? "linear-gradient(135deg, #0f1729 0%, rgba(20, 45, 100, 0.8) 100%)"
    : "linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)";

  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";
  const cardBg = isDarkMode ? "rgba(30, 58, 138, 0.5)" : "rgba(255, 255, 255, 0.8)";
  const cardBorder = isDarkMode ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(59, 130, 246, 0.2)";
  const modalBg = isDarkMode ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)";

  const filterReports = mockPredictionsHistory.filter(report => {
    const matchesStatus = filterStatus === "all" || report.status === filterStatus;
    const matchesSearch = report.status.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         report.date.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case "Healthy": return "#10b981";
      case "Early Parkinson's": return "#f59e0b";
      case "Moderate": return "#ff7f50";
      case "Severe": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const handleDownloadReport = (report) => {
    const reportContent = generateMockFullReport(report);
    const element = document.createElement('a');
    const file = new Blob([reportContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `PD-Analysis-Report-${report.date}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    addNotification("Report downloaded successfully!", "success");
  };

  const handleShareReport = (report) => {
    addNotification(`Report share link copied to clipboard`, "info");
  };

  return (
    <div style={{ background: bgGradient, minHeight: "100vh" }}>
      <Navbar isAuthenticated={true} setIsLoggedIn={setIsLoggedIn} />

      <style>{`
        @media (max-width: 768px) {
          .reports-container { padding: 40px 20px !important; }
          .reports-header { flex-direction: column !important; align-items: flex-start !important; }
          .reports-title { font-size: 28px !important; margin-bottom: 15px !important; }
          .reports-filters { flex-direction: column !important; }
          .reports-grid { gap: 20px !important; }
        }
      `}</style>

      <div className="reports-container" style={{ padding: "clamp(30px, 5vw, 60px) clamp(16px, 3vw, 40px)", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 className="reports-title" style={{ fontSize: "clamp(28px, 6vw, 36px)", fontWeight: "700", color: textPrimary, marginBottom: "30px" }}>
          My Analysis Reports
        </h1>

        {/* Search and Filters */}
        <div style={{ marginBottom: "30px", display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{
            flex: 1,
            minWidth: "250px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 16px",
            backgroundColor: cardBg,
            border: cardBorder,
            borderRadius: "8px",
          }}>
            <Search size={18} color={textSecondary} />
            <input
              type="text"
              placeholder="Search by date or status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                color: textPrimary,
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div className="reports-filters" style={{ display: "flex", gap: "10px" }}>
            {["all", "Healthy", "Early Parkinson's", "Moderate", "Severe"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  padding: "10px 16px",
                  backgroundColor: filterStatus === status ? getStatusColor(status) : "transparent",
                  color: filterStatus === status ? "white" : textSecondary,
                  border: `1px solid ${filterStatus === status ? "transparent" : "rgba(59, 130, 246, 0.3)"}`,
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "13px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (filterStatus !== status) {
                    e.target.style.backgroundColor = `${getStatusColor(status)}15`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (filterStatus !== status) {
                    e.target.style.backgroundColor = "transparent";
                  }
                }}
              >
                {status === "all" ? "All" : status}
              </button>
            ))}
          </div>
        </div>

        {/* Reports List */}
        {filterReports.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            backgroundColor: cardBg,
            border: cardBorder,
            borderRadius: "12px"
          }}>
            <FileText size={60} color={textSecondary} style={{ margin: "0 auto 20px", opacity: 0.5 }} />
            <p style={{ color: textSecondary, fontSize: "16px", margin: 0 }}>
              {mockPredictionsHistory.length === 0 ? "No reports yet. Start a new analysis!" : "No reports match your filters."}
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "16px" }}>
            {filterReports.map((report) => (
              <div key={report.id} style={{
                backgroundColor: cardBg,
                border: cardBorder,
                padding: "20px",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all 0.3s ease",
                borderLeft: `4px solid ${getStatusColor(report.status)}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(59, 130, 246, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px", flex: 1 }}>
                  <div style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: `${getStatusColor(report.status)}20`,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <FileText size={24} color={getStatusColor(report.status)} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                      <h3 style={{ fontSize: "16px", fontWeight: "600", color: textPrimary, margin: 0 }}>
                        {report.status}
                      </h3>
                      <span style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        padding: "4px 12px",
                        backgroundColor: `${getStatusColor(report.status)}20`,
                        color: getStatusColor(report.status),
                        borderRadius: "4px",
                        whiteSpace: "nowrap"
                      }}>
                        {report.reportType || "Full Analysis"}
                      </span>
                    </div>
                    <p style={{ color: textSecondary, fontSize: "13px", margin: 0 }}>
                      {report.date} at {report.time} • Confidence: {report.confidence}%
                    </p>
                  </div>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                  <button
                    onClick={() => setSelectedReport(report)}
                    style={{
                      backgroundColor: "transparent",
                      color: "#3b82f6",
                      border: "1px solid rgba(59, 130, 246, 0.3)",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontWeight: "600",
                      transition: "all 0.2s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}>
                    <Eye size={16} />
                    View
                  </button>
                  <button
                    onClick={() => handleDownloadReport(report)}
                    style={{
                      backgroundColor: getStatusColor(report.status),
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontWeight: "600",
                      transition: "all 0.2s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "0.8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}>
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px",
        }}>
          <div style={{
            backgroundColor: modalBg,
            borderRadius: "16px",
            maxWidth: "600px",
            width: "100%",
            maxHeight: "80vh",
            overflowY: "auto",
            padding: "32px",
            border: cardBorder,
            position: "relative",
          }}>
            <button
              onClick={() => setSelectedReport(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                color: textSecondary,
                padding: "4px",
              }}
            >
              <X size={24} />
            </button>

            <h2 style={{ fontSize: "24px", fontWeight: "700", color: textPrimary, marginBottom: "8px" }}>
              Analysis Report
            </h2>
            <p style={{ fontSize: "13px", color: textSecondary, marginBottom: "24px" }}>
              {selectedReport.date} at {selectedReport.time}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
              <div style={{
                backgroundColor: `${getStatusColor(selectedReport.status)}15`,
                padding: "16px",
                borderRadius: "8px",
                borderLeft: `3px solid ${getStatusColor(selectedReport.status)}`,
              }}>
                <p style={{ fontSize: "12px", color: textSecondary, margin: "0 0 8px 0" }}>Diagnosis</p>
                <p style={{ fontSize: "18px", fontWeight: "700", color: getStatusColor(selectedReport.status), margin: 0 }}>
                  {selectedReport.status}
                </p>
              </div>
              <div style={{
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                padding: "16px",
                borderRadius: "8px",
                borderLeft: "3px solid #10b981",
              }}>
                <p style={{ fontSize: "12px", color: textSecondary, margin: "0 0 8px 0" }}>Confidence Score</p>
                <p style={{ fontSize: "18px", fontWeight: "700", color: "#10b981", margin: 0 }}>
                  {selectedReport.confidence}%
                </p>
              </div>
            </div>

            <div style={{
              backgroundColor: isDarkMode ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "24px",
              maxHeight: "200px",
              overflowY: "auto",
            }}>
              <p style={{ fontSize: "12px", color: textSecondary, fontWeight: "600", margin: "0 0 8px 0" }}>
                Report Summary
              </p>
              <p style={{ fontSize: "13px", color: textPrimary, lineHeight: "1.6", margin: 0, whiteSpace: "pre-wrap" }}>
                {generateMockFullReport(selectedReport).slice(0, 500)}...
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => {
                  handleDownloadReport(selectedReport);
                  setSelectedReport(null);
                }}
                style={{
                  flex: 1,
                  backgroundColor: getStatusColor(selectedReport.status),
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                <Download size={18} />
                Download Full Report
              </button>
              <button
                onClick={() => setSelectedReport(null)}
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  color: "#3b82f6",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer isAuthenticated={true} />
    </div>
  );
}
