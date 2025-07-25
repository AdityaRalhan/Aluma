"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import zxcvbn from "zxcvbn";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState({ warning: "", suggestions: [] });

  const handleChange = (e) => {
      const { name, value } = e.target;
      const updatedForm = { ...form, [name]: value };
      setForm(updatedForm);
  
      if (name === "password") {
        const result = zxcvbn(value);
        setStrength(result.score);
        setFeedback(result.feedback); 
      }
    };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
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
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 px-4">
      <div className="w-full max-w-md rounded-3xl shadow-2xl bg-white/90 backdrop-blur border border-white/40">
        <form onSubmit={handleLogin} className="p-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Welcome Back
          </h2>
  
          <div className="space-y-4">
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
            {form.password && (
          <div className="mt-2">
            <div className="h-2 bg-gray-200 rounded">
              <div
                className={`h-full rounded transition-all duration-300 ${
                  strength === 0 ? 'w-1/5 bg-red-500' :
                  strength === 1 ? 'w-2/5 bg-orange-500' :
                  strength === 2 ? 'w-3/5 bg-yellow-500' :
                  strength === 3 ? 'w-4/5 bg-blue-500' :
                  'w-full bg-green-500'
                }`}
              />
            </div>
            <p className={`text-sm mt-1 ${
              strength < 2 ? 'text-red-600' :
              strength < 4 ? 'text-yellow-600' :
              'text-green-600'
            }`}>
              Strength: {['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][strength]}
            </p>
          </div>
        )}
        {form.password && feedback && (
        <div className="mt-1 text-sm text-gray-700">
          {feedback.warning && (
            <p className="text-red-600 font-medium">⚠ {feedback.warning}</p>
          )}
          {feedback.suggestions.length > 0 && (
            <ul className="list-disc list-inside text-gray-600 mt-1">
              {feedback.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          )}
          </div>
        )}
          </div>
  
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
  
          <p className="text-center text-sm text-gray-700 mt-5">
            New user?{" "}
            <span
              className="text-blue-600 font-semibold hover:underline cursor-pointer"
              onClick={() => router.push("/pages/signup")}
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
  
}

export default Login;
