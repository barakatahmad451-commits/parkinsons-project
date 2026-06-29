import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Upload, Zap, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDarkMode } from "../context/DarkModeContext";
import { useNotification } from "../context/NotificationContext";
import { VoiceRecorder } from "../components/VoiceRecorder";
import { VoiceUpload } from "../components/VoiceUpload";
import { AudioAnalysisSimulation } from "../components/AudioAnalysisSimulation";
import { PredictionResults } from "../components/PredictionResults";
import { mockPredictionsHistory, generateMockFullReport } from "../utils/mockData";

export default function NewAnalysis({ setIsLoggedIn }) {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  
  const [mode, setMode] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const bgGradient = isDarkMode
    ? "linear-gradient(135deg, #0f1729 0%, rgba(20, 45, 100, 0.8) 100%)"
    : "linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)";

  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";
  const cardBg = isDarkMode ? "rgba(30, 58, 138, 0.5)" : "rgba(255, 255, 255, 0.8)";
  const cardBorder = isDarkMode ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(59, 130, 246, 0.2)";

  const handleRecordingComplete = (audioBlob) => {
    setAudioFile(audioBlob);
    startAnalysis(audioBlob);
  };

  const handleFileSelected = (file) => {
    setAudioFile(file);
    startAnalysis(file);
  };

  const startAnalysis = (file) => {
    setIsAnalyzing(true);
    addNotification("Starting voice analysis...", "info");
  };

  const handleAnalysisComplete = (predictionData) => {
    setPrediction(predictionData);
    setIsAnalyzing(false);
    addNotification(`Analysis complete! Status: ${predictionData.status}`, "success");
    
    // Save to mock history
    const newRecord = {
      id: mockPredictionsHistory.length + 1,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      ...predictionData,
    };
    mockPredictionsHistory.unshift(newRecord);
  };

  const handleDownloadReport = () => {
    const reportContent = generateMockFullReport(prediction);
    const element = document.createElement('a');
    const file = new Blob([reportContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `PD-Analysis-Report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    addNotification("Report downloaded successfully!", "success");
  };

  const handleViewFullReport = () => {
    navigate("/my-reports");
    addNotification("Opening reports...", "info");
  };

  const handleNewAnalysis = () => {
    setMode(null);
    setPrediction(null);
    setAudioFile(null);
    setIsAnalyzing(false);
  };

  const modeOptions = [
    {
      key: "record",
      title: "Record Voice",
      description: "Record your voice directly using your microphone.",
      icon: Mic,
      color: "#3b82f6",
      buttonText: "Start Recording",
    },
    {
      key: "upload",
      title: "Upload Audio",
      description: "Upload a pre-recorded audio file (WAV, MP3, FLAC).",
      icon: Upload,
      color: "#10b981",
      buttonText: "Browse Files",
    },
    {
      key: "quicktest",
      title: "Quick Test",
      description: "Use sample data for instant demonstration.",
      icon: Zap,
      color: "#f59e0b",
      buttonText: "Run Demo",
    },
  ];

  return (
    <div style={{ background: bgGradient, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar isAuthenticated={true} setIsLoggedIn={setIsLoggedIn} />

      <div style={{ flex: 1, padding: "clamp(30px, 5vw, 60px) clamp(16px, 3vw, 40px)", maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
        {/* Header with Back Button */}
        {(mode || prediction) && (
          <button
            onClick={prediction ? handleNewAnalysis : () => setMode(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "transparent",
              border: "none",
              color: "#3b82f6",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              marginBottom: "20px",
              transition: "all 0.3s ease",
              padding: "8px 0",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
            onMouseLeave={(e) => (e.target.style.color = "#3b82f6")}
          >
            <ArrowLeft size={18} />
            {prediction ? "New Analysis" : "Back"}
          </button>
        )}

        {/* Main Content */}
        {!mode && !prediction ? (
          // Mode Selection Screen
          <>
            <h1 style={{ fontSize: "clamp(28px, 6vw, 40px)", fontWeight: "700", color: textPrimary, marginBottom: "12px", textAlign: "center", margin: "0 0 12px 0" }}>
              Start Voice Analysis
            </h1>
            <p style={{ fontSize: "16px", color: textSecondary, textAlign: "center", marginBottom: "40px" }}>
              Choose how you'd like to analyze your voice
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}>
              {modeOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <div
                    key={option.key}
                    onClick={() => setMode(option.key)}
                    style={{
                      backgroundColor: cardBg,
                      border: cardBorder,
                      padding: "32px 24px",
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
                      e.currentTarget.style.borderColor = option.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = cardBorder.split(" ")[0];
                    }}
                  >
                    <IconComponent size={56} color={option.color} style={{ margin: "0 auto 16px", display: "block" }} />
                    <h2 style={{ fontSize: "20px", fontWeight: "700", color: textPrimary, margin: "0 0 8px 0" }}>
                      {option.title}
                    </h2>
                    <p style={{ fontSize: "13px", color: textSecondary, margin: "0 0 20px 0" }}>
                      {option.description}
                    </p>
                    <div style={{
                      display: "inline-block",
                      backgroundColor: option.color,
                      color: "white",
                      padding: "10px 24px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      fontSize: "13px",
                    }}>
                      {option.buttonText}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : isAnalyzing ? (
          // Analysis Screen
          <div>
            <h1 style={{ fontSize: "clamp(28px, 6vw, 40px)", fontWeight: "700", color: textPrimary, marginBottom: "40px", textAlign: "center" }}>
              Analyzing Your Voice
            </h1>
            <AudioAnalysisSimulation
              isDarkMode={isDarkMode}
              onAnalysisComplete={handleAnalysisComplete}
            />
          </div>
        ) : prediction ? (
          // Results Screen
          <div>
            <h1 style={{ fontSize: "clamp(28px, 6vw, 40px)", fontWeight: "700", color: textPrimary, marginBottom: "40px", textAlign: "center" }}>
              Analysis Results
            </h1>
            <PredictionResults
              prediction={prediction}
              isDarkMode={isDarkMode}
              onDownload={handleDownloadReport}
              onViewReport={handleViewFullReport}
              onNewAnalysis={handleNewAnalysis}
            />
          </div>
        ) : (
          // Input Screen
          <div>
            <h1 style={{ fontSize: "clamp(28px, 6vw, 40px)", fontWeight: "700", color: textPrimary, marginBottom: "12px", textAlign: "center" }}>
              {mode === "record" ? "Record Your Voice" : mode === "upload" ? "Upload Audio File" : "Quick Test"}
            </h1>
            <p style={{ fontSize: "16px", color: textSecondary, textAlign: "center", marginBottom: "40px" }}>
              {mode === "record" ? "Record your voice sample for analysis" : mode === "upload" ? "Select an audio file to analyze" : "Running demo analysis..."}
            </p>

            {mode === "record" ? (
              <VoiceRecorder
                onRecordingComplete={handleRecordingComplete}
                isDarkMode={isDarkMode}
                isProcessing={isAnalyzing}
              />
            ) : mode === "upload" ? (
              <VoiceUpload
                onFileSelected={handleFileSelected}
                isDarkMode={isDarkMode}
                isProcessing={isAnalyzing}
              />
            ) : (
              // Quick Test
              <div style={{
                backgroundColor: cardBg,
                borderRadius: "12px",
                padding: "24px",
                border: cardBorder,
                textAlign: "center",
              }}>
                <p style={{ fontSize: "16px", color: textSecondary, marginBottom: "20px" }}>
                  Running quick test with sample data...
                </p>
                <button
                  onClick={() => {
                    startAnalysis(null);
                  }}
                  style={{
                    backgroundColor: "#f59e0b",
                    color: "white",
                    padding: "12px 32px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#d97706")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#f59e0b")}
                >
                  Run Demo Analysis
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
