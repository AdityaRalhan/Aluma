"use client";
import React, { useState, useRef, useEffect } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import axios from "axios";
import { useRouter } from "next/navigation";
import parse from 'html-react-parser'

const markdown = require('markdown').markdown;
const Elena = () => {
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState(null);
  const synthRef = useRef(null);
  const currentUtteranceRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0); // Ensure scroll starts at top
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
    const token = localStorage.getItem("token");
    const decoded = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded token:", decoded);
    const userId = decoded._id;
    setUserId(userId);
    console.log("User ID from localStorage:", userId);
  }, []);

  const [messages, setMessages] = useState([
    {
      type: "elena",
      content:
        "Hello! I'm Elena, your wellness companion. How can I help you today?",
      timestamp: new Date(),
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getPreferredVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferred = [
      "Google US English",
      "Google UK English Female",
      "Microsoft Zira - English (United States)",
      "Samantha",
      "Victoria",
      "en-US-Wavenet-F",
    ];
    for (const name of preferred) {
      const voice = voices.find((v) => v.name === name);
      if (voice) return voice;
    }
    return (
      voices.find(
        (v) =>
          v.lang.startsWith("en") && v.name.toLowerCase().includes("female")
      ) || voices[0]
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const synth = window.speechSynthesis;
      synth.onvoiceschanged = () => synth.getVoices();
      synth.getVoices(); // preload
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    console.log("Sending message from sendMessage in elena.jsx ", userMessage);

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token") || "";

      // ✅ Save user message
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/conversations`,
        {
          userId,
          sender: "user", // ✅ consistent with schema enum
          message: userMessage.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Ask ElenaAI backend
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ElenaAI`,
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const botMessage = {
        type: "elena",
        content: res.data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // OPTIONAL: Save bot response to conversation as well
      // await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/conversations`, {
      //   userId,
      //   sender: "elena",
      //   message: botMessage.content,
      // });
    } catch (err) {
      console.error("Chat error:", err);
      const errorMessage = {
        type: "elena",
        content:
          "I'm sorry, I'm having trouble connecting right now. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const speakText = (text) => {
    const synth = synthRef.current;
    if (!synth) return;

    if (synth.speaking) synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = getPreferredVoice();
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    synth.speak(utterance);
    currentUtteranceRef.current = utterance;
  };

  return (
    <div className="min-h-screen relative">
      <AuroraBackground className="fixed inset-0 -z-10" />

      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-pink-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-rose-400/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-400/3 to-rose-400/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-5xl h-[85vh] flex flex-col bg-white/[0.08] backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Enhanced Header */}
          <div className="relative p-8 bg-gradient-to-r from-pink-500/15 via-rose-400/12 to-pink-500/15 border-b border-white/10">
            {/* Header Background Pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            ></div>

            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Enhanced Avatar */}
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-pink-400/30 to-rose-400/30 blur-lg opacity-60 animate-pulse"></div>
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-pink-400/20 to-rose-500/20 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-xl">
                    <img
                      src="/elena_logo.png"
                      alt="Elena"
                      className="w-12 h-12 rounded-full object-cover filter drop-shadow-lg"
                    />
                  </div>
                  {/* Status indicator */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white/20 shadow-lg animate-pulse"></div>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold text-white drop-shadow-sm">
                    Elena
                  </h2>
                  <p className="text-white/70 text-sm font-light">
                    Your AI Wellness Companion
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-white/60">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span>Always here to listen</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Status */}
              <div className="flex items-center space-x-4">
                <div className="px-6 py-3 rounded-2xl bg-white/15 backdrop-blur-lg border border-white/30 shadow-xl hover:bg-white/25 hover:border-white/40 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-white/80 hover:text-white transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    <button
                      onClick={() => router.push("/pages/Dashboard")}
                      className="text-white font-semibold hover:text-[#C5DFFF] transition-colors duration-300 cursor-pointer"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Messages Container */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-4 ${
                  message.type === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                {/* Avatar */}
                {message.type === "bot" && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-pink-400/20 to-rose-500/20 backdrop-blur-sm border border-white/15 flex items-center justify-center shadow-lg">
                    <span className="text-white font-semibold text-sm">E</span>
                  </div>
                )}

                {message.type === "user" && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-500/20 backdrop-blur-sm border border-white/15 flex items-center justify-center shadow-lg">
                    <span className="text-white font-semibold text-sm">
                      You
                    </span>
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[75%] ${message.type === "user" ? "" : ""}`}
                >
                  <div
                    className={`relative p-5 rounded-3xl shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                      message.type === "user"
                        ? "bg-gradient-to-br from-blue-500/90 to-cyan-600/90 text-white backdrop-blur-sm border border-blue-400/20"
                        : "bg-white/95 backdrop-blur-sm text-gray-800 border border-white/20"
                    }`}
                  >
                    {/* Message Content */}
                    <div className="flex items-start justify-between space-x-3">
                      <p className="text-sm leading-relaxed font-medium">
                        {parse(markdown.toHTML(message.content))}
                      </p>

                      {/* Enhanced Speaker Icon */}
                      {message.type === "bot" && (
                        <img src="/speaker.png" alt="">
                          <button
                            className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-400/20 hover:bg-pink-400/30 transition-all duration-200 flex items-center justify-center group hover:scale-110"
                            onClick={() => speakText(message.content)}
                            title="Listen to this message"
                          >
                            {/* <svg className="w-4 h-4 text-pink-600 group-hover:text-pink-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.82L4.29 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.29l4.093-3.82a1 1 0 011 .096zM12 6.586l2.707-2.707a1 1 0 011.414 1.414L13.414 8l2.707 2.707a1 1 0 01-1.414 1.414L12 9.414l-2.707 2.707a1 1 0 01-1.414-1.414L10.586 8 7.879 5.293a1 1 0 011.414-1.414L12 6.586z" clipRule="evenodd" />
                          </svg> */}
                          </button>
                        </img>
                      )}
                    </div>

                    {/* Message Tail */}
                    <div
                      className={`absolute top-4 ${
                        message.type === "user"
                          ? "right-0 transform translate-x-2"
                          : "left-0 transform -translate-x-2"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rotate-45 ${
                          message.type === "user"
                            ? "bg-gradient-to-br from-blue-500/90 to-cyan-600/90"
                            : "bg-white/95"
                        }`}
                      ></div>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <p
                    className={`text-xs text-white/50 mt-2 px-4 ${
                      message.type === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {formatTime(new Date(message.timestamp))}
                  </p>
                </div>
              </div>
            ))}

            {/* Enhanced Loading Animation */}
            {isLoading && (
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-pink-400/20 to-rose-500/20 backdrop-blur-sm border border-white/15 flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold text-sm">E</span>
                </div>
                <div className="bg-white/95 backdrop-blur-sm p-5 rounded-3xl shadow-xl border border-white/20 relative">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                  {/* Loading tail */}
                  <div className="absolute top-4 left-0 transform -translate-x-2">
                    <div className="w-3 h-3 rotate-45 bg-white/95"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input Section */}
          <div className="p-8 bg-white/[0.02] border-t border-white/10 backdrop-blur-xl">
            <div className="flex items-end space-x-4">
              {/* Input Container */}
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-2xl blur-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
                <textarea
                  ref={textareaRef}
                  className="relative w-full p-5 bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/30 resize-none shadow-xl transition-all duration-300 focus:scale-[1.01]"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows={1}
                  placeholder="Share what's on your mind... ✨"
                  style={{ minHeight: "60px", maxHeight: "140px" }}
                />

                {/* Input decoration */}
                <div className="absolute top-3 right-4 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
              </div>

              {/* Enhanced Send Button */}
              <button
                className="group relative p-4 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl font-medium hover:from-pink-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[60px] hover:scale-105 active:scale-95"
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

                {isLoading ? (
                  <div className="relative w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <svg
                    className="relative w-6 h-6 transform group-hover:translate-x-0.5 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Enhanced Help Text */}
            <div className="flex items-center justify-center mt-4 space-x-4 text-xs text-white/40">
              <div className="flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-white/10 rounded text-xs">
                  Enter
                </kbd>
                <span>to send</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20"></div>
              <div className="flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-white/10 rounded text-xs">
                  Shift
                </kbd>
                <span>+</span>
                <kbd className="px-2 py-1 bg-white/10 rounded text-xs">
                  Enter
                </kbd>
                <span>for new line</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Elena;
