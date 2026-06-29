import { useState } from "react";
import { User, Mail, Phone, Save, TrendingUp, Award, Calendar, Settings, Lock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDarkMode } from "../context/DarkModeContext";

export default function Profile({ setIsLoggedIn }) {
  const { isDarkMode } = useDarkMode();
  const [profileData, setProfileData] = useState({
    name: "Dr. Nimra & Dr. Yumna, Dr. Barakat",
    email: "dr.nimra_barakat_yumna@medical.com",
    phone: "+92 3308686716",
    bio: "Healthcare professional interested in neurological screening"
  });
  const [isEditing, setIsEditing] = useState(false);

  const bgGradient = isDarkMode
    ? "linear-gradient(135deg, #0f1729 0%, rgba(20, 45, 100, 0.8) 100%)"
    : "linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)";

  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";
  const cardBg = isDarkMode ? "rgba(30, 58, 138, 0.5)" : "rgba(255, 255, 255, 0.8)";
  const cardBorder = isDarkMode ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(59, 130, 246, 0.2)";
  const inputBg = isDarkMode ? "rgba(30, 58, 138, 0.5)" : "rgba(59, 130, 246, 0.1)";

  const userStats = [
    { label: "Total Analyses", value: "24", icon: TrendingUp, color: "#3b82f6" },
    { label: "Average Score", value: "89.5%", icon: Award, color: "#10b981" },
    { label: "Member Since", value: "Aug 2025", icon: Calendar, color: "#f59e0b" },
  ];

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div style={{ background: bgGradient, minHeight: "100vh" }}>
      <Navbar isAuthenticated={true} setIsLoggedIn={setIsLoggedIn} />

      <style>{`
        @media (max-width: 768px) {
          .profile-container { padding: 40px 20px !important; }
          .profile-title { font-size: 28px !important; margin-bottom: 25px !important; }
          .profile-header { flex-direction: column !important; text-align: center !important; gap: 20px !important; padding: 25px !important; }
          .profile-avatar { width: 80px !important; height: 80px !important; }
          .profile-stats { grid-template-columns: 1fr !important; gap: 15px !important; }
        }
      `}</style>

      <div className="profile-container" style={{ padding: "clamp(30px, 5vw, 60px) clamp(16px, 3vw, 40px)", maxWidth: "1000px", margin: "0 auto" }}>
        <h1 className="profile-title" style={{ fontSize: "clamp(28px, 6vw, 36px)", fontWeight: "bold", color: textPrimary, marginBottom: "clamp(25px, 5vw, 40px)" }}>
          My Profile
        </h1>

        {/* Profile Header */}
        <div className="profile-header" style={{
          backgroundColor: cardBg,
          border: cardBorder,
          padding: "clamp(20px, 4vw, 40px)",
          borderRadius: "12px",
          marginBottom: "30px",
          display: "flex",
          alignItems: "center",
          gap: "clamp(15px, 3vw, 30px)"
        }}>
          <div style={{
            width: "100px",
            height: "100px",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            fontWeight: "bold",
            color: "#3b82f6"
          }}>
            SA
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", color: textPrimary, margin: "0 0 8px 0" }}>
              {profileData.name}
            </h2>
            <p style={{ color: textSecondary, fontSize: "14px", margin: 0, marginBottom: "12px" }}>
              Healthcare Professional • Voice Analysis Specialist
            </p>
            <div style={{ display: "flex", gap: "20px", fontSize: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: textSecondary }}>
                <Mail size={16} />
                {profileData.email}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: textSecondary }}>
                <Phone size={16} />
                {profileData.phone}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginBottom: "30px"
        }}>
          {userStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} style={{
                backgroundColor: cardBg,
                border: cardBorder,
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: `${stat.color}20`,
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px"
                }}>
                  <Icon size={20} color={stat.color} />
                </div>
                <div style={{ fontSize: "20px", fontWeight: "bold", color: textPrimary, marginBottom: "4px" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "12px", color: textSecondary }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Profile Details */}
        <div style={{
          backgroundColor: cardBg,
          border: cardBorder,
          padding: "40px",
          borderRadius: "12px",
          marginBottom: "20px"
        }}>
          <div style={{ display: "grid", gap: "20px" }}>
            {[
              { label: "Full Name", key: "name", icon: User },
              { label: "Email", key: "email", icon: Mail },
              { label: "Phone", key: "phone", icon: Phone }
            ].map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.key}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", color: textPrimary, marginBottom: "8px", fontWeight: "500" }}>
                    <Icon size={18} color="#3b82f6" />
                    {field.label}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData[field.key]}
                      onChange={(e) => setProfileData({ ...profileData, [field.key]: e.target.value })}
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
                  ) : (
                    <p style={{ color: textSecondary, padding: "12px 0" }}>
                      {profileData[field.key]}
                    </p>
                  )}
                </div>
              );
            })}

            <div>
              <label style={{ display: "block", color: textPrimary, marginBottom: "8px", fontWeight: "500" }}>
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows="4"
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
              ) : (
                <p style={{ color: textSecondary, padding: "12px 0" }}>
                  {profileData.bio}
                </p>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: "15px", marginTop: "40px" }}>
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  style={{
                    flex: 1,
                    backgroundColor: "#10b981",
                    color: "white",
                    border: "none",
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px"
                  }}
                >
                  <Save size={18} />
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{
                    flex: 1,
                    backgroundColor: "#6b7280",
                    color: "white",
                    border: "none",
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  flex: 1,
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Account Settings */}
        <div style={{
          backgroundColor: cardBg,
          border: cardBorder,
          padding: "30px",
          borderRadius: "12px"
        }}>
          <h3 style={{ fontSize: "18px", fontWeight: "bold", color: textPrimary, marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px", margin: "0 0 20px 0" }}>
            <Settings size={20} />
            Account Settings
          </h3>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
            marginBottom: "20px"
          }}>
            <div>
              <label style={{ fontSize: "12px", color: textSecondary, display: "block", marginBottom: "8px", fontWeight: "600" }}>
                Account Type
              </label>
              <p style={{ fontSize: "14px", fontWeight: "600", color: textPrimary, margin: 0 }}>
                Professional
              </p>
            </div>
            <div>
              <label style={{ fontSize: "12px", color: textSecondary, display: "block", marginBottom: "8px", fontWeight: "600" }}>
                Subscription Status
              </label>
              <p style={{ fontSize: "14px", fontWeight: "600", color: "#10b981", margin: 0 }}>
                ✓ Active (Premium)
              </p>
            </div>
            <div>
              <label style={{ fontSize: "12px", color: textSecondary, display: "block", marginBottom: "8px", fontWeight: "600" }}>
                Expires
              </label>
              <p style={{ fontSize: "14px", fontWeight: "600", color: textPrimary, margin: 0 }}>
                Aug 2027
              </p>
            </div>
            <div>
              <label style={{ fontSize: "12px", color: textSecondary, display: "block", marginBottom: "8px", fontWeight: "600" }}>
                Two-Factor Auth
              </label>
              <p style={{ fontSize: "14px", fontWeight: "600", color: "#10b981", margin: 0 }}>
                ✓ Enabled
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <button style={{
              backgroundColor: "transparent",
              color: "#3b82f6",
              border: `1px solid rgba(59, 130, 246, 0.3)`,
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.1)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
              <Lock size={16} />
              Change Password
            </button>
            <button style={{
              backgroundColor: "transparent",
              color: "#ef4444",
              border: `1px solid rgba(239, 68, 68, 0.3)`,
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.2s",
              marginLeft: "auto"
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer isAuthenticated={true} />
    </div>
  );
}
