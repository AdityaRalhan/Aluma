"use client";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { FocusCards } from "@/components/ui/focus-cards";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import Music from "../Music/page";
import Cards from "../Cards/page";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import SelfAssessmentCard from "../SelfAssessmentCard/page";
import Navbar from "@/sections/navbar";
import Footer from "@/sections/footer";

export default function Home() {
   useSmoothScroll();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("User");
  const [showPopup, setShowPopup] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const quotes = [
    {
      quote: "The only way to do great work is to love what you do.",
      name: "Steve Jobs",
      title: "Co-founder of Apple",
    },
    {
      quote: "Believe you can and you're halfway there.",
      name: "Theodore Roosevelt",
      title: "26th U.S. President",
    },
    {
      quote:
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      name: "Winston Churchill",
      title: "Former British Prime Minister",
    },
    {
      quote: "Don't watch the clock; do what it does. Keep going.",
      name: "Sam Levenson",
      title: "Writer & Humorist",
    },
    {
      quote: "You miss 100% of the shots you don't take.",
      name: "Wayne Gretzky",
      title: "Professional Hockey Player",
    },
    {
      quote:
        "Hardships often prepare ordinary people for an extraordinary destiny.",
      name: "C.S. Lewis",
      title: "Author",
    },
    {
      quote: "It always seems impossible until it's done.",
      name: "Nelson Mandela",
      title: "Former President of South Africa",
    },
    {
      quote:
        "Keep your face always toward the sunshine—and shadows will fall behind you.",
      name: "Walt Whitman",
      title: "Poet",
    },
  ];

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      try {
        const decoded = JSON.parse(atob(tokenFromStorage.split(".")[1]));
        setUserId(decoded._id);
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
  }, []);

  useEffect(() => {
    const handleFetchName = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user name");
        }
        const data = await response.json();
        console.log("Fetched user name:", data.name);
        setName(data.name || "User");
        return;
      } catch (error) {
        console.error("Error fetching user name:", error);
        return "User";
      }
    };
    handleFetchName();
  });

  useEffect(() => {
    setIsVisible(true);
    // Show popup after a short delay to ensure the component is rendered
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = async () => {
    setShowPopup(false);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userId}`,
        { isFirstLogin: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Error updating isFirstLogin:", err);
    }
  };

  return (
    <AuroraBackground className="w-full">
      <main className="min-h-screen flex flex-col relative" id="top">
        <Navbar />

        {/* Hero Section */}
        <section className="w-full pt-24 pb-16 relative z-10">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Section */}
            <div
              className={`flex flex-col gap-6 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <h1 className="text-6xl lg:text-7xl font-black text-transparent bg-gradient-to-br from-sky-200 via-cyan-300 to-blue-500 bg-clip-text leading-tight">
                Welcome {name.charAt(0).toUpperCase() + name.slice(1)}
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
              <div className="text-2xl text-white/90 font-light leading-relaxed">
                Nurture your mind with <br />
                <ContainerTextFlip />
              </div>
              <button
                id="about-you-button"
                onClick={() => router.push("/pages/AboutYou")}
                className={`group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 
    text-white font-bold text-lg rounded-2xl border-none cursor-pointer transition-all duration-500 ease-out 
    transform hover:-translate-y-3 hover:scale-105 shadow-xl hover:shadow-2xl backdrop-blur-lg w-fit
    before:absolute before:top-[-2px] before:left-[-2px] before:right-[-2px] before:bottom-[-2px] 
    before:bg-gradient-to-r before:from-pink-500 before:via-purple-500 before:to-cyan-500 
    before:rounded-2xl before:z-[-1] before:opacity-0 before:transition-opacity before:duration-300 
    hover:before:opacity-100 before:animate-pulse 
    after:absolute after:top-0 after:left-[-100%] after:w-full after:h-full 
    after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent 
    after:transition-all after:duration-700 hover:after:left-[100%]`}
                style={{
                  boxShadow:
                    "0 10px 30px rgba(59, 130, 246, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span>Tell us more about yourself</span>
                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110">
                    →
                  </span>
                </span>

                {/* Sparkle effects */}
                <div className="absolute top-4 left-6 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                <div className="absolute bottom-4 right-8 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping delay-500"></div>
                <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping delay-1000"></div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </button>

              <p className="text-lg text-white/80 font-light max-w-md leading-relaxed">
                Experience a sanctuary designed for your mental wellness
                journey. Where luxury meets mindfulness.
              </p>
            </div>

            {/* Logo Section */}
            <div
              className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="relative group">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-300/30 to-blue-600/30 blur-3xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>

                {/* Main logo container */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-500">
                  {/* Inner gradient ring */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-300/20 to-blue-600/20 animate-spin-slow"></div>

                  {/* Logo */}
                  <div className="relative z-10 w-48 h-48 lg:w-56 lg:h-56 rounded-full bg-gradient-to-br from-blue-100/90 to-blue-200/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                    <img
                      src="/Aluma_logo.png"
                      alt="Aluma Logo"
                      className="w-32 h-32 lg:w-40 lg:h-40 object-contain filter drop-shadow-lg"
                    />
                  </div>

                  {/* Floating particles */}
                  <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-blue-300 animate-bounce opacity-60"></div>
                  <div className="absolute bottom-12 left-12 w-1.5 h-1.5 rounded-full bg-blue-200 animate-bounce delay-300 opacity-60"></div>
                  <div className="absolute top-20 left-8 w-1 h-1 rounded-full bg-blue-400 animate-bounce delay-700 opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Focus Cards Section */}
        <section id="FocusCards" className="relative z-10 py-16">
          <div className="w-full bg-gradient-to-b from-transparent via-blue-500/10 to-blue-600/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex justify-center items-center w-full">
                <FocusCards />
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-8"></div>

        {/* Self Assessment Section */}
        <section id="SelfAssessment" className="relative z-10 py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            
      
                {/* Clean, Stylish Header */}
                <div className="text-center">
                  <h2 className="text-4xl font-semibold tracking-tight text-slate-800">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500">
                      Self-Assessment
                    </span>{" "}
                    Dashboard
                  </h2>
                  <p className="mt-3 text-white text-base">
                    Quickly reflect on your mental well-being and track your
                    personal growth.
                  </p>
                </div>
        
            
            {/* Card Component */}
            <SelfAssessmentCard />
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-8"></div>

        {/* Music Section */}
        <section className="relative z-10 py-20" id="music">
          {/* Ambient Blurs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <div className="mb-12">
              <h2 className="text-5xl lg:text-6xl font-thin text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text pb-2">
                Feeling
              </h2>
              <h3 className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text mt-2">
                Overwhelmed?
              </h3>
              <div className="flex flex-col items-center mt-8 space-y-2">
                <p className="text-xl text-white/70">
                  Check out these playlists and videos
                </p>
                <p className="text-xl text-transparent bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text font-medium">
                  to help you relax
                </p>
              </div>
            </div>

            {/* Music Player */}
            <div className="mt-12 max-w-5xl mx-auto bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-xl shadow-2xl relative">
              <Music />
            </div>

            {/* Footer Text */}
            <p className="text-white/40 text-sm uppercase mt-12 tracking-widest font-light">
              Let the music heal your soul
            </p>
          </div>

          {/* Floating Notes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 text-white/10 animate-float text-4xl">
              ♪
            </div>
            <div className="absolute top-3/4 right-1/4 text-white/10 animate-float-delayed text-3xl">
              ♫
            </div>
            <div className="absolute top-1/2 right-1/3 text-white/10 animate-float-slow text-4xl">
              ♪
            </div>
            <div className="absolute bottom-1/4 left-1/3 text-white/10 animate-float-delayed text-3xl">
              ♫
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-8"></div>

        {/* Quotes Section */}
        <section id="quotes" className="relative z-10 py-16 overflow-hidden">
          <div className="w-full bg-gradient-to-b from-blue-600/10 via-blue-500/15 to-blue-600/10 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-4">
                  Get going with a motivational quote!
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"></div>
              </div>
              <InfiniteMovingCards items={quotes} speed="slow" />
            </div>
          </div>
        </section>

        {/* Animations */}
        <style jsx global>{`
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes float {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
            }
          }
          @keyframes float-delayed {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-30px) rotate(-180deg);
            }
          }
          @keyframes float-slow {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-15px) rotate(90deg);
            }
          }
          @keyframes bounce-in {
            0% {
              transform: scale(0.3) rotate(-10deg);
              opacity: 0;
            }
            50% {
              transform: scale(1.05) rotate(5deg);
            }
            70% {
              transform: scale(0.9) rotate(-2deg);
            }
            100% {
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float-delayed 8s ease-in-out infinite;
          }
          .animate-float-slow {
            animation: float-slow 10s ease-in-out infinite;
          }
          .animate-bounce-in {
            animation: bounce-in 0.6s ease-out forwards;
          }

          
        `}</style>
      </main>
      <Footer />
    </AuroraBackground>
  );
}
