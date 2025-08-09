'use client'
import Link from 'next/link';

import { AuroraBackground } from "@/components/ui/aurora-background";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

export default function Home() {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AuroraBackground>
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side: Enhanced Text Content */}
            <div
              className={`flex flex-col gap-8 transition-all duration-1000 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm w-fit">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-300 animate-pulse"></div>
                <span className="text-sm font-medium text-white/90 tracking-wide">PREMIUM WELLNESS</span>
              </div>

              {/* Main Heading with Gradient */}
              <div className="space-y-4">
                <h1 className="text-7xl lg:text-8xl font-black bg-gradient-to-br from-sky-200 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl leading-none tracking-tight">
                  Aluma
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-300 to-blue-500 rounded-full"></div>
              </div>

              {/* Subtitle with enhanced typography */}
              <p className="text-2xl lg:text-3xl font-light text-white/90 leading-relaxed tracking-wide">
                  Nurture your mind with <br />
                  <ContainerTextFlip />
                </p>

              {/* Description */}
              <p className="text-xl text-white/70 font-light leading-relaxed max-w-lg">
                Experience a sanctuary designed for your mental wellness journey. Where serenity meets sophistication.
              </p>

              {/* Enhanced Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 mt-8">
        {/* Primary CTA Button */}
        <button
          onClick={() => router.push("/pages/signup")}
          className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 text-white font-bold text-lg shadow-2xl hover:shadow-cyan-400/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-cyan-400/20"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <span className="relative flex items-center gap-2">
            Begin Your Journey
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>

        {/* Secondary Button */}
        <button
          onClick={() => router.push("/pages/aboutus")}
          className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-slate-700 via-slate-800 to-blue-900 text-white font-semibold text-lg shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-blue-400/30"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-100 group-hover:opacity-20 transition-opacity duration-300"></div>
          <span className="relative flex items-center gap-2">
            <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About Us
          </span>
        </button>
      </div>
            </div>

            {/* Right Side: Luxury Logo Section */}
            <div
              className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="relative group">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30 blur-3xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>

                {/* Main logo container */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-500">
                  {/* Inner gradient ring */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 animate-spin-slow"></div>

                  {/* Logo placeholder with enhanced styling */}
                  <div className="relative z-10 w-48 h-48 lg:w-56 lg:h-56 rounded-full bg-gradient-to-br from-cyan-100/90 to-blue-100/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                    <img
                      src="/aluma_logo.png"
                      alt="Aluma Logo"
                      className="w-32 h-32 lg:w-40 lg:h-40 object-contain filter drop-shadow-lg"
                    />
                  </div>

                  {/* Floating particles */}
                  <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-cyan-300 animate-bounce opacity-60"></div>
                  <div className="absolute bottom-12 left-12 w-1.5 h-1.5 rounded-full bg-blue-300 animate-bounce delay-300 opacity-60"></div>
                  <div className="absolute top-20 left-8 w-1 h-1 rounded-full bg-sky-400 animate-bounce delay-700 opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
     <div className="py-16 bg-pink-50 text-center rounded-3xl mt-20 mx-4 shadow-xl border border-pink-200">
        <h2 className="text-4xl font-bold text-pink-700 mb-4">📚 Explore Mental Wellness Reads</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto text-lg">
          Discover curated book suggestions on mindfulness, stress relief, motivation, emotional intelligence & self-help.
        </p>

        <Link href="/books">
          <div className="inline-block bg-pink-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-pink-700 transition cursor-pointer">
            Browse Books
          </div>
        </Link>
      </div>

    </AuroraBackground>
  );
}
