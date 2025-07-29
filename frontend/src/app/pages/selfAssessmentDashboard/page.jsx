import React, { useState, useEffect } from "react";
import {
  Brain,
  Target,
  Heart,
  TrendingUp,
  Lightbulb,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AssessmentDashboard({ result }) {
    const [name, setName] = useState("");
  const { stress, focus, positivity } = result.categoryScores;
  const { analysis, advice, importantReminders } = result.aiAnalysis || {};
  const router = useRouter();

  // Calculate percentages for visual representation
  const stressPercentage = (stress / 10) * 100;
  const focusPercentage = (focus / 10) * 100;
  const positivityPercentage = (positivity / 10) * 100;
  const totalPercentage = (result.totalScore / 50) * 100;

  const CircularProgress = ({ percentage, color, size = 180 }) => {
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    useEffect(() => {
        const fetchUserData = async () => {
          const token = localStorage.getItem("token");
          if (token) {
            try {
              const decoded = JSON.parse(atob(token.split(".")[1]));
      
              const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
              const data = await res.json();
              setName(data.name || "User");

              console.log("User Data:", data);
              
      
            } catch (error) {
              console.error("Error fetching user data:", error);
            }
          }
        };
      
        fetchUserData();
      }, []);
      

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E8F2FF"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-800">
            {result.totalScore}/50
          </span>
          <span className="text-xs text-slate-500 mt-1">goals achieved</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Hey {name}!</h1>
              <p className="text-slate-600">
                Here's the complete overview of the self-assessment
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="pl-6 pr-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-100 w-64 shadow-sm hover:cursor-pointer hover:scale-105 hover:shadow-md hover:bg-white/90 transition-all duration-200 ease-in-out" onClick={() => router.push("/pages/Dashboard")}>
                back to dashboard
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-1">
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-4 h-full shadow-lg">
              <div className="flex flex-col space-y-6">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-slate-900 font-bold text-sm">{name.charAt(0)}</span>
                </div>
                <div className="w-10 h-10  rounded-xl flex items-center justify-center text-white ">
                  A
                </div>
                <div className="w-10 h-10 hover:bg-slate-700 rounded-xl flex items-center justify-center cursor-pointer transition-all text-white">
                  L
                </div>
                <div className="w-10 h-10 hover:bg-slate-700 rounded-xl flex items-center justify-center cursor-pointer transition-all text-white">
                  U
                </div>
                <div className="w-10 h-10 hover:bg-slate-700 rounded-xl flex items-center justify-center cursor-pointer transition-all text-white">
                  M
                </div>
                <div className="w-10 h-10 hover:bg-slate-700 rounded-xl flex items-center justify-center cursor-pointer transition-all text-white">
                  A
                </div>
              </div>
            </div>
          </div>

          {/* Main Left Content - AI Features */}
          <div className="col-span-6">
            {/* AI Insights Section - Now Prominent */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-6 shadow-lg border border-blue-100/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  AI Insights
                </h2>
                
              </div>

              <div className="space-y-6">
                {analysis && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-l-4 border-blue-400 shadow-sm">
                    <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <Brain className="w-5 h-5 mr-2" />
                      Analysis
                    </h3>
                    <p className="text-blue-700 text-sm leading-relaxed">
                      {analysis}
                    </p>
                  </div>
                )}

                {advice && advice.length > 0 && (
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border-l-4 border-emerald-400 shadow-sm">
                    <h3 className="font-semibold text-emerald-800 mb-4 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2" />
                      Personalized Recommendations
                    </h3>
                    <div className="space-y-4">
                      {advice.slice(0, 3).map((point, idx) => (
                        <div key={idx} className="flex items-start space-x-4">
                          <div className="w-7 h-7 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-lg">
                            {idx + 1}
                          </div>
                          <p className="text-emerald-800 text-sm leading-relaxed pt-1">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {importantReminders && importantReminders.length > 0 && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border-l-4 border-amber-400 shadow-sm">
                    <h3 className="font-semibold text-amber-800 mb-4 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Important Reminders
                    </h3>
                    <div className="space-y-3">
                      {importantReminders.map((reminder, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0 mt-3"></div>
                          <p className="text-amber-800 text-sm leading-relaxed">
                            {reminder}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Content - Visual Stats & Programs */}
          <div className="col-span-5 space-y-6">
            {/* Main Progress Circle */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                  Overall Progress
                </h2>
                <div className="flex items-center space-x-2 text-slate-600">
                  
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <CircularProgress
                  percentage={totalPercentage}
                  color="#4D86E0"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-violet-100 to-purple-100 rounded-lg flex items-center justify-center border border-violet-200/50">
                    <TrendingUp className="w-4 h-4 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs">Questions</p>
                    <p className="font-semibold text-slate-800 text-sm">
                      10
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center border border-blue-200/50">
                    <Brain className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs">Mental Health</p>
                    <p className="font-semibold text-slate-800 text-sm">
                      {Math.round((stress + focus + positivity) / 3)}/10
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center border border-emerald-200/50">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs">Progress</p>
                    <p className="font-semibold text-slate-800 text-sm">
                      {Math.round(totalPercentage)}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-violet-100 to-purple-100 rounded-lg flex items-center justify-center border border-violet-200/50">
                    <Heart className="w-4 h-4 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs">Wellness</p>
                    <p className="font-semibold text-slate-800 text-sm">
                      {positivity}/10
                    </p>
                  </div>
                </div>
              </div>
            </div>
           
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-blue-100/50">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                Quick Overview
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100/50 shadow-sm">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg shadow-blue-500/30">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs text-blue-600 uppercase tracking-wide font-medium">
                    Focus
                  </p>
                  <p className="text-lg font-bold text-blue-800">{focus}/10</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100/50 shadow-sm">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg shadow-amber-500/30">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs text-amber-600 uppercase tracking-wide font-medium">
                    Stress
                  </p>
                  <p className="text-lg font-bold text-amber-800">
                    {stress}/10
                  </p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100/50 shadow-sm">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg shadow-emerald-500/30">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs text-emerald-600 uppercase tracking-wide font-medium">
                    Positivity
                  </p>
                  <p className="text-lg font-bold text-emerald-800">
                    {positivity}/10
                  </p>
                </div>
              </div>
            </div>

            {/* <Calender /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
