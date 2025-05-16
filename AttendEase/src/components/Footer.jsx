import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>© {new Date().getFullYear()} EduTrack Attendance Management System</p>
        <p className="mt-1">Designed for educational institutions</p>
      </div>
    </footer>
  );
};

export default Footer;