import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Music,
  User,
  Disc,
  Clock,
  Calendar,
  Headphones,
  Heart,
  Share2,
  Play,
  Pause,
  Volume2,
  Star,
  Loader2,
  AlertCircle,
  Tag,
  TrendingUp,
  ExternalLink,
} from "lucide-react";

function SongDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};
  const [detail, setDetail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setIsLoading(true);
        setError(null);

        const nodeServer = process.env.REACT_APP_BACKEND_SERVER_URL;
        const response = await fetch(`${nodeServer}/songName`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            artistId: item.artists[0].id,
            trackId: item.id,
          }),
        });

        const gotdata = await response.json();
        console.log("Received from backend:", gotdata);
        setDetail(gotdata);
      } catch (error) {
        console.log("some Error happened : ", error);
        setError("Failed to load song details");
      } finally {
        setIsLoading(false);
      }
    }

    if (item) {
      fetchDetail();
    }
  }, [item]);

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  const getPopularityColor = (popularity) => {
    if (popularity >= 80) return "text-green-600 bg-green-100";
    if (popularity >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-gray-600 bg-gray-100";
  };

  const getReleaseYear = (dateString) => {
    return new Date(dateString).getFullYear();
  };

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50/30">
        <div className="text-center">
          <Music className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">No song data available</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const trueGenres = detail.T_genre;
  const predictedGenres = detail.P_genre;

  console.log("predicted gene is", predictedGenres);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Results</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 mx-auto text-emerald-500 animate-spin mb-4" />
              <p className="text-gray-600 text-[30px] font-semibold ">
                Predicting Genres and song details
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
              <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!isLoading && !error && (
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Album Art & Controls */}
            <div className="space-y-6">
              {/* Album Art */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-gray-200/50">
                  <img
                    src={item.album.images[0]?.url}
                    alt={`${item.album.name} cover`}
                    className="w-full aspect-square object-cover rounded-2xl shadow-lg"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="relative z-10 w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-200"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 text-emerald-600" />
                      ) : (
                        <Play className="w-8 h-8 text-emerald-600 ml-1" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center align-center">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isLiked
                      ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                      : "bg-white/80 text-gray-700 border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                  />
                  <span>{isLiked ? "Liked" : "Like"}</span>
                </button>

                {item.external_urls?.spotify && (
                  <button
                    onClick={() =>
                      window.open(item.external_urls.spotify, "_blank")
                    }
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 transition-all duration-200"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Spotify</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column - Song Info */}
            <div className="space-y-8">
              {/* Song Title & Artist */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {item.name}
                </h1>
                <div className="flex items-center gap-3">
                  <User className="w-6 h-6 text-gray-500" />
                  <span className="text-xl text-gray-700 font-semibold">
                    {item.artists[0].name}
                  </span>
                </div>
              </div>

              {/* Album Info */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <Disc className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Album Information
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Album</p>
                    <p className="text-gray-900 font-medium">
                      {item.album.name}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Release Year</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <p className="text-gray-900 font-medium">
                          {getReleaseYear(item.album.release_date)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Duration</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <p className="text-gray-900 font-medium">
                          {formatDuration(item.duration_ms)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-gray-500">Popularity</span>
                  </div>
                  <div
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getPopularityColor(
                      item.popularity
                    )}`}
                  >
                    <Star className="w-4 h-4" />
                    <span>{item.popularity}%</span>
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Headphones className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-gray-500">Track Number</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {item.track_number}
                  </p>
                </div>
              </div>

              {/* Genre Prediction */}
              {(trueGenres || predictedGenres) && (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Tag className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Genre Analysis
                    </h3>
                  </div>

                  {trueGenres && trueGenres.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Predicted Genre
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {trueGenres.slice(0, 3).map((genre, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-emerald-500 text-white text-sm font-medium rounded-full"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictedGenres && predictedGenres.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        Additional Predictions
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {predictedGenres.slice(0, 3).map((genre, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-teal-100 text-teal-700 text-sm font-medium rounded-full border border-teal-200"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Audio Preview */}
              {item.preview_url && (
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                  <div className="flex items-center gap-3 mb-4">
                    <Volume2 className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Preview
                    </h3>
                  </div>
                  <div className="bg-gray-100 rounded-xl p-4">
                    <audio controls className="w-full" src={item.preview_url}>
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SongDetail;
