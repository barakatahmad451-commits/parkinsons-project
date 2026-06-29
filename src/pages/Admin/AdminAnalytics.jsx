import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import AdminSidebar from "../../components/AdminSidebar";
import { useDarkMode } from "../../context/DarkModeContext";

export default function AdminAnalytics({ setIsLoggedIn }) {
  const { isDarkMode } = useDarkMode();

  const userGrowthData = [
    { month: "Jan", users: 180, activeUsers: 120 },
    { month: "Feb", users: 220, activeUsers: 140 },
    { month: "Mar", users: 280, activeUsers: 180 },
    { month: "Apr", users: 350, activeUsers: 220 },
    { month: "May", users: 450, activeUsers: 280 },
    { month: "Jun", users: 580, activeUsers: 350 },
  ];

  const analysisData = [
    { month: "Jan", completed: 45, pending: 12 },
    { month: "Feb", completed: 62, pending: 18 },
    { month: "Mar", completed: 78, pending: 22 },
    { month: "Apr", completed: 95, pending: 28 },
    { month: "May", completed: 120, pending: 35 },
    { month: "Jun", completed: 145, pending: 42 },
  ];

  const reportTypeData = [
    { name: "Positive", value: 35, color: "#10b981" },
    { name: "Negative", value: 45, color: "#6b7280" },
    { name: "Inconclusive", value: 20, color: "#f59e0b" },
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
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "30px", fontWeight: "800", color: textPrimary, margin: 0, letterSpacing: "-0.02em" }}>
              Analytics Dashboard
            </h1>
            <p style={{ color: textSecondary, marginTop: "6px", fontSize: "15px" }}>
              System performance & usage insights
            </p>
          </div>

          {/* Charts Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
              gap: "20px",
            }}
          >
            {/* User Growth Chart */}
            <div
              style={{
                background: cardBg,
                border: cardBorder,
                borderRadius: "12px",
                padding: "20px",
                backdropFilter: "blur(10px)",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: textPrimary,
                  margin: "0 0 20px 0",
                }}
              >
                User Growth (6 Months)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)"} />
                  <XAxis stroke={textSecondary} />
                  <YAxis stroke={textSecondary} />
                  <Tooltip contentStyle={{ backgroundColor: cardBg, borderColor: "#3b82f6" }} />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="activeUsers" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Analysis Completion Chart */}
            <div
              style={{
                background: cardBg,
                border: cardBorder,
                borderRadius: "12px",
                padding: "20px",
                backdropFilter: "blur(10px)",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: textPrimary,
                  margin: "0 0 20px 0",
                }}
              >
                Analysis Status (6 Months)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analysisData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)"} />
                  <XAxis stroke={textSecondary} />
                  <YAxis stroke={textSecondary} />
                  <Tooltip contentStyle={{ backgroundColor: cardBg, borderColor: "#3b82f6" }} />
                  <Legend />
                  <Bar dataKey="completed" fill="#10b981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="pending" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Report Type Distribution */}
            <div
              style={{
                background: cardBg,
                border: cardBorder,
                borderRadius: "12px",
                padding: "20px",
                backdropFilter: "blur(10px)",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: textPrimary,
                  margin: "0 0 20px 0",
                }}
              >
                Report Type Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={reportTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {reportTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: cardBg, borderColor: "#3b82f6" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Key Metrics */}
            <div
              style={{
                background: cardBg,
                border: cardBorder,
                borderRadius: "12px",
                padding: "20px",
                backdropFilter: "blur(10px)",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: textPrimary,
                  margin: "0 0 20px 0",
                }}
              >
                Key Metrics
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "15px",
                }}
              >
                <div
                  style={{
                    padding: "15px",
                    backgroundColor: isDarkMode ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)",
                    borderRadius: "8px",
                  }}
                >
                  <p style={{ color: textSecondary, fontSize: "12px", margin: 0 }}>
                    Total Users
                  </p>
                  <p style={{ color: textPrimary, fontSize: "22px", fontWeight: "700", margin: "8px 0 0 0" }}>
                    1,234
                  </p>
                </div>
                <div
                  style={{
                    padding: "15px",
                    backgroundColor: isDarkMode ? "rgba(16, 185, 129, 0.1)" : "rgba(16, 185, 129, 0.05)",
                    borderRadius: "8px",
                  }}
                >
                  <p style={{ color: textSecondary, fontSize: "12px", margin: 0 }}>
                    Completed Analysis
                  </p>
                  <p style={{ color: "#10b981", fontSize: "22px", fontWeight: "700", margin: "8px 0 0 0" }}>
                    5,678
                  </p>
                </div>
                <div
                  style={{
                    padding: "15px",
                    backgroundColor: isDarkMode ? "rgba(245, 158, 11, 0.1)" : "rgba(245, 158, 11, 0.05)",
                    borderRadius: "8px",
                  }}
                >
                  <p style={{ color: textSecondary, fontSize: "12px", margin: 0 }}>
                    Pending Analysis
                  </p>
                  <p style={{ color: "#f59e0b", fontSize: "22px", fontWeight: "700", margin: "8px 0 0 0" }}>
                    342
                  </p>
                </div>
                <div
                  style={{
                    padding: "15px",
                    backgroundColor: isDarkMode ? "rgba(139, 92, 246, 0.1)" : "rgba(139, 92, 246, 0.05)",
                    borderRadius: "8px",
                  }}
                >
                  <p style={{ color: textSecondary, fontSize: "12px", margin: 0 }}>
                    Success Rate
                  </p>
                  <p style={{ color: "#8b5cf6", fontSize: "22px", fontWeight: "700", margin: "8px 0 0 0" }}>
                    94.2%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
