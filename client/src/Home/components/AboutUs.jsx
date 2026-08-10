import React from "react";
import { FaBook, FaUsers, FaAward, FaGlobe } from "react-icons/fa";

export default function AboutUs() {
  const stats = [
    {
      icon: FaBook,
      number: "50,000+",
      label: "Books Available",
    },
    {
      icon: FaUsers,
      number: "100,000+",
      label: "Active Members",
    },
    {
      icon: FaAward,
      number: "25+",
      label: "Years of Service",
    },
    {
      icon: FaGlobe,
      number: "50+",
      label: "Countries Served",
    },
  ];

  const features = [
    {
      title: "Digital Library Access",
      description:
        "Access our entire collection from anywhere, anytime with our digital platform.",
      icon: "📱",
    },
    {
      title: "Expert Curation",
      description:
        "Our team of literary experts carefully selects and curates books for quality and diversity.",
      icon: "🎯",
    },
    {
      title: "Community Events",
      description:
        "Join book clubs, author talks, and literary events to connect with fellow readers.",
      icon: "🤝",
    },
    {
      title: "Educational Resources",
      description:
        "Access textbooks, research materials, and educational content for all learning levels.",
      icon: "🎓",
    },
  ];

  return (
    <div id="aboutus" className="pt-10 py-5 bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About LibraryHub
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're more than just a library. We're a community of readers,
            writers, and thinkers dedicated to fostering a love of learning and
            imagination.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start">
                <div className="text-4xl mr-4">{feature.icon}</div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl lg:text:3xl text-center font-bold text-gray-900 mb-6">
                Our Mission
              </h3>
              <p className="text-sm md:text-md lg:text-xl text-gray-600 mb-6 leading-relaxed">
                At LibraryHub, we believe that knowledge and stories have the
                power to transform lives. Our mission is to make quality
                literature accessible to everyone, regardless of location,
                background, or circumstances.
              </p>
              <p className="text-sm md:text-md lg:text-xl text-gray-600 leading-relaxed">
                We strive to create an inclusive community where readers can
                discover new worlds, connect with authors, and engage in
                meaningful discussions about literature and ideas.
              </p>
            </div>
            <div className="relative flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Library reading area"
                className="rounded-2xl shadow-lg h-100 w-150"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
