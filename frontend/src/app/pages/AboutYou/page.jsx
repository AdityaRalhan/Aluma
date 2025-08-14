"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  Heart,
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
  BookOpenText,
  Shield,
} from "lucide-react";

export default function AboutYouPage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [valueTemp, setValueTemp] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [ageError, setAgeError] = useState("");

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
      try {
        const res = await fetch(
          `${""}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setUser(data);

        setForm({
          email: data.email || "",
          password: "",
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleAgeChange = (e) => {
    const value = e.target.value;
    
    
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      const numericValue = value === "" ? "" : parseInt(value, 10);
      
     
      if (value === "" || (numericValue >= 0 && numericValue <= 120)) {
        setForm({ ...form, age: value });
        setAgeError("");
      } else {
        setAgeError("Please enter a valid age between 0 and 120");
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "age") {
      handleAgeChange(e);
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
  
    if (form.age && (parseInt(form.age) < 0 || parseInt(form.age) > 120)) {
      setAgeError("Please enter a valid age between 0 and 120");
      return;
    }

    const token = localStorage.getItem("token") || "";

    try {
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

      const response = await fetch(
        `${""}/api/user/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedForm),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const responseData = await response.json();
      setForm(updatedForm);
      setEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center space-y-4">
          <div className="inline-block relative">
            <div className="w-12 h-12 border-4 border-blue-100 rounded-full animate-spin" />
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" style={{ animationDelay: "0.3s" }} />
          </div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <main className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center border border-blue-200">
                <User className="w-12 h-12 text-blue-600" />
              </div>
              {editing && (
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Edit3 className="w-5 h-5 text-gray-600" />
                </button>
              )}
            </div>
            
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {form.name || "Your Profile"}
              </h1>
              <p className="text-gray-600 mb-4">
                {form.occupation || "Update your personal information"}
              </p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                <button
                  onClick={() => editing ? handleSave() : setEditing(true)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors ${
                    editing
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {editing ? (
                    <Save className="w-5 h-5" />
                  ) : (
                    <Edit3 className="w-5 h-5" />
                  )}
                  {editing ? "Save Changes" : "Edit Profile"}
                </button>

                {editing && (
                  <button
                    onClick={() => setEditing(false)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {Object.entries(form).map(([key, value]) => {
                  if (["trustedContacts", "password", "createdAt", "description"].includes(key)) return null;
                  
                  if (key === "age") {
                    return (
                      <div key={key} className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          Age
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            name="age"
                            disabled={!editing}
                            value={value}
                            onChange={handleAgeChange}
                            placeholder="Enter your age"
                            className={`w-full px-4 py-2.5 rounded-lg border ${
                              editing
                                ? "border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                : "border-gray-200 bg-gray-50"
                            } text-gray-700 transition-colors pr-10`}
                            maxLength="3"
                          />
                          {value && (
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                              years
                            </span>
                          )}
                        </div>
                        {ageError && (
                          <p className="text-sm text-red-600">{ageError}</p>
                        )}
                        {value && parseInt(value) > 100 && (
                          <p className="text-sm text-amber-600">
                            Please verify this is correct
                          </p>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={key} className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        {key === "Email" ? <Mail className="w-5 h-5 text-blue-600" /> :
                         key === "Name" ? <User className="w-5 h-5 text-blue-600" /> :
                         key === "Occupation" ? <Briefcase className="w-5 h-5 text-blue-600" /> :
                         key === "Gender" ? <User className="w-5 h-5 text-blue-600" /> :
                         key === "Physical_Activity" ? <Activity className="w-5 h-5 text-blue-600" /> :
                         key === "Current_Medication" ? <Pill className="w-5 h-5 text-blue-600" /> :
                         <User className="w-5 h-5 text-blue-600" />}
                        {key.replace(/_/g, " ")}
                      </label>
                      <input
                        type={key === "email" ? "email" : "text"}
                        name={key}
                        disabled={!editing}
                        value={value}
                        onChange={handleChange}
                        placeholder={
                          key === "Physical_Activity" ? "Types of physical activities you enjoy" :
                          key === "Current_Medication" ? "Current medications " :
                          `Enter your ${key.replace(/_/g, " ").toLowerCase()}`
                        }
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                          editing
                            ? "border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            : "border-gray-200 bg-gray-50"
                        } text-gray-700 transition-colors`}
                      />
                    </div>
                  );
                })}
              </div>
            </section>

            {/* About You */}
            <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <BookOpenText className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">About You</h2>
              </div>

              <textarea
                disabled={!editing}
                value={valueTemp.description ?? ""}
                onChange={(e) => setValueTemp({ ...valueTemp, description: e.target.value })}
                placeholder="Describe yourself, your interests, personality traits, etc. (comma separated)"
                className={`w-full px-4 py-3 rounded-lg border ${
                  editing
                    ? "border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    : "border-gray-200 bg-gray-50"
                } text-gray-700 min-h-[120px] transition-colors`}
              />
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Profile Summary</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium text-gray-900">
                    {form.createdAt ? new Date(form.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Trusted Contacts</span>
                  <span className="font-medium text-gray-900">
                    {form.trustedContacts.length}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">Profile Completeness</span>
                  <span className="font-medium text-gray-900">
                    {Math.round(
                      (Object.values(form).filter(v => v !== "" && v?.length !== 0).length / 
                      Object.keys(form).length) * 100
                    )}%
                  </span>
                </div>
              </div>
            </section>

            {/* Trusted Contacts */}
            <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Trusted Contacts</h2>
                </div>

                {editing && (
                  <button
                    onClick={() => setForm(prev => ({
                      ...prev,
                      trustedContacts: [...prev.trustedContacts, { name: "", phone: "", relationship: "" }],
                    }))}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </div>

              {form.trustedContacts.length === 0 ? (
                <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <Phone className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">No trusted contacts added</p>
                  {editing && (
                    <button
                      onClick={() => setForm(prev => ({
                        ...prev,
                        trustedContacts: [...prev.trustedContacts, { name: "", phone: "", relationship: "" }],
                      }))}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Add your first contact
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {form.trustedContacts.map((contact, index) => (
                    <div 
                      key={index} 
                      className="relative bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      {editing && (
                        <button
                          onClick={() => removeContact(index)}
                          className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                          <input
                            type="text"
                            disabled={!editing}
                            value={contact.name}
                            onChange={(e) => updateContact(index, "name", e.target.value)}
                            className={`w-full px-3 py-2 rounded-md border ${
                              editing
                                ? "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                                : "border-gray-200 bg-white"
                            } text-gray-700`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <input
                            type="tel"
                            disabled={!editing}
                            value={contact.phone}
                            onChange={(e) => updateContact(index, "phone", e.target.value)}
                            className={`w-full px-3 py-2 rounded-md border ${
                              editing
                                ? "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                                : "border-gray-200 bg-white"
                            } text-gray-700`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                          <input
                            type="text"
                            disabled={!editing}
                            value={contact.relationship}
                            onChange={(e) => updateContact(index, "relationship", e.target.value)}
                            className={`w-full px-3 py-2 rounded-md border ${
                              editing
                                ? "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                                : "border-gray-200 bg-white"
                            } text-gray-700`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}