import { useState } from "react";
import { Link } from "react-router-dom";
import { Mic, Upload, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Screening() {
  const [isDarkMode] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [mode, setMode] = useState(null);

  const bgGradient = isDarkMode
    ? "linear-gradient(135deg, #0f1729 0%, rgba(20, 45, 100, 0.8) 100%)"
    : "linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)";

  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";
  const cardBg = isDarkMode ? "rgba(30, 58, 138, 0.5)" : "rgba(255, 255, 255, 0.8)";
  const cardBorder = isDarkMode ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(59, 130, 246, 0.2)";

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setRecordingComplete(true);
    }, 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file.name);
      setTimeout(() => {
        setRecordingComplete(true);
      }, 500);
    }
  };

  const handleReset = () => {
    setMode(null);
    setRecordingComplete(false);
    setAudioFile(null);
    setIsRecording(false);
  };

  return (
    <div style={{ background: bgGradient, minHeight: "100vh" }}>
      <Navbar />
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        .mode-card { animation: fadeIn 0.5s ease-out; }
        .recording-pulse { animation: pulseGlow 1.5s ease-in-out infinite; }
        @media (max-width: 768px) {
          .screening-container { padding: 40px 20px !important; }
          .screening-title { font-size: 28px !important; }
          .screening-grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important; gap: 20px !important; }
          .screening-card { padding: 25px !important; }
          .screening-icon { width: 50px !important; }
        }
      `}</style>
      
      <div className="screening-container" style={{ padding: "clamp(30px, 5vw, 60px) clamp(16px, 3vw, 40px)", maxWidth: "1000px", margin: "0 auto" }}>
        <h1 className="screening-title" style={{ fontSize: "clamp(28px, 6vw, 36px)", fontWeight: "bold", color: textPrimary, marginBottom: "clamp(25px, 5vw, 40px)", textAlign: "center" }}>
          Voice Screening
        </h1>

        {!mode ? (
          <div className="screening-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(220px, 100%, 300px), 1fr))", gap: "clamp(20px, 4vw, 30px)" }}>
            {/* Record Option */}
            <div
              className="mode-card screening-card"
              onClick={() => setMode("record")}
              style={{
                backgroundColor: cardBg,
                border: cardBorder,
                padding: "clamp(20px, 4vw, 40px)",
                borderRadius: "12px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = isDarkMode 
                  ? "0 20px 40px rgba(59, 130, 246, 0.3)" 
                  : "0 20px 40px rgba(59, 130, 246, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Mic size={64} color="#3b82f6" style={{ margin: "0 auto 20px" }} />
              <h2 style={{ fontSize: "24px", fontWeight: "600", color: textPrimary, marginBottom: "12px" }}>
                Record Your Voice
              </h2>
              <p style={{ color: textSecondary, marginBottom: "20px" }}>
                Record directly from your microphone. Takes about 1-2 minutes.
              </p>
              <div style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "600",
                display: "inline-block"
              }}>
                Get Started
              </div>
            </div>

            {/* Upload Option */}
            <div
              className="mode-card"
              onClick={() => setMode("upload")}
              style={{
                backgroundColor: cardBg,
                border: cardBorder,
                padding: "40px",
                borderRadius: "12px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = isDarkMode 
                  ? "0 20px 40px rgba(59, 130, 246, 0.3)" 
                  : "0 20px 40px rgba(59, 130, 246, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Upload size={64} color="#10b981" style={{ margin: "0 auto 20px" }} />
              <h2 style={{ fontSize: "24px", fontWeight: "600", color: textPrimary, marginBottom: "12px" }}>
                Upload Audio
              </h2>
              <p style={{ color: textSecondary, marginBottom: "20px" }}>
                Upload a pre-recorded audio file from your device.
              </p>
              <div style={{
                backgroundColor: "#10b981",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "600",
                display: "inline-block"
              }}>
                Browse Files
              </div>
            </div>
          </div>
        ) : !recordingComplete ? (
          <div style={{
            backgroundColor: cardBg,
            border: cardBorder,
            padding: "60px 40px",
            borderRadius: "12px",
            textAlign: "center",
            animation: "fadeIn 0.5s ease-out"
          }}>
            {mode === "record" ? (
              <>
                <div className="recording-pulse" style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  backgroundColor: isRecording ? "#ef4444" : "#3b82f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  transition: "all 0.3s ease"
                }}>
                  <Mic size={60} color="white" />
                </div>
                
                <h2 style={{ fontSize: "24px", fontWeight: "600", color: textPrimary, marginBottom: "20px" }}>
                  {isRecording ? "Recording..." : "Ready to Record"}
                </h2>

                <p style={{ color: textSecondary, marginBottom: "40px" }}>
                  {isRecording 
                    ? "Recording your voice... Please speak clearly and naturally." 
                    : "Click the button below to start recording"}
                </p>
                
                <button
                  onClick={handleStartRecording}
                  disabled={isRecording}
                  style={{
                    backgroundColor: isRecording ? "#ef4444" : "#3b82f6",
                    color: "white",
                    padding: "16px 40px",
                    borderRadius: "50px",
                    border: "none",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: isRecording ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: isRecording 
                      ? "0 4px 15px rgba(239, 68, 68, 0.3)"
                      : "0 4px 15px rgba(59, 130, 246, 0.3)",
                    marginRight: "15px"
                  }}
                  onMouseEnter={(e) => {
                    if (!isRecording) {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 8px 25px rgba(59, 130, 246, 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isRecording) {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 15px rgba(59, 130, 246, 0.3)";
                    }
                  }}
                >
                  {isRecording ? "Recording..." : "Start Recording"}
                </button>

                <button
                  onClick={handleReset}
                  style={{
                    backgroundColor: "transparent",
                    color: textSecondary,
                    padding: "16px 40px",
                    borderRadius: "50px",
                    border: `2px solid ${textSecondary}`,
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = isDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)";
                    e.target.style.color = "#3b82f6";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = textSecondary;
                  }}
                >
                  Back
                </button>
              </>
            ) : (
              <>
                <Upload size={80} color="#10b981" style={{ margin: "0 auto 20px" }} />
                
                <h2 style={{ fontSize: "24px", fontWeight: "600", color: textPrimary, marginBottom: "20px" }}>
                  Upload Your Audio File
                </h2>

                <p style={{ color: textSecondary, marginBottom: "40px" }}>
                  Select an MP3, WAV, or OGG file from your device
                </p>
                
                <label style={{
                  display: "inline-block",
                  backgroundColor: "#10b981",
                  color: "white",
                  padding: "16px 40px",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
                  marginRight: "15px"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(16, 185, 129, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(16, 185, 129, 0.3)";
                }}
                >
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                  Choose File
                </label>

                <button
                  onClick={handleReset}
                  style={{
                    backgroundColor: "transparent",
                    color: textSecondary,
                    padding: "16px 40px",
                    borderRadius: "50px",
                    border: `2px solid ${textSecondary}`,
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = isDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)";
                    e.target.style.color = "#3b82f6";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = textSecondary;
                  }}
                >
                  Back
                </button>

                <p style={{ color: textSecondary, marginTop: "30px", fontSize: "12px" }}>
                  Max file size: 25MB
                </p>
              </>
            )}
          </div>
        ) : (
          <div style={{
            backgroundColor: cardBg,
            border: cardBorder,
            padding: "60px 40px",
            borderRadius: "12px",
            textAlign: "center",
            animation: "fadeIn 0.5s ease-out"
          }}>
            <CheckCircle size={100} color="#10b981" style={{ margin: "0 auto 20px" }} />
            <h2 style={{ fontSize: "28px", fontWeight: "600", color: textPrimary, marginBottom: "15px" }}>
              {mode === "record" ? "Recording Complete!" : "File Uploaded Successfully!"}
            </h2>
            {audioFile && (
              <p style={{ color: textSecondary, marginBottom: "10px" }}>
                File: {audioFile}
              </p>
            )}
            <p style={{ color: textSecondary, marginBottom: "40px" }}>
              Your audio has been received. Log in to view your analysis results.
            </p>
            
            <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/login" style={{
                display: "inline-block",
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "14px 35px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 20px rgba(59, 130, 246, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
              >
                Login
              </Link>
              <Link to="/signup" style={{
                display: "inline-block",
                backgroundColor: "#10b981",
                color: "white",
                padding: "14px 35px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 20px rgba(16, 185, 129, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
              >
                Sign Up
              </Link>
              <button
                onClick={handleReset}
                style={{
                  backgroundColor: "transparent",
                  color: "#3b82f6",
                  padding: "14px 35px",
                  borderRadius: "8px",
                  border: "2px solid #3b82f6",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer isAuthenticated={false} />
    </div>
  );
}
