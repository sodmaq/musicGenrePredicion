// import React from 'react';
// import logo from '../images/logo_2.svg';

// function Header() {
//     return (
//       <>
//       <div className='bg-slate-200'>
//         <div className='p-2 mx-auto lg:w-2/3 text-center'>
//             <div className='align-middle inline-block'>
//                 <img src={logo}
//                 alt='MGR_logo'
//                 className='w-16 p-2 md:w-24 md:p-2 lg:w-24 lg:p-1 animate-spin'
//                 />
//             </div>
//             <div className='inline-block text-xl font-medium align-middle md:text-2xl md:font-semibold md:px-1 lg:text-3xl lg:font-bold lg:px-4'>
//                 Music Genre Recognition
//             </div>
//         </div>
//       </div>
//       </>
//     );
//   }

// export default Header;

import React from "react";

function Header() {
  return (
    <header className="relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animate-pulse"></div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

      {/* Floating orbs for visual interest */}
      <div className="absolute top-4 left-4 w-20 h-20 bg-white/20 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 bg-purple-300/30 rounded-full blur-lg animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-pink-300/20 rounded-full blur-md animate-ping delay-500"></div>

      {/* Main content */}
      <div className="relative z-10 px-4 py-8 mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
          {/* Logo container with enhanced styling */}
          <div className="relative group">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
            <div className="relative bg-white/90 rounded-full p-3 shadow-2xl group-hover:shadow-3xl transition-all duration-300 hover:scale-110">
              {/* Placeholder for logo - using a music note icon */}
              <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-indigo-600 animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Title with enhanced typography */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent animate-pulse">
                Music Genre
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                Recognition
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-2 text-sm md:text-base lg:text-lg text-white/80 font-medium tracking-wide">
              Discover the rhythm of your music
            </p>

            {/* Animated underline */}
            <div className="mt-4 h-1 w-24 mx-auto md:mx-0 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Sound wave visualization */}
        <div className="flex justify-center mt-8 space-x-1">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-white/60 rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: "1.5s",
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent"></div>
    </header>
  );
}

export default Header;
