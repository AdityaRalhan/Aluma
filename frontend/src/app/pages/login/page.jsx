"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import CustomAlert from "@/components/ui/CustomAlert";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebaseConfig";
  

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAlertInfo({
          message: "Login successful! Redirecting...",
          type: "success",
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/pages/Dashboard"); // unified redirect
      } else {
        setAlertInfo({
          message: data.error || "Login failed",
          type: "error",
        });
      }
    } catch (error) {
      setAlertInfo({
        message: "An error occurred during login. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User Info:", result.user);

      // Save user info if needed
      localStorage.setItem("user", JSON.stringify(result.user));

      // Redirect after login
      router.push("/pages/Dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setAlertInfo({ message: "Google sign-in failed", type: "error" });
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
        <form onSubmit={handleLogin} className="p-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Welcome Back
          </h2>

          <button
              type="button"
              onClick={handleGoogleSignIn}
              className="bg-blue-500 text-white  py-3  w-full rounded-3xl px-2 mb-6 font-semibold transition-all duration-200 hover:bg-blue-600 flex items-center justify-center gap-2"
            >
              Sign in with Google
            </button>


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

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 pr-10"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            
            <div className="text-right">
              <span
                className="text-sm text-blue-600 font-semibold hover:underline cursor-pointer"
                onClick={() => router.push("/forgot-password")}
              >
                Forgot password?
              </span>
            </div>
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
