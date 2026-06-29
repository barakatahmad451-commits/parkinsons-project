import { useState } from "react";
import { Trash2, Edit2, Plus, Download } from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";
import { useDarkMode } from "../../context/DarkModeContext";

export default function DocumentationManager({ setIsLoggedIn }) {
  const { isDarkMode } = useDarkMode();
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: "FYP Project Proposal",
      type: "PDF",
      author: "Hassan Raza",
      size: "2.4 MB",
      uploaded: "2024-03-15",
      status: "Approved",
    },
    {
      id: 2,
      title: "Technical Documentation",
      type: "DOCX",
      author: "Ahmed Khan",
      size: "1.8 MB",
      uploaded: "2024-03-10",
      status: "In Review",
    },
    {
      id: 3,
      title: "System Architecture",
      type: "PDF",
      author: "Fatima Ali",
      size: "3.2 MB",
      uploaded: "2024-03-18",
      status: "Approved",
    },
    {
      id: 4,
      title: "API Reference Guide",
      type: "DOCX",
      author: "Ali Hassan",
      size: "1.5 MB",
      uploaded: "2024-03-12",
      status: "Draft",
    },
  ]);

  const bgGradient = isDarkMode
    ? "linear-gradient(135deg, #0f1729 0%, rgba(20, 45, 100, 0.8) 100%)"
    : "linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)";

  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";
  const cardBg = isDarkMode ? "rgba(30, 58, 138, 0.5)" : "rgba(255, 255, 255, 0.8)";
  const cardBorder = isDarkMode ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(59, 130, 246, 0.2)";
  const tableRowBg = isDarkMode ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)";

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "#10b981";
      case "In Review":
        return "#f59e0b";
      case "Draft":
        return "#6b7280";
      default:
        return "#ef4444";
    }
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: bgGradient }}>
      <AdminSidebar setIsLoggedIn={setIsLoggedIn} />

      <main style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: "700", color: textPrimary, margin: 0 }}>
                Documentation Manager
              </h1>
              <p style={{ color: textSecondary, marginTop: "5px" }}>
                Total Documents: {documents.length}
              </p>
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#2563eb";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#3b82f6";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <Plus size={18} />
              Upload Document
            </button>
          </div>

          {/* Documents Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {documents.map((doc) => (
              <div
                key={doc.id}
                style={{
                  background: cardBg,
                  border: cardBorder,
                  borderRadius: "16px",
                  padding: "20px",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-5px)";
                  e.target.style.borderColor = "#3b82f6";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.borderColor = isDarkMode
                    ? "rgba(59, 130, 246, 0.3)"
                    : "rgba(59, 130, 246, 0.2)";
                }}
              >
                {/* Document Header */}
                <div style={{ marginBottom: "15px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#3b82f6",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: "700",
                      }}
                    >
                      {doc.type}
                    </div>
                    <span
                      style={{
                        color: getStatusColor(doc.status),
                        fontSize: "11px",
                        fontWeight: "700",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        backgroundColor: getStatusColor(doc.status) + "20",
                      }}
                    >
                      {doc.status}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: textPrimary, margin: 0 }}>
                    {doc.title}
                  </h3>
                </div>

                {/* Document Info */}
                <div style={{ marginBottom: "15px" }}>
                  <p style={{ fontSize: "12px", color: textSecondary, margin: "5px 0" }}>
                    Author: {doc.author}
                  </p>
                  <p style={{ fontSize: "12px", color: textSecondary, margin: "5px 0" }}>
                    Size: {doc.size}
                  </p>
                  <p style={{ fontSize: "12px", color: textSecondary, margin: "5px 0" }}>
                    Uploaded: {doc.uploaded}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#2563eb";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#3b82f6";
                    }}
                  >
                    <Download size={14} />
                    Download
                  </button>
                  <button
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      backgroundColor: "#10b981",
                      color: "white",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#059669";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#10b981";
                    }}
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#ef4444",
                      color: "white",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#dc2626";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#ef4444";
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
