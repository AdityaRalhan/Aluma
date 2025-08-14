import React from "react";
import { Music, Bot, Book, PencilLine, Brain, Sparkles } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-300 via-blue-500 to-cyan-500">
      <section className="max-w-6xl mx-auto px-6 py-10 text-slate-800 space-y-12">
        {/* Heading */}
        <div className="text-center space-y-6">
          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-peach-100 to-green-100 border border-cyan-200 mb-4 shadow-lg">
            <Sparkles className="w-12 h-12 text-cyan-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-green-500 bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
            At <strong className="text-cyan-600">MindfulSpace</strong>, we believe emotional health is just as important as physical health.
            In today's fast-paced world, it's easy to feel overwhelmed. We're here to change that — with empathy, support, and AI-powered care.
          </p>
        </div>

        {/* Intro */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-green-100 rounded-3xl shadow-lg"></div>
          <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-orange-200">
            <p className="text-slate-700 text-lg md:text-xl leading-relaxed text-center">
              Whether you're feeling stressed, low, or just need a moment of calm — we've built a safe space for you to reflect, recover, and grow.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Music className="w-8 h-8" />}
            title="Listen to Soothing Music"
            points={[
              "Sometimes, all you need is the right sound.",
              " Let our playlists guide you to calm.",
            ]}
            gradient="from-orange-200 to-orange-300"
            iconColor="text-orange-600"
          />
          
          <FeatureCard
            icon={<Bot className="w-8 h-8" />}
            title="Talk to Elena (Empathy Bot)"
            points={[
              "She doesn’t judge.",
              "She just listens — and understands when you’re not okay.",
            ]}
            gradient="from-cyan-200 to-blue-300"
            iconColor="text-cyan-600"
          />
          
          <FeatureCard
            icon={<Bot className="w-8 h-8" />}
            title="Talk to Jess (Advice Bot)"
            points={[
              "Need a gentle push or a helpful tip? ",
              "Jess has your back with practical wisdom.",
            ]}
            gradient="from-green-200 to-emerald-300"
            iconColor="text-green-600"
          />
          
          <FeatureCard
            icon={<PencilLine className="w-8 h-8" />}
            title="Mood Journal"
            points={[
              "Write your heart out.",
              "Weekly summaries and emotional trends",
            ]}
            gradient="from-orange-200 to-peach-300"
            iconColor="text-orange-600"
          />
          
          <FeatureCard
            icon={<Brain className="w-8 h-8" />}
            title="AI Assessment Test"
            points={[
              "Answer a few questions.",
              "Receive meaningful insights and caring suggestions.",
            ]}
            gradient="from-blue-200 to-cyan-300"
            iconColor="text-blue-600"
          />
          
          <FeatureCard
            icon={<Sparkles className="w-8 h-8" />}
            title="Motivation Quote Cards"
            points={[
              "Daily doses of positivity",
              "Simple words that brighten your day",
            ]}
            gradient="from-green-200 to-teal-300"
            iconColor="text-green-600"
          />
        </div>

        {/* Closing section */}
        <div className="text-center mt-16 space-y-6">
          <div className="inline-block p-6 rounded-full bg-gradient-to-r from-orange-100 to-green-100 border border-cyan-200 shadow-lg">
            <div className="text-4xl">💙</div>
          </div>
          <p className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto">
            You're not alone — we're here to help you <span className="text-cyan-600 font-semibold">heal</span>, 
            <span className="text-green-600 font-semibold"> grow</span>, and 
            <span className="text-orange-600 font-semibold"> thrive</span>.
          </p>
        </div>
      </section>
    </div>
  );
}

// Enhanced Feature Card Component
function FeatureCard({ icon, title, points, gradient, iconColor }) {
  return (
    <div className="group relative">
      {/* Glowing background effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-40 rounded-2xl shadow-lg group-hover:opacity-60 transition-all duration-300`}></div>
      
      {/* Card content */}
      <div className="relative bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
        {/* Icon and title */}
        <div className="flex items-center space-x-4 mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} ${iconColor} shadow-md`}>
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        </div>
        
        {/* Points */}
        <ul className="space-y-3">  
          {points.map((point, idx) => (
            <li key={idx} className="flex items-start space-x-3 text-slate-700">
              <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
              <span className="text-sm leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}