import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Edit2, Plus, Search } from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";
import { useDarkMode } from "../../context/DarkModeContext";

export default function UserManagement({ setIsLoggedIn }) {
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    { id: 1, name: "Ahmed Khan", email: "ahmed@example.com", role: "User", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "Fatima Ali", email: "fatima@example.com", role: "User", status: "Active", joinDate: "2024-02-20" },
    { id: 3, name: "Hassan Raza", email: "hassan@example.com", role: "Admin", status: "Active", joinDate: "2024-01-10" },
    { id: 4, name: "Ayesha Malik", email: "ayesha@example.com", role: "User", status: "Inactive", joinDate: "2024-03-05" },
    { id: 5, name: "Ali Hassan", email: "ali@example.com", role: "User", status: "Active", joinDate: "2024-03-10" },
  ];

  const bgGradient = isDarkMode
    ? "linear-gradient(135deg, #0f1729 0%, rgba(20, 45, 100, 0.8) 100%)"
    : "linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)";

  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";
  const cardBg = isDarkMode ? "rgba(30, 58, 138, 0.5)" : "rgba(255, 255, 255, 0.8)";
  const cardBorder = isDarkMode ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(59, 130, 246, 0.2)";
  const tableRowBg = isDarkMode ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)";

  const getStatusColor = (status) => {
    return status === "Active" ? "#10b981" : "#ef4444";
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: bgGradient }}>
      <AdminSidebar setIsLoggedIn={setIsLoggedIn} />

      <main style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: "700", color: textPrimary, margin: 0 }}>
                User Management
              </h1>
              <p style={{ color: textSecondary, marginTop: "5px" }}>
                Total Users: {users.length}
              </p>
            </div>
            <Link
              to="/admin/users/add"
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
              Add User
            </Link>
          </div>

          {/* Search */}
          <div
            style={{
              background: cardBg,
              border: cardBorder,
              borderRadius: "16px",
              padding: "15px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Search size={18} color={textSecondary} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                backgroundColor: "transparent",
                border: "none",
                color: textPrimary,
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          {/* Table */}
          <div
            style={{
              background: cardBg,
              border: cardBorder,
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
              overflow: "hidden",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: cardBorder }}>
                    <th style={{ padding: "15px", textAlign: "left", color: textSecondary, fontWeight: "600", fontSize: "12px" }}>
                      Name
                    </th>
                    <th style={{ padding: "15px", textAlign: "left", color: textSecondary, fontWeight: "600", fontSize: "12px" }}>
                      Email
                    </th>
                    <th style={{ padding: "15px", textAlign: "left", color: textSecondary, fontWeight: "600", fontSize: "12px" }}>
                      Role
                    </th>
                    <th style={{ padding: "15px", textAlign: "left", color: textSecondary, fontWeight: "600", fontSize: "12px" }}>
                      Status
                    </th>
                    <th style={{ padding: "15px", textAlign: "left", color: textSecondary, fontWeight: "600", fontSize: "12px" }}>
                      Join Date
                    </th>
                    <th style={{ padding: "15px", textAlign: "center", color: textSecondary, fontWeight: "600", fontSize: "12px" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, idx) => (
                    <tr
                      key={user.id}
                      style={{
                        borderBottom: cardBorder,
                        backgroundColor: idx % 2 === 0 ? tableRowBg : "transparent",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = isDarkMode
                          ? "rgba(59, 130, 246, 0.2)"
                          : "rgba(59, 130, 246, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = idx % 2 === 0 ? tableRowBg : "transparent";
                      }}
                    >
                      <td style={{ padding: "15px", color: textPrimary, fontSize: "14px", fontWeight: "500" }}>
                        {user.name}
                      </td>
                      <td style={{ padding: "15px", color: textSecondary, fontSize: "14px" }}>
                        {user.email}
                      </td>
                      <td style={{ padding: "15px", color: textPrimary, fontSize: "14px" }}>
                        <span
                          style={{
                            backgroundColor: user.role === "Admin" ? "#ef4444" : "#3b82f6",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td style={{ padding: "15px" }}>
                        <span
                          style={{
                            color: getStatusColor(user.status),
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td style={{ padding: "15px", color: textSecondary, fontSize: "14px" }}>
                        {user.joinDate}
                      </td>
                      <td style={{ padding: "15px", textAlign: "center" }}>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "#3b82f6",
                            cursor: "pointer",
                            marginRight: "10px",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = "scale(1.2)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = "scale(1)";
                          }}
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "#ef4444",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = "scale(1.2)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = "scale(1)";
                          }}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
