import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LogOut,
  Brain,
  LayoutDashboard,
  Upload,
  FileText,
  User,
  Heart,
  TrendingUp,
  Activity,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDarkMode } from "../context/DarkModeContext";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockPredictionsHistory, mockAnalyticsDashboard } from "../utils/mockData";

// Generate chart data from mock predictions
const generateChartData = () => {
  const data = [
    { name: "Mon", analyses: 12, healthy: 8, detected: 4 },
    { name: "Tue", analyses: 15, healthy: 10, detected: 5 },
    { name: "Wed", analyses: 18, healthy: 11, detected: 7 },
    { name: "Thu", analyses: 22, healthy: 14, detected: 8 },
    { name: "Fri", analyses: 25, healthy: 16, detected: 9 },
    { name: "Sat", analyses: 20, healthy: 13, detected: 7 },
  ];
  return data;
};

const dashboardData = generateChartData();

export default function Dashboard({ setIsLoggedIn }) {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredChart, setHoveredChart] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const bgGradient = isDarkMode
    ? "linear-gradient(135deg, #0f1729 0%, rgba(20, 45, 100, 0.8) 100%)"
    : "linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)";

  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";
  const buttonBg = isDarkMode
    ? "rgba(59, 130, 246, 0.1)"
    : "rgba(59, 130, 246, 0.08)";
  const buttonBorder = isDarkMode
    ? "1px solid rgba(59, 130, 246, 0.3)"
    : "1px solid rgba(59, 130, 246, 0.2)";
  const cardBg = isDarkMode
    ? "linear-gradient(135deg, rgba(30, 58, 138, 0.5), rgba(20, 45, 100, 0.4))"
    : "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(240, 249, 255, 0.7))";
  const cardBorder = isDarkMode
    ? "1px solid rgba(59, 130, 246, 0.2)"
    : "1px solid rgba(59, 130, 246, 0.15)";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
        background: bgGradient,
      }}
    >
      <style>{`
        @keyframes soft-glow { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes heartbeat { 0%, 100% { transform: scale(1); } 25% { transform: scale(1.15); } 50% { transform: scale(1.25); } 75% { transform: scale(1.15); } }
        @keyframes heart-glow { 0% { filter: drop-shadow(0 0 0px #ec4899); } 100% { filter: drop-shadow(0 0 30px #ec4899); } }
        @keyframes revenue-glow { 0% { filter: drop-shadow(0 0 0px #10b981); } 100% { filter: drop-shadow(0 0 30px #10b981); } }
        @keyframes activity-glow { 0% { filter: drop-shadow(0 0 0px #3b82f6); } 100% { filter: drop-shadow(0 0 30px #3b82f6); } }
        @keyframes chart-glow-anim { 0% { filter: drop-shadow(0 0 0px #f59e0b); } 100% { filter: drop-shadow(0 0 30px #f59e0b); } }
        @keyframes revenue-arrow { 0%, 100% { transform: translateY(0) translateX(0); } 33% { transform: translateY(-8px) translateX(2px); } 66% { transform: translateY(-4px) translateX(-2px); } }
        @keyframes activity-zigzag { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(3deg); } 50% { transform: rotate(-3deg); } 75% { transform: rotate(2deg); } }
        @keyframes bars-grow { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.2); } }
        @keyframes brain-expand { 0% { transform: scale(1); filter: brightness(1); } 100% { transform: scale(1.3); filter: brightness(1.4) drop-shadow(0 0 30px rgba(59, 130, 246, 1)) drop-shadow(0 0 60px rgba(6, 182, 212, 0.8)); } }
        @keyframes glow-expand { 0% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), inset 0 0 20px rgba(59, 130, 246, 0.2); } 100% { box-shadow: 0 0 80px rgba(59, 130, 246, 1), inset 0 0 50px rgba(6, 182, 212, 0.8); } }
        @keyframes icon-expand { 0% { transform: scale(1); } 100% { transform: scale(1.4); } }
        @keyframes chart-glow-box { 0% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.2), inset 0 0 20px rgba(59, 130, 246, 0.1); } 100% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), inset 0 0 30px rgba(6, 182, 212, 0.5); } }
        .soft-glow { animation: soft-glow 4s ease-in-out infinite; }
        .heartbeat-icon { animation: heartbeat 0.8s ease-in-out infinite; }
        .arrow-icon { animation: revenue-arrow 0.9s ease-in-out infinite; }
        .activity-icon { animation: activity-zigzag 0.8s ease-in-out infinite; }
        .chart-icon { animation: bars-grow 0.8s ease-in-out infinite; }
        .logo-glow { opacity: 0.3; transition: all 0.3s ease; background: linear-gradient(135deg, #3b82f6, #0ea5e9) !important; }
        .logo-glow:hover { opacity: 1; background: transparent !important; animation: glow-expand 0.6s ease-out forwards; }
        .logo-glow:hover svg { animation: brain-expand 0.6s ease-out forwards; }
        .icon-container { transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; }
        .icon-container:hover { background: transparent !important; }
        .icon-container:hover svg { animation: icon-expand 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards !important; }
        .heart-icon-container:hover svg { animation: icon-expand 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, heart-glow 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s forwards, heartbeat 0.8s cubic-bezier(0.4, 0, 0.6, 1) 1s infinite !important; }
        .revenue-icon-container:hover svg { animation: icon-expand 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, revenue-glow 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s forwards, revenue-arrow 0.9s cubic-bezier(0.4, 0, 0.6, 1) 1s infinite !important; }
        .activity-icon-container:hover svg { animation: icon-expand 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, activity-glow 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s forwards, activity-zigzag 0.8s cubic-bezier(0.4, 0, 0.6, 1) 1s infinite !important; }
        .chart-icon-container:hover svg { animation: icon-expand 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, chart-glow-anim 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s forwards, bars-grow 0.8s cubic-bezier(0.4, 0, 0.6, 1) 1s infinite !important; }
        .stat-card { transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
        .stat-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2); border-color: rgba(59, 130, 246, 0.6) !important; }
        .chart-container { transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
        .chart-container:hover { animation: chart-glow-box 0.8s ease-out forwards; transform: translateY(-8px); box-shadow: 0 20px 50px rgba(59, 130, 246, 0.35), 0 0 30px rgba(59, 130, 246, 0.3); border-color: rgba(59, 130, 246, 0.8) !important; }
        .chart-container:hover text { filter: brightness(1.1); }
      `}</style>

      {/* Background Orbs */}
      <div
        className="soft-glow"
        style={{
          position: "fixed",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.08), transparent)",
          borderRadius: "50%",
          top: "-15%",
          left: "-10%",
          filter: "blur(80px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        className="soft-glow"
        style={{
          position: "fixed",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.06), transparent)",
          borderRadius: "50%",
          bottom: "-10%",
          right: "-5%",
          filter: "blur(80px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Navbar */}
      <Navbar isAuthenticated={true} setIsLoggedIn={setIsLoggedIn} />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 10,
          overflow: "hidden",
        }}
      >
        {/* Content */}
        <div style={{ flex: 1, padding: "clamp(20px, 4vw, 30px) clamp(16px, 3vw, 40px)", overflowY: "auto", maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
          {/* Stats Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            {[
              {
                icon: Brain,
                label: "Total Analyses",
                value: mockAnalyticsDashboard.totalAnalyses,
                color: "#3b82f6",
                unit: "",
              },
              {
                icon: Heart,
                label: "Avg Confidence",
                value: mockAnalyticsDashboard.averageConfidence,
                color: "#10b981",
                unit: "%",
              },
              {
                icon: Activity,
                label: "Healthy Cases",
                value: mockAnalyticsDashboard.severityDistribution.find(s => s.status === 'Healthy')?.count || 0,
                color: "#10b981",
                unit: "",
              },
              {
                icon: TrendingUp,
                label: "Risk Cases",
                value: (mockAnalyticsDashboard.severityDistribution.find(s => s.status === 'Moderate')?.count || 0) + (mockAnalyticsDashboard.severityDistribution.find(s => s.status === 'Severe')?.count || 0),
                color: "#ef4444",
                unit: "",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="stat-card"
                style={{
                  background: cardBg,
                  border: cardBorder,
                  borderRadius: "16px",
                  padding: "24px",
                  backdropFilter: "blur(10px)",
                  zIndex: 5,
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      color: textSecondary,
                      fontWeight: "600",
                    }}
                  >
                    {stat.label}
                  </span>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: `${stat.color}20`,
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className={`icon-container ${i === 0 ? "heart-icon-container" : i === 1 ? "revenue-icon-container" : i === 2 ? "activity-icon-container" : "chart-icon-container"}`}
                  >
                    <stat.icon
                      size={20}
                      color={stat.color}
                      strokeWidth={2}
                      style={{
                        transformOrigin: "center",
                        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    />
                  </div>
                </div>
                <h3
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: textPrimary,
                    margin: "0",
                  }}
                >
                  {stat.value}{stat.unit}
                </h3>
              </div>
            ))}
          </div>

          {/* Charts & Recent */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            {/* Line Chart - Analyses Trend */}
            <div
              className="chart-container"
              style={{
                background: cardBg,
                border: cardBorder,
                borderRadius: "16px",
                padding: "24px",
                backdropFilter: "blur(10px)",
                zIndex: 5,
              }}
              onMouseEnter={() => setHoveredChart(0)}
              onMouseLeave={() => setHoveredChart(null)}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: textPrimary,
                  margin: "0 0 20px 0",
                }}
              >
                Weekly Analysis Trend
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={dashboardData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={
                      isDarkMode
                        ? "rgba(59, 130, 246, 0.2)"
                        : "rgba(59, 130, 246, 0.15)"
                    }
                  />
                  <XAxis dataKey="name" stroke={textSecondary} />
                  <YAxis stroke={textSecondary} />
                  <Tooltip
                    contentStyle={{
                      background: isDarkMode
                        ? "rgba(15, 23, 42, 0.9)"
                        : "rgba(255, 255, 255, 0.9)",
                      border: `1px solid ${isDarkMode ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.2)"}`,
                      borderRadius: "8px",
                      color: textPrimary,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="analyses"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="detected"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ fill: "#ef4444", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart - Severity Distribution */}
            <div
              className="chart-container"
              style={{
                background: cardBg,
                border: cardBorder,
                borderRadius: "16px",
                padding: "24px",
                backdropFilter: "blur(10px)",
                zIndex: 5,
              }}
              onMouseEnter={() => setHoveredChart(1)}
              onMouseLeave={() => setHoveredChart(null)}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: textPrimary,
                  margin: "0 0 20px 0",
                }}
              >
                Case Distribution
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-around",
                  height: "250px",
                  gap: "12px",
                }}
              >
                {[
                  { label: "Healthy", value: mockAnalyticsDashboard.severityDistribution.healthy, color: "#10b981" },
                  { label: "Early", value: mockAnalyticsDashboard.severityDistribution.early, color: "#f59e0b" },
                  { label: "Moderate", value: mockAnalyticsDashboard.severityDistribution.moderate, color: "#ff7f50" },
                  { label: "Severe", value: mockAnalyticsDashboard.severityDistribution.severe, color: "#ef4444" },
                ].map((item, i) => {
                  const maxValue = Math.max(
                    mockAnalyticsDashboard.severityDistribution.healthy,
                    mockAnalyticsDashboard.severityDistribution.early,
                    mockAnalyticsDashboard.severityDistribution.moderate,
                    mockAnalyticsDashboard.severityDistribution.severe
                  );
                  const heightPercent = (item.value / maxValue) * 100;
                  return (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "200px",
                          backgroundColor: `${item.color}30`,
                          borderRadius: "8px 8px 0 0",
                          border: `2px solid ${item.color}`,
                          position: "relative",
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: `${heightPercent}%`,
                            backgroundColor: item.color,
                            borderRadius: "6px 6px 0 0",
                            transition: "height 0.3s ease",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: "11px", color: textSecondary, fontWeight: "600" }}>
                        {item.label}
                      </span>
                      <span style={{ fontSize: "14px", fontWeight: "700", color: textPrimary }}>
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Predictions */}
          <div
            style={{
              background: cardBg,
              border: cardBorder,
              borderRadius: "16px",
              padding: "24px",
              backdropFilter: "blur(10px)",
              zIndex: 5,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: textPrimary,
                  margin: 0,
                }}
              >
                Recent Analyses
              </h3>
              <Link
                to="/my-reports"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#3b82f6",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.gap = "10px";
                  e.currentTarget.style.color = "#2563eb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.gap = "6px";
                  e.currentTarget.style.color = "#3b82f6";
                }}
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {mockPredictionsHistory.slice(0, 5).map((prediction, i) => {
                const statusColors = {
                  Healthy: "#10b981",
                  "Early Parkinson's": "#f59e0b",
                  Moderate: "#ff7f50",
                  Severe: "#ef4444",
                };
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px",
                      backgroundColor: isDarkMode ? "rgba(59, 130, 246, 0.05)" : "rgba(59, 130, 246, 0.03)",
                      borderRadius: "8px",
                      borderLeft: `3px solid ${statusColors[prediction.status] || "#3b82f6"}`,
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: "13px", fontWeight: "600", color: textPrimary, margin: "0 0 4px 0" }}>
                        {prediction.status}
                      </h4>
                      <p style={{ fontSize: "12px", color: textSecondary, margin: 0 }}>
                        {prediction.date} at {prediction.time}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "14px", fontWeight: "700", color: textPrimary }}>
                        {prediction.confidence}%
                      </span>
                      <p style={{ fontSize: "11px", color: textSecondary, margin: "4px 0 0 0" }}>
                        Confidence
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link
              to="/new-analysis"
              style={{
                display: "inline-block",
                marginTop: "16px",
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
            >
              Start New Analysis
            </Link>
          </div>
        </div>
      </div>
      <Footer isAuthenticated={true} />
    </div>
  );
}
