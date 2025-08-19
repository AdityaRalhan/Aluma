"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import CustomAlert from "@/components/ui/CustomAlert";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlertInfo({ message: "", type: "" });

    try {
      await sendPasswordResetEmail(auth, email);
      setAlertInfo({
        message:
          "If an account exists with that email, a password reset link has been sent.",
        type: "success",
      });
    } catch (error) {
      setAlertInfo({
        message: error.message || "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Forgot Password
        </h2>

        {alertInfo.message && (
          <CustomAlert message={alertInfo.message} type={alertInfo.type} />
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p
          className="text-sm text-blue-600 font-semibold mt-4 text-center hover:underline cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
}
