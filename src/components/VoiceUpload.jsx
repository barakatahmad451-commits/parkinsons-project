// Voice Upload Component
import React, { useState, useRef } from 'react';
import { Upload, FileAudio, X } from 'lucide-react';

export const VoiceUpload = ({ onFileSelected, isDarkMode, isProcessing, maxSize = 50 }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const validFormats = ['audio/wav', 'audio/mpeg', 'audio/flac', 'audio/mp3'];
  const validExtensions = ['.wav', '.mp3', '.flac'];

  const validateFile = (file) => {
    setError(null);

    if (!validFormats.includes(file.type) && !validExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
      setError('Invalid file format. Please upload WAV, MP3, or FLAC files only.');
      return false;
    }

    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`);
      return false;
    }

    if (file.size < 100 * 1024) {
      setError('File too small. Please upload an audio file with at least 100KB.');
      return false;
    }

    return true;
  };

  const handleFile = (file) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      if (onFileSelected) {
        onFileSelected(file);
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setError(null);
    fileInputRef.current.value = '';
  };

  const textPrimary = isDarkMode ? 'white' : '#0f1729';
  const textSecondary = isDarkMode ? '#93c5fd' : '#475569';
  const cardBg = isDarkMode ? 'rgba(30, 58, 138, 0.5)' : 'rgba(255, 255, 255, 0.8)';
  const dragBg = dragActive
    ? (isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)')
    : (isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)');

  return (
    <div style={{
      backgroundColor: cardBg,
      borderRadius: '12px',
      padding: '24px',
      border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(59, 130, 246, 0.2)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: textPrimary, margin: 0 }}>
          Upload Audio File
        </h3>
        <p style={{ color: textSecondary, fontSize: '13px', margin: '8px 0 0 0' }}>
          Supported: WAV, MP3, FLAC • Max {maxSize}MB
        </p>
      </div>

      {!selectedFile ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={{
            padding: '40px 20px',
            backgroundColor: dragBg,
            borderRadius: '8px',
            border: `2px dashed ${dragActive ? '#3b82f6' : isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'}`,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginBottom: '20px',
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload
            size={48}
            color={dragActive ? '#3b82f6' : textSecondary}
            style={{ marginBottom: '16px' }}
          />
          <p style={{ fontSize: '16px', fontWeight: '600', color: textPrimary, margin: '0 0 8px 0' }}>
            Drag and drop your audio file here
          </p>
          <p style={{ fontSize: '13px', color: textSecondary, margin: 0 }}>
            or click to browse from your computer
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".wav,.mp3,.flac"
            onChange={handleChange}
            style={{ display: 'none' }}
            disabled={isProcessing}
          />
        </div>
      ) : (
        <div style={{
          padding: '16px',
          backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)',
          borderRadius: '8px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileAudio size={24} color="#3b82f6" />
            <div>
              <p style={{ margin: '0', fontWeight: '600', color: textPrimary, fontSize: '14px' }}>
                {selectedFile.name}
              </p>
              <p style={{ margin: '4px 0 0 0', color: textSecondary, fontSize: '12px' }}>
                {(selectedFile.size / 1024 / 1024).toFixed(2)}MB
              </p>
            </div>
          </div>
          <button
            onClick={clearFile}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} color="#ef4444" />
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{
          padding: '12px',
          backgroundColor: '#fee2e2',
          borderRadius: '8px',
          marginBottom: '20px',
          color: '#991b1b',
          fontSize: '13px',
          fontWeight: '500',
          border: '1px solid #fecaca',
        }}>
          {error}
        </div>
      )}

      {/* Submit Button */}
      {selectedFile && !error && (
        <button
          onClick={() => onFileSelected && onFileSelected(selectedFile)}
          disabled={isProcessing}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            opacity: isProcessing ? 0.6 : 1,
          }}
          onMouseEnter={(e) => !isProcessing && (e.target.style.backgroundColor = '#059669')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#10b981')}
        >
          {isProcessing ? 'Processing...' : 'Analyze Audio'}
        </button>
      )}
    </div>
  );
};
