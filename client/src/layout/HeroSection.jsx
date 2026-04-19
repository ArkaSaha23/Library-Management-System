import React from "react";
import library from "../assets/libraryHeroImg.png";
import logo from "../assets/logo.png";

export default function HeroSection() {
  return (
    <div id="home" className="mt-30 mb-10 h-100 flex justify-center">
      <div className="relative w-10/12 h-full rounded-3xl overflow-hidden">
        {/* Background Image */}
        <img
          src={library}
          alt="library"
          className="w-full h-full object-cover"
        />

        {/* Soft overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Search Bar */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">
            Welcome to <span className="text-blue-300">ShelfSync</span>
          </h1>

          <p className="text-gray-200 text-sm md:text-lg mb-6">
            Discover the best books around
          </p>

          {/* Search Bar */}
          <div className="flex items-center bg-white/90 rounded-full px-4 py-2 shadow-xl w-full md:w-1/2">
            <span className="text-gray-500 mr-2">🔍</span>
            <input
              type="text"
              placeholder="Search books, authors..."
              className="w-full outline-none bg-transparent text-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
