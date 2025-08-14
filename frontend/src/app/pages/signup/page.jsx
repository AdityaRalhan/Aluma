"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordStrengthMeter from "@/components/ui/PasswordStrengthMeter"; 

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

      console.log("Backend URL:", "");



      const response = await fetch(
        `${""}/api/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
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
      console.log(error)
      alert("An error occurred during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 px-4">
      <div className="w-full max-w-md rounded-3xl shadow-2xl bg-white/90 backdrop-blur border border-white/40 p-6">
  
        {/* Recommendation Box */}
        <div className="mb-6 p-4 rounded-lg bg-blue-100 border border-blue-300 text-blue-800 text-sm shadow-sm">
          For a more personalized experience, we highly recommend filling out the 'About You' section after signing in. This helps us and our chatbots understand you better and tailor the interactions just for you.
        </div>
  
        <form onSubmit={handleSignup} className="p-2">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Create an Account
          </h2>
  
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
              value={form.name}
              onChange={handleChange}
              required
            />
  
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
              value={form.email}
              onChange={handleChange}
              required
            />
  
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
              value={form.password}
              onChange={handleChange}
              required
            />

            {/* Password Strength Meter */}
            <PasswordStrengthMeter password={form.password} />
          </div>
  
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
  
          <p className="text-center text-sm text-gray-700 mt-5">
            Already a user?{" "}
            <span
              className="text-blue-600 font-semibold hover:underline cursor-pointer"
              onClick={() => router.push("/pages/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
