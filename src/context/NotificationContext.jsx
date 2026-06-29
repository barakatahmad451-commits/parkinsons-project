// Notification Toast System
import React, { createContext, useContext, useState } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info', duration = 4000) => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <NotificationContainer notifications={notifications} removeNotification={removeNotification} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

const NotificationContainer = ({ notifications, removeNotification }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '400px',
        pointerEvents: 'none',
      }}
    >
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

const NotificationItem = ({ notification, onClose }) => {
  const getStyles = () => {
    const baseStyle = {
      padding: '16px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      animation: 'slideIn 0.3s ease-out',
      pointerEvents: 'auto',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    };

    switch (notification.type) {
      case 'success':
        return {
          ...baseStyle,
          backgroundColor: '#10b981',
          color: 'white',
          borderLeft: '4px solid #059669',
        };
      case 'error':
        return {
          ...baseStyle,
          backgroundColor: '#ef4444',
          color: 'white',
          borderLeft: '4px solid #dc2626',
        };
      case 'warning':
        return {
          ...baseStyle,
          backgroundColor: '#f59e0b',
          color: 'white',
          borderLeft: '4px solid #d97706',
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: '#3b82f6',
          color: 'white',
          borderLeft: '4px solid #2563eb',
        };
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
      <div
        style={getStyles()}
        onClick={onClose}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(-5px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        {getIcon()}
        <span style={{ flex: 1 }}>{notification.message}</span>
        <X
          size={18}
          style={{ cursor: 'pointer', opacity: 0.7 }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        />
      </div>
    </>
  );
};
