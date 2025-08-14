"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import CustomAlert from "@/components/ui/CustomAlert";
import { Eye, EyeOff } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlertInfo({ message: "", type: "" });

    try {
      await sendPasswordResetEmail(auth, email);
      setAlertInfo({ message: "Password reset link sent to your email.", type: "success" });
    } catch (err) {
      setAlertInfo({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 px-4">
      <CustomAlert
        message={alertInfo.message}
        type={alertInfo.type}
        onClose={() => setAlertInfo({ message: "", type: "" })}
      />
      <div className="w-full max-w-md rounded-3xl shadow-2xl bg-white/90 backdrop-blur border border-white/40">
        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
            Forgot Password
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your email and we’ll send you reset instructions.
          </p>
  
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
  
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
  
          <p className="text-center text-sm text-gray-700 mt-5">
            Remembered your password?{" "}
            <span
              className="text-blue-600 font-semibold hover:underline cursor-pointer"
              onClick={() => router.push("/pages/login")}
            >
              Back to Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
