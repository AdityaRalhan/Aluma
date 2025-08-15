import React from "react";

const PasswordStrengthMeter = ({ password }) => {
  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
  };

  const strength = calculateStrength(password);
  const strengthText = ["Weak", "Good", "Strong", "Very Strong"];
  const strengthColor = ["red", "orange", "darkorange", "green"];

  return (
    <div className="mt-2">
      <div className="h-2 w-full bg-gray-200 rounded">
        <div
          className="h-2 rounded transition-all"
          style={{
            width: `${(strength / 3) * 100}%`,
            backgroundColor: strengthColor[strength],
          }}
        />
      </div>
      {password && (
        <p className="text-sm mt-1" style={{ color: strengthColor[strength] }}>
          Strength: {strengthText[strength]}
        </p>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
