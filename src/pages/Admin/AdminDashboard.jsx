import { useNavigate } from "react-router-dom";
import { Users, FileText, BarChart3, TrendingUp } from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";
import { useDarkMode } from "../../context/DarkModeContext";

export default function AdminDashboard({ setIsLoggedIn }) {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const stats = [
    { label: "Total Users", value: "1,234", icon: Users, color: "#3b82f6" },
    { label: "Total Reports", value: "5,678", icon: FileText, color: "#10b981" },
    { label: "Avg Rating", value: "4.8/5", icon: TrendingUp, color: "#f59e0b" },
    { label: "Active Sessions", value: "342", icon: BarChart3, color: "#8b5cf6" },
  ];

  const recentActivity = [
    { id: 1, user: "Ahmed Khan", action: "Created new analysis", time: "2 mins ago" },
    { id: 2, user: "Fatima Ali", action: "Downloaded report", time: "15 mins ago" },
    { id: 3, user: "Hassan Raza", action: "Updated profile", time: "1 hour ago" },
    { id: 4, user: "Ayesha Malik", action: "Completed screening", time: "2 hours ago" },
  ];

  const bgGradient = isDarkMode
    ? "linear-gradient(135deg, #0f1729 0%, rgba(20, 45, 100, 0.8) 100%)"
    : "linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)";

  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";
  const cardBg = isDarkMode ? "rgba(30, 58, 138, 0.5)" : "rgba(255, 255, 255, 0.8)";
  const cardBorder = isDarkMode ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(59, 130, 246, 0.2)";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: bgGradient }}>
      <AdminSidebar setIsLoggedIn={setIsLoggedIn} />

      <main style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: "28px" }}>
            <h1 style={{ fontSize: "30px", fontWeight: "800", color: textPrimary, margin: 0, letterSpacing: "-0.02em" }}>
              Admin Dashboard
            </h1>
            <p style={{ color: textSecondary, marginTop: "6px", fontSize: "15px" }}>
              Welcome to the NeuroVoice Admin Panel
            </p>
          </div>

          {/* Stats Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  background: cardBg,
                  border: cardBorder,
                  borderRadius: "16px",
                  padding: "20px",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-5px)";
                  e.target.style.borderColor = stat.color;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.borderColor = isDarkMode
                    ? "rgba(59, 130, 246, 0.3)"
                    : "rgba(59, 130, 246, 0.2)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                  <div>
                    <p style={{ color: textSecondary, fontSize: "13px", margin: 0 }}>
                      {stat.label}
                    </p>
                    <p style={{ fontSize: "28px", fontWeight: "700", color: textPrimary, margin: "8px 0 0 0" }}>
                      {stat.value}
                    </p>
                  </div>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      background: stat.color,
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0.2,
                    }}
                  >
                    <stat.icon size={24} color={stat.color} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div
            style={{
              background: cardBg,
              border: cardBorder,
              borderRadius: "16px",
              padding: "20px",
              backdropFilter: "blur(10px)",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: textPrimary, margin: "0 0 20px 0" }}>
              Recent Activity
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  style={{
                    padding: "15px",
                    background: isDarkMode ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p style={{ color: textPrimary, fontWeight: "600", margin: 0 }}>
                      {activity.user}
                    </p>
                    <p style={{ color: textSecondary, fontSize: "13px", margin: "5px 0 0 0" }}>
                      {activity.action}
                    </p>
                  </div>
                  <p style={{ color: textSecondary, fontSize: "12px", margin: 0 }}>
                    {activity.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
