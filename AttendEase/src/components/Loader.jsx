import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181a20] via-[#232946] to-[#121212]">
      {/* Glowing ring */}
      <div className="relative flex items-center justify-center h-32 w-32 mb-8">
        <span className="absolute h-full w-full rounded-full bg-blue-800 opacity-20 blur-2xl"></span>
        <svg className="h-28 w-28" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="url(#blue-glow)"
            strokeWidth="8"
            fill="none"
            className="animate-loader-glow"
            style={{ filter: "drop-shadow(0 0 16px #2563eb88)" }}
          />
          <defs>
            <linearGradient id="blue-glow" x1="0" y1="0" x2="100" y2="100">
              <stop stopColor="#2563eb" />
              <stop offset="1" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>
        {/* Bouncing dot */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="block h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 via-sky-400 to-blue-300 shadow-xl animate-bounce-dot"></span>
        </span>
      </div>
      <p className="text-lg font-semibold text-blue-100 tracking-wide animate-fade-in">
        Loading EduTrack...
      </p>
    </div>
  );
};

export default Loader;
