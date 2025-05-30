// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function SpotifySearchResults() {
//   const location = useLocation();
//   const { query } = location.state;
//   const [results, setResults] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchResults() {
//       try {
//         const nodeServer = process.env.REACT_APP_BACKEND_SERVER_URL;
//         // const port = process.env.PORT || 5000
//         console.log("this is node server", nodeServer);

//         // const response = await fetch(`${nodeServer}:${port}/songSearch`,{
//         const response = await fetch(`${nodeServer}/songSearch`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ query: query }),
//         });

//         const gotdata = await response.json();

//         setResults(gotdata.tracks.items);
//       } catch (error) {
//         console.log("some Error happened : ", error);
//       }
//     }

//     if (query) {
//       fetchResults();
//     }
//   }, [query]);

//   const handleClick = (item) => {
//     navigate(`/results/detail/${item.id}`, { state: { item } });
//   };

//   return (
//     <div>
//       <div id="songsList">
//         <div className="justify-center text-center overflow-y-scroll">
//           <ul>
//             {results.map((item, index) => (
//               <li
//                 onClick={() => handleClick(item)}
//                 className="py-5 border-b border-slate-200 w-60 mx-auto hover:opacity-75 hover:cursor-pointer"
//                 key={index}
//               >
//                 <img alt="albumCover" src={item.album.images[0].url} />
//                 <p className="font-medium text-lg text-left">{item.name}</p>
//                 <p className="font-normal text-sm text-gray-600 text-left">
//                   {item.artists[0].name}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SpotifySearchResults;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Music,
  Play,
  Clock,
  User,
  Disc,
  Loader2,
  AlertCircle,
} from "lucide-react";

function SpotifySearchResults() {
  const location = useLocation();
  const { query } = location.state;
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    async function fetchResults() {
      try {
        setIsLoading(true);
        setError(null);

        const nodeServer = process.env.REACT_APP_BACKEND_SERVER_URL;
        console.log("this is node server", nodeServer);

        const response = await fetch(`${nodeServer}/songSearch`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: query }),
        });

        const gotdata = await response.json();
        setResults(gotdata.tracks.items);
      } catch (error) {
        console.log("Error occurred:", error);
        setError("Failed to load search results");
      } finally {
        setIsLoading(false);
      }
    }

    if (query) {
      fetchResults();
    }
  }, [query]);

  const handleClick = (item) => {
    navigate(`/results/detail/${item.id}`, { state: { item } });
  };

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

  if (!query) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50/30">
        <div className="text-center">
          <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">No search query provided</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Search Results
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Results for{" "}
            <span className="font-semibold text-emerald-600">"{query}"</span>
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 mx-auto text-emerald-500 animate-spin mb-4" />
              <p className="text-gray-600 text-lg">Searching for music...</p>
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

        {/* Results */}
        {!isLoading && !error && (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Found{" "}
                <span className="font-semibold text-gray-900">
                  {results.length}
                </span>{" "}
                tracks
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid gap-4 sm:gap-6">
              {results.length === 0 ? (
                <div className="text-center py-20">
                  <Music className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 text-lg">No tracks found</p>
                  <p className="text-gray-500">
                    Try searching with different keywords
                  </p>
                </div>
              ) : (
                results.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleClick(item)}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 
                      border border-gray-200/50 cursor-pointer transition-all duration-300 ease-out
                      hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-200
                      hover:-translate-y-1 hover:bg-white/90`}
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      {/* Album Cover */}
                      <div className="relative flex-shrink-0">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 
                          rounded-xl blur-md transition-opacity duration-300
                          ${
                            hoveredItem === index ? "opacity-25" : "opacity-0"
                          }`}
                        ></div>
                        <img
                          src={item.album.images[0].url}
                          alt="Album Cover"
                          className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 
                            rounded-xl object-cover shadow-lg ring-2 ring-white/50"
                        />

                        {/* Play Button Overlay */}
                        <div
                          className={`absolute inset-0 flex items-center justify-center
                          bg-black/50 rounded-xl transition-opacity duration-300
                          ${
                            hoveredItem === index ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <Play className="w-6 h-6 text-white fill-current" />
                        </div>
                      </div>

                      {/* Song Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <h3
                              className="text-lg sm:text-xl font-bold text-gray-900 mb-1 
                              truncate group-hover:text-emerald-600 transition-colors duration-200"
                            >
                              {item.name}
                            </h3>

                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                              <User className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm sm:text-base font-medium truncate">
                                {item.artists[0].name}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-500">
                              <Disc className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm truncate">
                                {item.album.name}
                              </span>
                            </div>
                          </div>

                          {/* Right Side Info */}
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            {/* Duration */}
                            {item.duration_ms && (
                              <div className="flex items-center gap-1 text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  {formatDuration(item.duration_ms)}
                                </span>
                              </div>
                            )}

                            {/* Popularity Badge */}
                            {item.popularity && (
                              <div
                                className={`px-2 py-1 rounded-full text-xs font-semibold
                                ${getPopularityColor(item.popularity)}`}
                              >
                                {item.popularity}% popular
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Gradient */}
                    <div
                      className={`absolute inset-0 rounded-2xl pointer-events-none
                      bg-gradient-to-r from-emerald-500/5 to-teal-500/5 
                      transition-opacity duration-300
                      ${hoveredItem === index ? "opacity-100" : "opacity-0"}`}
                    ></div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SpotifySearchResults;
