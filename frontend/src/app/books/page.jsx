"use client";

import React, { useState } from "react";

export default function Books() {
  const [openCategory, setOpenCategory] = useState(null);

  const categories = [
    {
      title: "Mental Health",
      color: "from-rose-100 to-pink-300",
      books: [
        {
          title: "The Body Keeps the Score",
          author: "Bessel van der Kolk",
          summary:
            "Explores how trauma reshapes both body and brain, and offers innovative treatments.",
        },
        {
          title: "Lost Connections",
          author: "Johann Hari",
          summary:
            "Challenges common ideas about depression and anxiety and explores underlying causes.",
        },
      ],
    },
    {
      title: "Mindfulness",
      color: "from-green-100 to-emerald-300",
      books: [
        {
          title: "The Miracle of Mindfulness",
          author: "Thich Nhat Hanh",
          summary:
            "Simple guidance on practicing mindfulness in everyday life.",
        },
        {
          title: "Wherever You Go, There You Are",
          author: "Jon Kabat-Zinn",
          summary:
            "A guide to mindfulness meditation by the creator of the MBSR program.",
        },
      ],
    },
    {
      title: "Emotional Intelligence",
      color: "from-blue-100 to-sky-300",
      books: [
        {
          title: "Emotional Intelligence",
          author: "Daniel Goleman",
          summary:
            "Groundbreaking work on how emotional intelligence affects success in life.",
        },
        {
          title: "Permission to Feel",
          author: "Marc Brackett",
          summary:
            "A roadmap to understanding and managing our emotions effectively.",
        },
      ],
    },
    {
      title: "Motivation",
      color: "from-yellow-100 to-amber-300",
      books: [
        {
          title: "Drive",
          author: "Daniel H. Pink",
          summary:
            "Explains the three key elements of true motivation: autonomy, mastery, and purpose.",
        },
        {
          title: "Grit",
          author: "Angela Duckworth",
          summary:
            "Why passion and perseverance are more important than talent.",
        },
      ],
    },
    {
      title: "Stress Relief",
      color: "from-indigo-100 to-indigo-300",
      books: [
        {
          title: "Burnout",
          author: "Emily Nagoski & Amelia Nagoski",
          summary:
            "The secret to unlocking the stress cycle and avoiding burnout.",
        },
        {
          title: "Why Zebras Don’t Get Ulcers",
          author: "Robert Sapolsky",
          summary:
            "A blend of science and humor on how stress impacts the body.",
        },
      ],
    },
    {
      title: "Self Help",
      color: "from-purple-100 to-purple-300",
      books: [
        {
          title: "Atomic Habits",
          author: "James Clear",
          summary:
            "Tiny changes, remarkable results — build better habits for life.",
        },
        {
          title: "The Power of Now",
          author: "Eckhart Tolle",
          summary:
            "Spiritual enlightenment and mindfulness for living in the present.",
        },
      ],
    },
  ];

  const toggleCategory = (title) => {
    setOpenCategory(openCategory === title ? null : title);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef6f9] to-[#ffe4f0] py-16 px-4 sm:px-8">
      <h1 className="text-4xl font-extrabold text-center text-pink-700 mb-14 font-sans">
        📖 Book Recommendations for Mental Wellness
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 bg-gradient-to-br ${category.color} shadow-xl transition-transform hover:scale-105 duration-300`}
          >
            <button
              onClick={() => toggleCategory(category.title)}
              className="text-left w-full"
            >
              <h2 className="text-2xl font-semibold text-gray-800 font-sans mb-1">
                {category.title}
              </h2>
              <p className="text-gray-700 text-sm">
                {openCategory === category.title
                  ? "Click to hide recommendations"
                  : "Click to view book suggestions"}
              </p>
            </button>

            {openCategory === category.title && (
              <div className="mt-4 space-y-4">
                {category.books.map((book, idx) => (
                  <div
                    key={idx}
                    className="bg-white/80 rounded-xl p-4 shadow-inner border border-white/40"
                  >
                    <h3 className="text-lg font-bold text-pink-900">{book.title}</h3>
                    <p className="text-sm text-gray-800 italic">by {book.author}</p>
                    <p className="text-sm text-gray-700 mt-1">{book.summary}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
