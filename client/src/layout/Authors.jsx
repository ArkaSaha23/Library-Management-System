import React from "react";
import { FaStar, FaBookOpen, FaUsers } from "react-icons/fa";

export default function Authors() {
  const authors = [
    {
      name: "Sarah Johnson",
      title: "Bestselling Author",
      books: 12,
      followers: "2.5M",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "Award-winning novelist specializing in contemporary fiction and mystery thrillers.",
    },
    {
      name: "Dr. Michael Chen",
      title: "Educational Expert",
      books: 8,
      followers: "1.8M",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "Renowned educator and author of bestselling textbooks on science and technology.",
    },
    {
      name: "Emma Rodriguez",
      title: "Romance Writer",
      books: 15,
      followers: "3.2M",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "Heartwarming romance stories that have captured millions of readers worldwide.",
    },
    {
      name: "James Wilson",
      title: "History Scholar",
      books: 10,
      followers: "950K",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "Expert historian bringing the past to life through engaging and accessible narratives.",
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Authors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the creative minds behind our collection. These talented
            authors have inspired millions with their words and stories.
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {authors.map((author, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Author Image */}
              <div className="relative">
                <img
                  src={author.image}
                  alt={author.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                  <FaStar className="mr-1" />
                  4.9
                </div>
              </div>

              {/* Author Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {author.name}
                </h3>
                <p className="text-indigo-600 font-medium mb-3">
                  {author.title}
                </p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {author.bio}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <FaBookOpen className="mr-1" />
                    {author.books} books
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="mr-1" />
                    {author.followers}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold transition duration-200 shadow-lg transform hover:scale-105">
            Meet All Authors
          </button>
        </div>
      </div>
    </div>
  );
}
