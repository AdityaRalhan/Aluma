"use client";

import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const icons = {
  success: <CheckCircle className="h-5 w-5" />,
  error: <XCircle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
};

const alertStyles = {
  success: {
    bg: 'bg-green-100 border-green-400',
    text: 'text-green-700',
    icon: 'text-green-500',
  },
  error: {
    bg: 'bg-red-100 border-red-400',
    text: 'text-red-700',
    icon: 'text-red-500',
  },
  info: {
    bg: 'bg-blue-100 border-blue-400',
    text: 'text-blue-700',
    icon: 'text-blue-500',
  },
};

function CustomAlert({ message, type = 'info', onClose, duration = 5000 }) {
  if (!message) return null;

  const styles = alertStyles[type] || alertStyles.info;

  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  return (
    <div
      className={`fixed top-5 right-5 z-50 max-w-sm w-full p-4 rounded-lg border shadow-lg flex items-center transition-transform transform-gpu animate-in slide-in-from-top-5 ${styles.bg}`}
      role="alert"
    >
      <div className={`flex-shrink-0 ${styles.icon}`}>{icons[type]}</div>
      <div className="ml-3 mr-auto">
        <p className={`text-sm font-medium ${styles.text}`}>{message}</p>
      </div>
      <button type="button" className={`ml-3 -mr-1.5 -my-1.5 p-1.5 rounded-md inline-flex items-center justify-center ${styles.icon} hover:bg-opacity-20`} onClick={onClose} aria-label="Dismiss">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}

export default CustomAlert;

