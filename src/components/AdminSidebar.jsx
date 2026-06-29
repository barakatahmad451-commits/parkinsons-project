import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  Brain,
  Menu,
  X,
} from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

export default function AdminSidebar({ setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 1,
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
      submenu: null,
    },
    {
      id: 2,
      label: "User Management",
      icon: Users,
      submenu: [
        { label: "All Users", path: "/admin/users" },
        { label: "Add User", path: "/admin/users/add" },
        { label: "User Roles", path: "/admin/users/roles" },
      ],
    },
    {
      id: 3,
      label: "Reports",
      icon: FileText,
      submenu: [
        { label: "Analysis Reports", path: "/admin/reports/analysis" },
        { label: "Export Data", path: "/admin/reports/export" },
      ],
    },
    {
      id: 4,
      label: "Documentation",
      icon: BarChart3,
      submenu: [
        { label: "FYP Docs", path: "/admin/docs/fyp" },
        { label: "Templates", path: "/admin/docs/templates" },
        { label: "Guidelines", path: "/admin/docs/guidelines" },
      ],
    },
    {
      id: 5,
      label: "Analytics",
      icon: BarChart3,
      path: "/admin/analytics",
      submenu: null,
    },
    {
      id: 6,
      label: "Content Manager",
      icon: FileText,
      path: "/admin/content",
      submenu: null,
    },
    {
      id: 7,
      label: "Settings",
      icon: Settings,
      path: "/admin/settings",
      submenu: null,
    },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleMenu = (id) => {
    setExpandedMenu(expandedMenu === id ? null : id);
  };

  const bgColor = isDarkMode
    ? "rgba(15, 23, 42, 0.98)"
    : "rgba(240, 249, 255, 0.98)";
  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";
  const borderColor = isDarkMode
    ? "rgba(59, 130, 246, 0.2)"
    : "rgba(59, 130, 246, 0.1)";
  const hoverBg = isDarkMode
    ? "rgba(59, 130, 246, 0.15)"
    : "rgba(59, 130, 246, 0.1)";

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "none",
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 200,
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          padding: "10px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        className="mobile-sidebar-toggle"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <style>{`
        @media (max-width: 768px) {
          .mobile-sidebar-toggle {
            display: block !important;
          }
          .admin-sidebar {
            position: fixed;
            left: ${isOpen ? "0" : "-280px"};
            transition: left 0.3s ease;
          }
        }
      `}</style>

      {/* Sidebar */}
      <aside
        className="admin-sidebar"
        style={{
          width: "280px",
          backgroundColor: bgColor,
          borderRight: `1px solid ${borderColor}`,
          padding: "20px",
          height: "100vh",
          overflowY: "auto",
          position: "sticky",
          top: 0,
          boxShadow: isDarkMode ? "0 10px 30px rgba(2, 8, 23, 0.25)" : "0 10px 30px rgba(59, 130, 246, 0.08)",
        }}
      >
        {/* Logo */}
        <Link
          to="/admin/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "30px",
            textDecoration: "none",
            color: textPrimary,
            fontSize: "18px",
            fontWeight: "700",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Brain size={24} color="white" />
          </div>
          <span>Admin Panel</span>
        </Link>

        {/* Menu Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.path ? (
                <Link
                  to={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    color: textSecondary,
                    textDecoration: "none",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = hoverBg;
                    e.target.style.color = "#3b82f6";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = textSecondary;
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={18} />
                  <span style={{ fontSize: "14px", fontWeight: "500" }}>
                    {item.label}
                  </span>
                </Link>
              ) : (
                <button
                  onClick={() => toggleMenu(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "12px 16px",
                    color: textSecondary,
                    backgroundColor: "transparent",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = hoverBg;
                    e.target.style.color = "#3b82f6";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = textSecondary;
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  {expandedMenu === item.id ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              )}

              {/* Submenu */}
              {item.submenu && expandedMenu === item.id && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    paddingLeft: "20px",
                    marginTop: "5px",
                  }}
                >
                  {item.submenu.map((subitem, idx) => (
                    <Link
                      key={idx}
                      to={subitem.path}
                      style={{
                        padding: "10px 12px",
                        color: textSecondary,
                        textDecoration: "none",
                        borderRadius: "6px",
                        fontSize: "13px",
                        transition: "all 0.3s ease",
                        borderLeft: "2px solid transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = hoverBg;
                        e.target.style.color = "#3b82f6";
                        e.target.style.borderLeftColor = "#3b82f6";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = textSecondary;
                        e.target.style.borderLeftColor = "transparent";
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "30px",
            padding: "12px 16px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#dc2626";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#ef4444";
            e.target.style.transform = "translateY(0)";
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>
    </>
  );
}
