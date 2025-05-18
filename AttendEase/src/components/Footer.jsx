import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-[#181a20]/90 via-[#232946]/90 to-[#0f172a]/90 backdrop-blur-xl border-t border-blue-900/40 shadow-inner mt-auto">
      {/* Animated blue accent bar */}
      <div className="container mx-auto px-4 py-5 text-center text-sm">
        <p className="text-blue-200 font-semibold tracking-wide">
          © {new Date().getFullYear()} EduTrack Attendance Management System
        </p>
        <p className="mt-1 text-blue-400/80">
          Designed for educational institutions
        </p>
      </div>
    </footer>
  );
};

export default Footer;
