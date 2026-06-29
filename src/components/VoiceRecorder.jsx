// Voice Recording Component
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Pause, Play, Trash2, Check } from 'lucide-react';

export const VoiceRecorder = ({ onRecordingComplete, isDarkMode, isProcessing }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, isPaused]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstart = () => {
        setIsRecording(true);
        setRecordingTime(0);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setRecordedBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
    } catch (error) {
      alert('Microphone access denied or not available');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      setRecordingTime(0);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  const clearRecording = () => {
    setRecordedBlob(null);
    setRecordingTime(0);
  };

  const handleSubmit = () => {
    if (recordedBlob && onRecordingComplete) {
      onRecordingComplete(recordedBlob);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const textPrimary = isDarkMode ? 'white' : '#0f1729';
  const textSecondary = isDarkMode ? '#93c5fd' : '#475569';
  const cardBg = isDarkMode ? 'rgba(30, 58, 138, 0.5)' : 'rgba(255, 255, 255, 0.8)';

  return (
    <div style={{
      backgroundColor: cardBg,
      borderRadius: '12px',
      padding: '24px',
      border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(59, 130, 246, 0.2)',
    }}>
      {!recordedBlob ? (
        <>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: textPrimary, margin: 0 }}>
              Record Your Voice
            </h3>
            <p style={{ color: textSecondary, fontSize: '13px', margin: '8px 0 0 0' }}>
              Click the microphone to start recording (60 seconds max)
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '20px',
            padding: '20px',
            backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
            borderRadius: '8px',
          }}>
            {/* Recording Timer */}
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              color: isRecording ? '#ef4444' : textPrimary,
              fontFamily: 'monospace',
              animation: isRecording ? 'pulse 1s infinite' : 'none',
            }}>
              {formatTime(recordingTime)}
            </div>

            {/* Waveform Animation */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '40px' }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '4px',
                    height: isRecording ? `${20 + Math.random() * 20}px` : '4px',
                    backgroundColor: isRecording ? '#3b82f6' : 'rgba(59, 130, 246, 0.3)',
                    borderRadius: '2px',
                    animation: isRecording ? 'wave 0.5s ease-in-out infinite' : 'none',
                    animationDelay: `${i * 0.1}s`,
                    transition: 'all 0.1s ease',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Recording Status */}
          {isRecording && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
              padding: '10px',
              backgroundColor: '#fef3c7',
              borderRadius: '6px',
              color: '#92400e',
              fontSize: '13px',
              fontWeight: '600',
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#ef4444',
                borderRadius: '50%',
                animation: 'blink 0.8s infinite',
              }} />
              {isPaused ? 'Recording Paused' : 'Recording in Progress'}
            </div>
          )}

          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.7; }
            }
            @keyframes wave {
              0%, 100% { height: 4px; }
              50% { height: 20px; }
            }
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}</style>

          {/* Control Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
          }}>
            {!isRecording ? (
              <button
                onClick={startRecording}
                disabled={isProcessing}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  opacity: isProcessing ? 0.6 : 1,
                }}
                onMouseEnter={(e) => !isProcessing && (e.target.style.backgroundColor = '#2563eb')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#3b82f6')}
              >
                <Mic size={18} />
                Start Recording
              </button>
            ) : (
              <>
                <button
                  onClick={stopRecording}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#dc2626')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#ef4444')}
                >
                  <Square size={18} />
                  Stop
                </button>
                {!isPaused ? (
                  <button
                    onClick={pauseRecording}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      backgroundColor: '#f59e0b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#d97706')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#f59e0b')}
                  >
                    <Pause size={18} />
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={resumeRecording}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#059669')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#10b981')}
                  >
                    <Play size={18} />
                    Resume
                  </button>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: textPrimary, margin: 0 }}>
              Recording Complete
            </h3>
            <p style={{ color: textSecondary, fontSize: '13px', margin: '8px 0 0 0' }}>
              Duration: {formatTime(recordingTime)} • Review and submit
            </p>
          </div>

          {/* Playback Preview */}
          <audio
            src={URL.createObjectURL(recordedBlob)}
            controls
            style={{
              width: '100%',
              marginBottom: '20px',
              borderRadius: '6px',
            }}
          />

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
          }}>
            <button
              onClick={clearRecording}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#4b5563')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#6b7280')}
            >
              <Trash2 size={18} />
              Re-record
            </button>
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                opacity: isProcessing ? 0.6 : 1,
              }}
              onMouseEnter={(e) => !isProcessing && (e.target.style.backgroundColor = '#059669')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#10b981')}
            >
              <Check size={18} />
              Analyze Voice
            </button>
          </div>
        </>
      )}
    </div>
  );
};
