import React from "react";
import { ArrowRight, Brain, Heart, Target, BarChart3, Calendar, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";
import { useState } from "react";


dotenv.config();

export default function SelfAssessmentCard() {
  const router = useRouter();


  const handleNewTest = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      console.alert(
        "No token found. Please log in first. CHECK THE SELFASSESSMENT CARD"
      );
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const userId = decoded._id;
      console.log("this is the userid", userId);

      router.push(`/pages/SelfAssessmentPage?userId=${encodeURIComponent(userId)}`);

    } catch (error) {
      console.error("Error decoding token:", error);
      console.alert(
        "Invalid token format. Please log in again. CHECK THE SELFASSESSMENT CARD"
      );
    }
  };

  const handleViewDashboard = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("No token found. Please log in first.");
      return;
    }
  
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const userId = decoded._id;
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/assessment/${userId}/latest`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Kindly attempt assessment first before viewing the dashboard.");
      }
  
      const assessmentData = await response.json();
      console.log("Fetched assessment data:", assessmentData);

      // Save the fetched data to sessionStorage
      sessionStorage.setItem("assessmentData", JSON.stringify(assessmentData));
  
      // Navigate to the dashboard page
      router.push("/pages/pastAssessmentDashboard");
  
    } catch (error) {
      console.error("Error:", error);
      alert("Kindly attempt assessment first before viewing the dashboard.");
    }
  };
  
  
  

  return (
    <div className="min-h-screen bg-transparent p-6 flex items-center justify-center">
  <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">

    {/* Take New Test Card - White Theme */}
    <div
      onClick={handleNewTest}
      className="bg-white rounded-3xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg border border-rose-200 select-none group z-10"
    >
      <div className="flex items-center justify-between mb-6">
        <span className="text-rose-500 font-medium text-sm tracking-wide uppercase">
          Daily Check-in
        </span>
        <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-rose-700 mb-4 leading-tight">
          Take New Assessment
        </h2>
        <p className="text-rose-600 text-lg leading-relaxed mb-6">
          Reflect on your mental wellness, productivity, and personal growth. Track your daily progress and build mindful habits.
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3 text-rose-700">
            <Brain className="w-5 h-5 text-pink-400" />
            <span className="text-base">Mental clarity</span>
          </div>
          <div className="flex items-center space-x-3 text-rose-700">
            <Heart className="w-5 h-5 text-pink-400" />
            <span className="text-base">Emotional well-being</span>
          </div>
          <div className="flex items-center space-x-3 text-rose-700">
            <Target className="w-5 h-5 text-pink-400" />
            <span className="text-base">Goal achievement</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-medium text-rose-800">2-3 minutes</div>
          <div className="text-sm text-rose-500">Quick assessment</div>
        </div>
        <div className="bg-pink-400 group-hover:bg-rose-500 transition-colors rounded-full p-4 shadow-lg">
          <ArrowRight className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>

    {/* View Dashboard Card - Pink Theme */}
    <div
      onClick={handleViewDashboard}
      className="bg-gradient-to-br from-pink-200 to-rose-300 rounded-3xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg border border-rose-300/50 select-none group z-10"
    >
      <div className="flex items-center justify-between mb-6">
        <span className="text-rose-600 font-medium text-sm tracking-wide uppercase">
          Analytics
        </span>
        <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-rose-700 mb-4 leading-tight">
          View Assessment Dashboard
        </h2>
        <p className="text-rose-600 text-lg leading-relaxed mb-6">
          Review your previous assessment, analyze trends, and gain insights. See how you've grown over time.
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3 text-rose-700">
            <BarChart3 className="w-5 h-5 text-pink-500" />
            <span className="text-base">AI analytics</span>
          </div>
          <div className="flex items-center space-x-3 text-rose-700">
            <TrendingUp className="w-5 h-5 text-pink-500" />
            <span className="text-base">Advice</span>
          </div>
          <div className="flex items-center space-x-3 text-rose-700">
            <Calendar className="w-5 h-5 text-pink-500" />
            <span className="text-base">Reminders</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
          <div className="text-center">
            {/* <div className="text-2xl font-bold text-rose-700 mb-1">{data.totalScore}</div> */}
            <div className="text-xs text-rose-500 tracking-wide">
            Keep growing! </div>
          </div>
        </div>
        <div className="bg-pink-500 group-hover:bg-rose-600 transition-colors rounded-full p-4 shadow-lg">
          <ArrowRight className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>

  </div>
</div>


  );
}