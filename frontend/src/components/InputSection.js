import React, { useState } from "react";
import {
  Search,
  Music,
  Star,
  Headphones,
  Users,
  TrendingUp,
  Play,
  Heart,
  Download,
  Globe,
  Zap,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function InputSection() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/results`, { state: { query } });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 sm:py-12 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-2xl shadow-lg">
              <Music className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            Discover Music
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
            Search for your favorite songs and explore new music
          </p>
        </div>

        {/* Search Form */}
        <div className="relative">
          <div
            className={`relative flex items-center transition-all duration-300 ${
              isFocused
                ? "transform scale-105 shadow-2xl"
                : "shadow-xl hover:shadow-2xl"
            }`}
          >
            {/* Search Input Container */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 sm:pl-6 flex items-center pointer-events-none">
                <Search
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isFocused ? "text-emerald-500" : "text-gray-400"
                  }`}
                />
              </div>

              <input
                className={`w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-4 sm:py-5 text-base sm:text-lg
                  bg-white border-2 rounded-2xl sm:rounded-3xl
                  transition-all duration-300 ease-in-out
                  placeholder-gray-400 text-gray-900
                  focus:outline-none focus:ring-0
                  ${
                    isFocused
                      ? "border-emerald-400 bg-emerald-50/30"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSubmit(event);
                  }
                }}
                placeholder="Search for any song, artist, or album..."
              />
            </div>

            {/* Search Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!query.trim()}
              className={`ml-3 sm:ml-4 px-6 sm:px-8 py-4 sm:py-5 
                bg-gradient-to-r from-emerald-500 to-teal-600
                text-white font-semibold text-base sm:text-lg
                rounded-2xl sm:rounded-3xl
                transition-all duration-300 ease-in-out
                transform hover:scale-105 active:scale-95
                shadow-lg hover:shadow-xl
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                focus:outline-none focus:ring-4 focus:ring-emerald-200
                ${
                  !query.trim()
                    ? "hover:shadow-lg hover:scale-100"
                    : "hover:from-emerald-600 hover:to-teal-700"
                }`}
            >
              <span className="hidden sm:inline">Search</span>
              <Search className="w-5 h-5 sm:hidden" />
            </button>
          </div>

          {/* Floating Animation Effect */}
          <div
            className={`absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none
            transition-opacity duration-300 ${
              isFocused ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 rounded-2xl sm:rounded-3xl 
              bg-gradient-to-r from-emerald-100/50 to-teal-100/50 
              animate-pulse"
            />
          </div>
        </div>

        {/* Search Suggestions */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm mb-4">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {["wizkid", "One love", "MMS", "23"].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-4 py-2 bg-gray-100 hover:bg-emerald-100 
                  text-gray-700 hover:text-emerald-700 
                  rounded-full text-sm font-medium
                  transition-all duration-200 hover:scale-105
                  border border-transparent hover:border-emerald-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Features Section Component
function FeaturesSection() {
  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Smart Search",
      description:
        "Find any song, artist, or album with our intelligent search that understands what you're looking for.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Trending Music",
      description:
        "Stay up-to-date with the latest hits and discover what's trending in your favorite genres.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Personal Favorites",
      description:
        "Save your favorite tracks and create personalized playlists that match your unique taste.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Library",
      description:
        "Access music from around the world, including local Nigerian hits and international chartbusters.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience music discovery like never before with our cutting-edge
            features designed for music lovers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Statistics Section Component
function StatsSection() {
  const stats = [
    {
      number: "10M+",
      label: "Songs Available",
      icon: <Music className="w-6 h-6" />,
    },
    {
      number: "500K+",
      label: "Active Users",
      icon: <Users className="w-6 h-6" />,
    },
    { number: "50K+", label: "Artists", icon: <Star className="w-6 h-6" /> },
    {
      number: "24/7",
      label: "Music Streaming",
      icon: <Headphones className="w-6 h-6" />,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-emerald-600 to-teal-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Join Millions of Music Lovers
          </h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Be part of a growing community that's passionate about discovering
            and sharing great music.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl w-fit mx-auto mb-4 group-hover:bg-white/20 transition-colors duration-300">
                <div className="text-white">{stat.icon}</div>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-emerald-100 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Trending Section Component
function TrendingSection() {
  const trendingTracks = [
    { title: "Last Last", artist: "Burna Boy", plays: "2.3M", image: "🎵" },
    { title: "Essence", artist: "Wizkid ft. Tems", plays: "5.1M", image: "🎶" },
    { title: "Ye", artist: "Burna Boy", plays: "1.8M", image: "🎤" },
    { title: "Calm Down", artist: "Rema", plays: "3.7M", image: "🎸" },
    { title: "Unavailable", artist: "Davido", plays: "2.9M", image: "🎺" },
    { title: "Rush", artist: "Ayra Starr", plays: "1.6M", image: "🎹" },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trending Now
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover what's hot right now and join the conversation around
            today's biggest hits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingTracks.map((track, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="text-4xl bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-xl">
                  {track.image}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{track.artist}</p>
                  <p className="text-emerald-600 text-sm font-medium">
                    {track.plays} plays
                  </p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full">
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section Component
function CTASection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-emerald-500/20 to-teal-600/20 backdrop-blur-sm p-12 rounded-3xl border border-emerald-500/30">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Discover Your Next Favorite Song?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of music enthusiasts who trust our platform to find
            the perfect soundtrack for every moment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Start Exploring Music
            </button>
            <button className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-xl mr-3">
                <Music className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Discover Music</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your ultimate destination for music discovery. Find, explore, and
              enjoy millions of songs from artists around the world.
            </p>
            <div className="flex space-x-4">
              {["📘", "📱", "🐦", "📺"].map((social, index) => (
                <button
                  key={index}
                  className="bg-gray-800 hover:bg-emerald-600 p-2 rounded-lg transition-colors"
                >
                  <span className="text-xl">{social}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Music Search
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Trending Songs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Artist Discovery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Playlists
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2025 Discover Music. All rights reserved. Made with ❤️ for
            music lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main Landing Page Component
export default function MusicLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <InputSection />
      <FeaturesSection />
      <StatsSection />
      <TrendingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
