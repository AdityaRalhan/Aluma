"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  Heart,
  Music,
  BookOpen,
  Phone,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Mail,
  Briefcase,
  Calendar,
  Activity,
  Pill,
} from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AboutYouPage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [valueTemp, setValueTemp] = useState({});

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    occupation: "",
    age: "",
    gender: "",
    Physical_Activity: "",
    Current_Medication: "",
    description: [],
    trustedContacts: [],
    createdAt: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    const fetchUser = async () => {
      console.log("Fetching user with token:", token);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setUser(data);

        setForm({
          email: data.email || "",
          password: "", // Don't prefill
          name: data.name || "",
          occupation: data.occupation || "",
          age: data.age || "",
          gender: data.gender || "",
          Physical_Activity: data.Physical_Activity || "",
          Current_Medication: data.Current_Medication || "",
          description: data.description || [],
          trustedContacts: data.trustedContacts || [],
          createdAt: data.createdAt || "",
        });
        setValueTemp({
          description: (data.description || []).join(", "),
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    console.log("🔍 handleSave function called!"); // Add this to confirm function is called

    const token = localStorage.getItem("token") || "";
    console.log("🔑 Token:", token ? "Token exists" : "No token found");

    console.log("📋 Current form state:", form);
    console.log("📝 ValueTemp:", valueTemp);

    const updatedForm = {
      ...form,
      description: valueTemp.description
        ? valueTemp.description
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
            .join(", ")
        : "",
    };

    console.log("📤 About to send this data:", updatedForm);
    console.log(
      "🌐 API URL:",
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/update`
    );

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedForm),
        }
      );

      console.log("📡 Response status:", response.status);
      console.log("📡 Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Server error:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const responseData = await response.json();
      console.log("✅ Update successful:", responseData);

      setForm(updatedForm);
      setEditing(false);
      console.log("✅ State updated successfully");
    } catch (err) {
      console.error("❌ Update failed:", err);
      // Add user-visible error handling
      alert(`Update failed: ${err.message}`);
    }
  };

  const updateContact = (index, field, value) => {
    const updated = [...form.trustedContacts];
    updated[index][field] = value;
    setForm({ ...form, trustedContacts: updated });
  };

  const removeContact = (index) => {
    const updated = [...form.trustedContacts];
    updated.splice(index, 1);
    setForm({ ...form, trustedContacts: updated });
  };

  const getFieldIcon = (key) => {
    switch (key) {
      case "email":
        return <Mail className="w-5 h-5" />;
      case "name":
        return <User className="w-5 h-5" />;
      case "occupation":
        return <Briefcase className="w-5 h-5" />;
      case "age":
        return <Calendar className="w-5 h-5" />;
      case "Physical_Activity":
        return <Activity className="w-5 h-5" />;
      case "Current_Medication":
        return <Pill className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getFieldDescription = (key) => {
    switch (key) {
      case "Physical_Activity":
        return "Types of physical activities you enjoy";
      case "Current_Medication":
        return "Current medications (for emergency purposes)";
      default:
        return `Enter your ${key.replace(/_/g, " ").toLowerCase()}`;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1D5DCB] via-[#2563EB] to-[#4D86E0]">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-20 h-20 bg-white/15 rounded-full animate-pulse"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
              <div
                className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#7AA7F2] rounded-full animate-spin mx-auto"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
            <p className="text-white text-xl font-medium">
              Loading your profile...
            </p>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
              <div
                className="w-2 h-2 bg-white/70 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="w-2 h-2 bg-white/40 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1D5DCB] via-[#2563EB] to-[#4D86E0]">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-20 h-20 bg-white/15 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-40 w-28 h-28 bg-white/8 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-60 left-1/2 w-16 h-16 bg-white/12 rounded-full animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Gradient Orbs */}
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Animated Lines */}
        <div className="absolute inset-0 opacity-20">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,20 Q25,10 50,20 T100,15"
              stroke="white"
              strokeWidth="0.2"
              fill="none"
              opacity="0.3"
            >
              <animate
                attributeName="d"
                values="M0,20 Q25,10 50,20 T100,15;M0,25 Q25,5 50,25 T100,20;M0,20 Q25,10 50,20 T100,15"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M0,80 Q25,70 50,80 T100,75"
              stroke="white"
              strokeWidth="0.15"
              fill="none"
              opacity="0.2"
            >
              <animate
                attributeName="d"
                values="M0,80 Q25,70 50,80 T100,75;M0,85 Q25,65 50,85 T100,80;M0,80 Q25,70 50,80 T100,75"
                dur="10s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-lg rounded-full mb-6 border border-white/30 shadow-2xl">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-[#C5DFFF] to-[#7AA7F2] bg-clip-text text-transparent">
                {form.name ? form.name.split(" ")[0] : "there"}
              </span>
            </h1>
            <p className="text-white/80 text-lg mb-8">
              Manage your personal information and preferences
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  if (editing) {
                    handleSave(); // Call handleSave when in editing mode
                  } else {
                    setEditing(true); // Switch to edit mode when not editing
                  }
                }}
                className={cn(
                  "inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl",
                  editing
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    : "bg-gradient-to-r from-[#134BB3] via-[#1D5DCB] to-[#4D86E0] hover:from-[#4D86E0] hover:to-[#7AA7F2] text-white"
                )}
              >
                {editing ? (
                  <Save className="w-5 h-5" />
                ) : (
                  <Edit3 className="w-5 h-5" />
                )}
                {editing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
          </div>

          {/* Profile Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Basic Information Card */}
            <div className="lg:col-span-2 backdrop-blur-lg bg-white/15 border border-white/30 rounded-3xl p-8 shadow-2xl hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-[#7AA7F2] to-[#C5DFFF] rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Basic Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(form).map(([key, value]) => {
                  if (
                    ["trustedContacts", "password", "createdAt"].includes(key)
                  )
                    return null;
                  const isReadOnly = key === "createdAt";

                  return (
                    <div key={key} className="space-y-3">
                      <label className="flex items-center gap-3 text-[#C5DFFF] font-medium text-sm uppercase tracking-wide">
                        {getFieldIcon(key)}
                        {key.replace(/_/g, " ")}
                      </label>
                      <input
                        type={
                          key === "password"
                            ? "password"
                            : key === "age"
                            ? "number"
                            : "text"
                        }
                        name={key}
                        disabled={!editing || isReadOnly}
                        value={value}
                        onChange={handleChange}
                        placeholder={getFieldDescription(key)}
                        className={cn(
                          "w-full rounded-2xl px-6 py-4 bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#7AA7F2] focus:border-[#4D86E0] transition-all duration-300",
                          (!editing || isReadOnly) &&
                            "opacity-60 cursor-not-allowed",
                          editing && "hover:bg-white/15 focus:bg-white/20"
                        )}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="space-y-6">
              <div className="backdrop-blur-lg bg-white/15 border border-white/30 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  Profile Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Trusted Contacts</span>
                    <span className="text-white font-bold text-xl">
                      {form.trustedContacts.length}
                    </span>
                  </div>
                </div>
              </div>

              {form.createdAt && (
                <div className="backdrop-blur-lg bg-white/15 border border-white/30 rounded-3xl p-6 shadow-2xl">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Member Since
                  </h3>
                  <p className="text-[#C5DFFF]">
                    {new Date(form.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Journal Entries Section */}
          <div className="mb-12">
            <div className="backdrop-blur-lg bg-white/15 border border-white/30 rounded-3xl p-8 shadow-2xl hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Describe Yourself
                </h2>
              </div>
              <textarea
                disabled={!editing}
                value={valueTemp.description ?? ""}
                onChange={(e) =>
                  setValueTemp({ ...valueTemp, description: e.target.value })
                }
                placeholder="Tell us about yourself, the type of person you are, your interests, and anything else you'd like to share (comma separated)"
                className={cn(
                  "w-full rounded-2xl px-6 py-4 h-32 bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#7AA7F2] focus:border-[#4D86E0] transition-all duration-300 resize-none",
                  !editing && "opacity-60 cursor-not-allowed",
                  editing && "hover:bg-white/15 focus:bg-white/20"
                )}
              />
            </div>
          </div>

          {/* Personal Interests Cards */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          

          
        </div> */}

          {/* Trusted Contacts Section */}
          <div className="backdrop-blur-lg bg-white/15 border border-white/30 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Trusted Contacts
                </h2>
              </div>

              {editing && (
                <button
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      trustedContacts: [
                        ...prev.trustedContacts,
                        { name: "", phone: "", relationship: "" },
                      ],
                    }))
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4D86E0] to-[#7AA7F2] rounded-xl text-white font-medium hover:from-[#7AA7F2] hover:to-[#C5DFFF] transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  Add Contact
                </button>
              )}
            </div>

            {(form.trustedContacts || []).filter(
              (contact) =>
                (contact.name || "").trim() !== "" ||
                (contact.phone || "").trim() !== "" ||
                (contact.relationship || "").trim() !== ""
            ).length === 0 ? (
              <div className="text-center py-12">
                <Phone className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/60 text-lg mb-6">
                  No trusted contacts added yet
                </p>
                {editing && (
                  <button
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        trustedContacts: [
                          ...prev.trustedContacts,
                          { name: "", phone: "", relationship: "" },
                        ],
                      }))
                    }
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#4D86E0] to-[#7AA7F2] rounded-xl text-white font-medium hover:from-[#7AA7F2] hover:to-[#C5DFFF] transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    Add Your First Contact
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {(form.trustedContacts || [])
                  .filter(
                    (contact) =>
                      (contact.name || "").trim() !== "" ||
                      (contact.phone || "").trim() !== "" ||
                      (contact.relationship || "").trim() !== ""
                  )
                  .map((contact, index) => (
                    <div
                      key={index}
                      className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group"
                    >
                    {editing && (
                      <button
                        onClick={() => removeContact(index)}
                        className="absolute top-4 right-4 w-8 h-8 bg-red-500/20 hover:bg-red-500/40 rounded-full flex items-center justify-center text-red-300 hover:text-red-200 transition-colors duration-300 opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <div className="space-y-4">
                      <input
                        type="text"
                        disabled={!editing}
                        placeholder="Full Name"
                        value={contact.name}
                        onChange={(e) =>
                          updateContact(index, "name", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#7AA7F2] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                      <input
                        type="text"
                        disabled={!editing}
                        placeholder="Phone Number"
                        value={contact.phone}
                        onChange={(e) =>
                          updateContact(index, "phone", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#7AA7F2] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                      <input
                        type="text"
                        disabled={!editing}
                        placeholder="Relationship"
                        value={contact.relationship}
                        onChange={(e) =>
                          updateContact(index, "relationship", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#7AA7F2] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {editing && (
            <div className="flex justify-center gap-6 pt-12">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-2xl text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
              <button
                onClick={() => setEditing(false)}
                className="inline-flex items-center gap-3 px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-white font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
