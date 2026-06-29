// Audio Analysis Simulation
import React, { useState, useEffect } from 'react';
import { Spinner } from './LoadingComponents';

const analysisSteps = [
  { id: 1, name: 'Audio Preprocessing', duration: 2 },
  { id: 2, name: 'Noise Removal', duration: 2 },
  { id: 3, name: 'Signal Normalization', duration: 2 },
  { id: 4, name: 'Feature Extraction', duration: 3 },
  { id: 5, name: 'AI Analysis', duration: 3 },
  { id: 6, name: 'Prediction Generation', duration: 2 },
];

export const AudioAnalysisSimulation = ({ isDarkMode, onAnalysisComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStep < analysisSteps.length) {
      const step = analysisSteps[currentStep];
      const stepProgress = (currentStep / analysisSteps.length) * 100;
      setProgress(stepProgress);

      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, step.duration * 1000);

      return () => clearTimeout(timer);
    } else if (currentStep === analysisSteps.length) {
      // Generate mock prediction data
      const mockPrediction = generateMockPrediction();
      setProgress(100);
      setTimeout(() => {
        onAnalysisComplete && onAnalysisComplete(mockPrediction);
      }, 500);
    }
  }, [currentStep, onAnalysisComplete]);

  const generateMockPrediction = () => {
    const predictions = [
      {
        status: 'Healthy',
        confidence: 92,
        severity: 'N/A',
        updrs: 0,
        risk: 'Low',
        riskColor: '#10b981',
        statusColor: '#10b981',
        recommendation: 'No signs of Parkinson\'s disease detected. Continue healthy lifestyle habits.',
      },
      {
        status: 'Early Stage Parkinson\'s',
        confidence: 87,
        severity: 'Early',
        updrs: 15,
        risk: 'Moderate',
        riskColor: '#f59e0b',
        statusColor: '#f59e0b',
        recommendation: 'Early indicators detected. Consult with a neurologist for confirmation and monitoring.',
      },
      {
        status: 'Moderate Parkinson\'s',
        confidence: 89,
        severity: 'Moderate',
        updrs: 35,
        risk: 'High',
        riskColor: '#ef4444',
        statusColor: '#ef4444',
        recommendation: 'Moderate disease progression detected. Schedule regular medical check-ups.',
      },
      {
        status: 'Severe Parkinson\'s',
        confidence: 94,
        severity: 'Severe',
        updrs: 58,
        risk: 'Very High',
        riskColor: '#dc2626',
        statusColor: '#dc2626',
        recommendation: 'Severe disease stage detected. Immediate medical attention required.',
      },
    ];

    return predictions[Math.floor(Math.random() * predictions.length)];
  };

  const textPrimary = isDarkMode ? 'white' : '#0f1729';
  const textSecondary = isDarkMode ? '#93c5fd' : '#475569';
  const cardBg = isDarkMode ? 'rgba(30, 58, 138, 0.5)' : 'rgba(255, 255, 255, 0.8)';

  return (
    <div style={{
      backgroundColor: cardBg,
      borderRadius: '12px',
      padding: '40px 24px',
      border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(59, 130, 246, 0.2)',
      textAlign: 'center',
    }}>
      <div style={{ marginBottom: '40px' }}>
        <Spinner size="lg" color="#3b82f6" />
      </div>

      <h2 style={{
        fontSize: '24px',
        fontWeight: '700',
        color: textPrimary,
        margin: '0 0 8px 0',
      }}>
        Analyzing Audio
      </h2>
      <p style={{ color: textSecondary, fontSize: '14px', margin: '0 0 30px 0' }}>
        Processing voice sample through AI models...
      </p>

      {/* Analysis Steps */}
      <div style={{ marginBottom: '30px', textAlign: 'left' }}>
        {analysisSteps.map((step, idx) => (
          <div
            key={step.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px',
              opacity: idx < currentStep ? 1 : idx === currentStep ? 1 : 0.5,
              transition: 'all 0.3s ease',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: idx < currentStep ? '#10b981' : idx === currentStep ? '#3b82f6' : isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: '700',
                flexShrink: 0,
              }}
            >
              {idx < currentStep ? '✓' : idx === currentStep ? <Spinner size="sm" color="white" /> : idx + 1}
            </div>
            <span style={{
              fontSize: '14px',
              fontWeight: idx === currentStep ? '600' : '500',
              color: idx <= currentStep ? textPrimary : textSecondary,
            }}>
              {step.name}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div style={{
        height: '4px',
        backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div
          style={{
            height: '100%',
            backgroundColor: '#3b82f6',
            width: `${progress}%`,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <p style={{
        fontSize: '11px',
        color: textSecondary,
        margin: '8px 0 0 0',
      }}>
        {Math.round(progress)}% Complete
      </p>
    </div>
  );
};
