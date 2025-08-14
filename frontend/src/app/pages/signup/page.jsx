"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordStrengthMeter from "@/components/ui/PasswordStrengthMeter";
import { Eye, EyeOff } from "lucide-react";
import CustomAlert from "@/components/ui/CustomAlert";
import { signIn, getSession } from "next-auth/react";
// import { FcGoogle } from "react-icons/fc";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);
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
        setAlertInfo({ message: data.error || "Signup failed", type: "error" });
      }
    } catch (error) {
      console.log(error);
      setAlertInfo({ message: "An error occurred during signup. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const result = await signIn("google", { callbackUrl: "/pages/Dashboard", 
            url: "/api/auth/[...nextauth]/route.js"
      });
      if (result?.error) {
        setAlertInfo({ message: "Google signup failed.", type: "error" });
        setLoading(false);
        return;
      }

      const session = await getSession();
      if (!session?.user) {
        setAlertInfo({ message: "Failed to retrieve Google user info.", type: "error" });
        setLoading(false);
        return;
      }

      const googleUser = {
        name: session.user.name || "",
        email: session.user.email,
        password: "", // No password needed for Google
        description: "",
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(googleUser),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/pages/Dashboard");
      } else {
        setAlertInfo({ message: data.error || "Signup failed", type: "error" });
      }
    } catch (error) {
      console.log(error);
      setAlertInfo({ message: "An error occurred. Please try again.", type: "error" });
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
      <div className="w-full max-w-md rounded-3xl shadow-2xl bg-white/90 backdrop-blur border border-white/40 p-6">

        {/* Recommendation Box */}
        <div className="mb-6 p-4 rounded-lg bg-blue-100 border border-blue-300 text-blue-800 text-sm shadow-sm">
          For a more personalized experience, we highly recommend filling out the 'About You' section after signing in. This helps us and our chatbots understand you better and tailor the interactions just for you.
        </div>

        {/* Google Signup Button */}
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold shadow transition-all duration-200 disabled:opacity-50 mb-4"
          disabled={loading}
        >
          {/* <FcGoogle className="h-6 w-6" /> */}
          {loading ? "Signing up..." : "Sign up with Google"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Original Email/Password Signup Form */}
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

            {/* Only show password field for email signup */}
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

            {/* Only show password strength meter for email signup */}
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
