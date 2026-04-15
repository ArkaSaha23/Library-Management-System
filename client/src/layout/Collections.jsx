import React from "react";
import { FaBook, FaUser, FaGraduationCap, FaHeart } from "react-icons/fa";

export default function Collections() {
  const collections = [
    {
      icon: FaBook,
      title: "Fiction",
      description:
        "Immerse yourself in captivating stories and imaginative worlds. From mystery thrillers to fantasy adventures.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: FaUser,
      title: "Non-Fiction",
      description:
        "Learn from experts and expand your knowledge base. Biographies, self-help, and educational content.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      icon: FaGraduationCap,
      title: "Educational",
      description:
        "Access textbooks and academic resources for all levels. Perfect for students and lifelong learners.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      icon: FaHeart,
      title: "Romance",
      description:
        "Find your perfect love story. From contemporary romance to historical love tales.",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
    },
  ];

  return (
    <div className="py-10 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Explore Our Collections
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover books across all genres and categories. Whether you're
            looking for adventure, knowledge, or pure entertainment, we have
            something for everyone.
          </p>
        </div>

        {/* Collections Grid */}
        {/* <div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${collection.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <collection.icon className="h-8 w-8" />
              </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection, index) => (
            <div
              key={index}
              className={`${collection.bgColor} rounded-2xl p-3 flex flex-col h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group `}
            >
              <div
                className={`inline-flex p-4 w-16 flex justify-center items-center rounded-xl bg-gradient-to-r ${collection.color} text-white mb-6`}
              >
                <collection.icon className="h-8 w-8" />
              </div>

              <h3 className={`text-2xl font-bold ${collection.textColor} mb-4`}>
                {collection.title}
              </h3>

              {/* This grows and pushes bottom content down */}
              <p className="text-gray-600 leading-relaxed flex-grow">
                {collection.description}
              </p>

              {/* Always at bottom */}
              <div className="mt-4">
                <div
                  className={`inline-flex items-center text-sm font-medium ${collection.textColor} group-hover:underline`}
                >
                  Explore Collection
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition duration-200 shadow-lg transform hover:scale-105">
            View All Collections
          </button>
        </div>
      </div>
    </div>
  );
}
