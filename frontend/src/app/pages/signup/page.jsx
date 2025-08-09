"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordStrengthMeter from "@/components/ui/PasswordStrengthMeter";
import Navbar from "@/sections/navbar";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/pages/Dashboard");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 px-4 pt-28 pb-10">
        <div className="max-w-md mx-auto rounded-3xl shadow-2xl bg-white/95 backdrop-blur border border-white/40 p-8">
          {/* Header */}
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            Create Your Account
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Join <span className="text-blue-600 font-medium">Aluma</span> today
            and unlock a personalized experience.
          </p>

          {/* Recommendation Box */}
          <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-sm shadow-sm">
            For the best experience, fill out the "About You" section after signing in.
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-400 shadow-sm"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-400 shadow-sm"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-400 shadow-sm"
                value={form.password}
                onChange={handleChange}
                required
              />
              <PasswordStrengthMeter password={form.password} />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold text-lg transition-all duration-200 disabled:opacity-50 shadow-md"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 border-t border-gray-200"></div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-700 mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-600 font-semibold hover:underline cursor-pointer"
              onClick={() => router.push("/pages/login")}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
