// Prediction Results Page Component
import React from 'react';
import { Download, Share2, FileText, ArrowRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export const PredictionResults = ({ prediction, isDarkMode, onDownload, onViewReport, onNewAnalysis }) => {
  const textPrimary = isDarkMode ? 'white' : '#0f1729';
  const textSecondary = isDarkMode ? '#93c5fd' : '#475569';
  const cardBg = isDarkMode ? 'rgba(30, 58, 138, 0.5)' : 'rgba(255, 255, 255, 0.8)';

  // Mock progression data
  const progressionData = [
    { month: 'Jan', score: prediction.updrs },
    { month: 'Feb', score: Math.max(0, prediction.updrs - 2) },
    { month: 'Mar', score: prediction.updrs - 1 },
    { month: 'Apr', score: prediction.updrs },
    { month: 'May', score: prediction.updrs + 1 },
  ];

  // Mock voice features
  const voiceFeatures = [
    { name: 'Jitter', value: '1.2%', normal: '< 1.04%', status: prediction.status === 'Healthy' ? 'Normal' : 'Elevated' },
    { name: 'Shimmer', value: '3.4%', normal: '< 3.81%', status: prediction.status === 'Healthy' ? 'Normal' : 'Elevated' },
    { name: 'HNR', value: '21.3 dB', normal: '> 20 dB', status: prediction.status === 'Healthy' ? 'Normal' : 'Low' },
    { name: 'MFCC', value: '42 coefficients', normal: 'Standard', status: 'Analyzed' },
    { name: 'Pitch', value: '145 Hz', normal: 'Variable', status: 'Recorded' },
    { name: 'Confidence', value: `${prediction.confidence}%`, normal: '> 85%', status: prediction.confidence > 85 ? 'High' : 'Standard' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Main Result Card */}
      <div style={{
        backgroundColor: cardBg,
        borderRadius: '12px',
        padding: '32px 24px',
        border: `2px solid ${prediction.statusColor}`,
        textAlign: 'center',
      }}>
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundColor: prediction.statusColor,
          opacity: 0.1,
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div
            style={{
              fontSize: '40px',
              fontWeight: '700',
              color: prediction.statusColor,
            }}
          >
            {prediction.confidence}%
          </div>
        </div>

        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: prediction.statusColor,
          margin: '0 0 12px 0',
        }}>
          {prediction.status}
        </h1>

        <p style={{
          fontSize: '18px',
          color: textSecondary,
          margin: '0 0 24px 0',
        }}>
          {prediction.recommendation}
        </p>

        {/* Key Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          marginTop: '32px',
          paddingTop: '32px',
          borderTop: isDarkMode ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid rgba(59, 130, 246, 0.2)',
        }}>
          <div>
            <p style={{ color: textSecondary, fontSize: '12px', margin: '0 0 6px 0' }}>
              SEVERITY LEVEL
            </p>
            <p style={{ fontSize: '20px', fontWeight: '700', color: textPrimary, margin: 0 }}>
              {prediction.severity || 'N/A'}
            </p>
          </div>
          <div>
            <p style={{ color: textSecondary, fontSize: '12px', margin: '0 0 6px 0' }}>
              UPDRS SCORE
            </p>
            <p style={{ fontSize: '20px', fontWeight: '700', color: textPrimary, margin: 0 }}>
              {prediction.updrs}
            </p>
          </div>
          <div>
            <p style={{ color: textSecondary, fontSize: '12px', margin: '0 0 6px 0' }}>
              RISK LEVEL
            </p>
            <p style={{
              fontSize: '20px',
              fontWeight: '700',
              color: prediction.riskColor,
              margin: 0,
            }}>
              {prediction.risk}
            </p>
          </div>
        </div>
      </div>

      {/* Voice Features */}
      <div style={{
        backgroundColor: cardBg,
        borderRadius: '12px',
        padding: '24px',
        border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(59, 130, 246, 0.2)',
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: textPrimary,
          margin: '0 0 20px 0',
        }}>
          Voice Analysis Features
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {voiceFeatures.map((feature, idx) => (
            <div
              key={idx}
              style={{
                padding: '16px',
                backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
                borderRadius: '8px',
                borderLeft: `4px solid #3b82f6`,
              }}
            >
              <p style={{ fontSize: '12px', color: textSecondary, margin: '0 0 4px 0' }}>
                {feature.name}
              </p>
              <p style={{ fontSize: '16px', fontWeight: '700', color: textPrimary, margin: '0 0 8px 0' }}>
                {feature.value}
              </p>
              <p style={{ fontSize: '11px', color: textSecondary, margin: 0 }}>
                Normal: {feature.normal}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Disease Progression */}
      <div style={{
        backgroundColor: cardBg,
        borderRadius: '12px',
        padding: '24px',
        border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(59, 130, 246, 0.2)',
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: textPrimary,
          margin: '0 0 20px 0',
        }}>
          Disease Progression
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={progressionData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'} />
            <XAxis stroke={textSecondary} />
            <YAxis stroke={textSecondary} />
            <Tooltip contentStyle={{
              backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.8)' : 'rgba(255, 255, 255, 0.9)',
              border: `1px solid #3b82f6`,
              borderRadius: '8px',
            }} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4, fill: '#3b82f6' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
      }}>
        <button
          onClick={onDownload}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#2563eb')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#3b82f6')}
        >
          <Download size={18} />
          Download Report
        </button>

        <button
          onClick={onViewReport}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 20px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#059669')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#10b981')}
        >
          <FileText size={18} />
          View Full Report
        </button>

        <button
          onClick={onNewAnalysis}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 20px',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#4b5563')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#6b7280')}
        >
          <ArrowRight size={18} />
          New Analysis
        </button>
      </div>
    </div>
  );
};
