// In a new file, e.g., frontend/src/components/ui/PasswordStrengthMeter.js

import React, { useMemo } from 'react';

// Helper component for the visual bar and label
const StrengthBarAndLabel = ({ password }) => {
  const strengthLevels = [
    { label: 'Weak', colorClass: 'bg-red-500' },
    { label: 'Weak', colorClass: 'bg-red-500' },
    { label: 'Fair', colorClass: 'bg-orange-500' },
    { label: 'Good', colorClass: 'bg-yellow-500' },
    { label: 'Strong', colorClass: 'bg-green-500' },
  ];

  const strength = useMemo(() => {
    let score = 0;
    if (!password) return -1;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (password.length > 0 && password.length < 8) score = 1;
    return score;
  }, [password]);

  if (strength < 0) return null;

  const currentLevel = strengthLevels[strength];
  const barWidth = `${(strength + 1) * 20}%`;

  return (
    <div className="flex items-center space-x-2">
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className={`h-full rounded-full transition-all duration-300 ${currentLevel?.colorClass}`}
          style={{ width: barWidth }}
        ></div>
      </div>
      <span className="text-sm text-gray-500 w-16 text-right">{currentLevel?.label}</span>
    </div>
  );
};

// Helper component for the criteria checklist
const CriteriaChecklist = ({ password }) => {
  const passwordCriteria = [
    { key: 'uppercase', text: 'Add an uppercase letter', test: (p) => /[A-Z]/.test(p) },
    { key: 'number', text: 'Add a number', test: (p) => /[0-9]/.test(p) },
    { key: 'special', text: 'Add a special character', test: (p) => /[^A-Za-z0-9]/.test(p) },
    { key: 'length', text: 'Be at least 8 characters', test: (p) => p.length >= 8 },
  ];

  const unmetCriteria = useMemo(() => {
    return passwordCriteria.filter(criterion => !criterion.test(password));
  }, [password]);

  if (unmetCriteria.length === 0) return null;

  return (
    <div className="mt-2 text-sm text-gray-600 space-y-1">
      {unmetCriteria.map((criterion) => (
        <div key={criterion.key} className="flex items-center">
          <span className="w-5 h-5 mr-2 text-red-400">✗</span>
          <span>{criterion.text}</span>
        </div>
      ))}
    </div>
  );
};


// Main component that combines both helpers
const PasswordStrengthMeter = ({ password }) => {
  // Don't render anything if there's no password
  if (!password) {
    return null;
  }

  return (
    <div className="w-full mt-2">
      <StrengthBarAndLabel password={password} />
      <CriteriaChecklist password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;