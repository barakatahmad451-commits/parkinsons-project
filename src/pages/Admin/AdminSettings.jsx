import { useState } from "react";
import { Save, RotateCcw } from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";
import { useDarkMode } from "../../context/DarkModeContext";

export default function AdminSettings({ setIsLoggedIn }) {
  const { isDarkMode } = useDarkMode();
  const [settings, setSettings] = useState({
    appName: "NeuroVoice",
    appVersion: "1.0.0",
    maxUploadSize: "50",
    sessionTimeout: "30",
    enableNotifications: true,
    enableAnalytics: true,
    maintenanceMode: false,
  });

  const [saved, setSaved] = useState(false);

  const bgGradient = isDarkMode
    ? "linear-gradient(135deg, #0f1729 0%, rgba(20, 45, 100, 0.8) 100%)"
    : "linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)";

  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";
  const cardBg = isDarkMode ? "rgba(30, 58, 138, 0.5)" : "rgba(255, 255, 255, 0.8)";
  const cardBorder = isDarkMode ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(59, 130, 246, 0.2)";

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setSettings({
      appName: "NeuroVoice",
      appVersion: "1.0.0",
      maxUploadSize: "50",
      sessionTimeout: "30",
      enableNotifications: true,
      enableAnalytics: true,
      maintenanceMode: false,
    });
  };

  const SettingInput = ({ label, value, onChange, type = "text", placeholder = "" }) => (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", color: textPrimary, fontWeight: "600", marginBottom: "8px", fontSize: "14px" }}>
        {label}
      </label>
      {type === "toggle" ? (
        <button
          onClick={() => onChange(!value)}
          style={{
            width: "50px",
            height: "28px",
            backgroundColor: value ? "#10b981" : "#6b7280",
            border: "none",
            borderRadius: "14px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "24px",
              height: "24px",
              backgroundColor: "white",
              borderRadius: "50%",
              top: "2px",
              left: value ? "24px" : "2px",
              transition: "left 0.3s ease",
            }}
          />
        </button>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(type === "number" ? parseInt(e.target.value) || 0 : e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: "10px 12px",
            backgroundColor: isDarkMode ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)",
            border: `1px solid ${isDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)"}`,
            borderRadius: "8px",
            color: textPrimary,
            fontSize: "14px",
            fontFamily: "inherit",
            boxSizing: "border-box",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#3b82f6";
            e.target.style.backgroundColor = isDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = isDarkMode ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)";
            e.target.style.backgroundColor = isDarkMode ? "rgba(59, 130, 246, 0.05)" : "rgba(59, 130, 246, 0.02)";
          }}
        />
      )}
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: bgGradient }}>
      <AdminSidebar setIsLoggedIn={setIsLoggedIn} />

      <main style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "30px", fontWeight: "800", color: textPrimary, margin: 0, letterSpacing: "-0.02em" }}>
              Settings
            </h1>
            <p style={{ color: textSecondary, marginTop: "6px", fontSize: "15px" }}>
              Configure application settings and preferences
            </p>
          </div>

          {/* Success Message */}
          {saved && (
            <div
              style={{
                backgroundColor: "#10b981",
                color: "white",
                padding: "12px 16px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              ✓ Settings saved successfully!
            </div>
          )}

          {/* Settings Card */}
          <div
            style={{
              background: cardBg,
              border: cardBorder,
              borderRadius: "16px",
              padding: "30px",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Application Settings */}
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: textPrimary, marginBottom: "20px" }}>
              Application Settings
            </h2>

            <SettingInput
              label="Application Name"
              value={settings.appName}
              onChange={(val) => handleChange("appName", val)}
              placeholder="Enter app name"
            />

            <SettingInput
              label="Application Version"
              value={settings.appVersion}
              onChange={(val) => handleChange("appVersion", val)}
              placeholder="e.g., 1.0.0"
            />

            <SettingInput
              label="Max Upload Size (MB)"
              type="number"
              value={settings.maxUploadSize}
              onChange={(val) => handleChange("maxUploadSize", val)}
              placeholder="Enter size in MB"
            />

            <SettingInput
              label="Session Timeout (minutes)"
              type="number"
              value={settings.sessionTimeout}
              onChange={(val) => handleChange("sessionTimeout", val)}
              placeholder="Enter timeout in minutes"
            />

            {/* Feature Settings */}
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: textPrimary,
                marginBottom: "20px",
                marginTop: "30px",
                paddingTop: "20px",
                borderTop: cardBorder,
              }}
            >
              Feature Settings
            </h2>

            <SettingInput
              label="Enable Notifications"
              type="toggle"
              value={settings.enableNotifications}
              onChange={(val) => handleChange("enableNotifications", val)}
            />

            <SettingInput
              label="Enable Analytics"
              type="toggle"
              value={settings.enableAnalytics}
              onChange={(val) => handleChange("enableAnalytics", val)}
            />

            <SettingInput
              label="Maintenance Mode"
              type="toggle"
              value={settings.maintenanceMode}
              onChange={(val) => handleChange("maintenanceMode", val)}
            />

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "30px",
                paddingTop: "20px",
                borderTop: cardBorder,
              }}
            >
              <button
                onClick={handleSave}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
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
                <Save size={18} />
                Save Settings
              </button>

              <button
                onClick={handleReset}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#6b7280",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#4b5563";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#6b7280";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                <RotateCcw size={18} />
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
