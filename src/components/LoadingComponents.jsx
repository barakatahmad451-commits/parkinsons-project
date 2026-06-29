// Loading Skeleton Components
import React from 'react';

export const SkeletonLoader = ({ width = '100%', height = '20px', borderRadius = '4px', style = {} }) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: '#e5e7eb',
        background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        ...style,
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export const CardSkeleton = ({ isDarkMode = false }) => {
  return (
    <div style={{
      padding: '16px',
      backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.5)' : 'rgba(255, 255, 255, 0.8)',
      borderRadius: '8px',
      border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(59, 130, 246, 0.2)',
    }}>
      <SkeletonLoader height='20px' style={{ marginBottom: '12px' }} />
      <SkeletonLoader height='40px' style={{ marginBottom: '12px' }} />
      <SkeletonLoader height='16px' width='80%' />
    </div>
  );
};

export const Spinner = ({ size = 'md', color = '#3b82f6' }) => {
  const sizes = {
    sm: '20px',
    md: '40px',
    lg: '60px',
  };

  return (
    <div
      style={{
        width: sizes[size],
        height: sizes[size],
        border: `3px solid rgba(59, 130, 246, 0.2)`,
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    >
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
