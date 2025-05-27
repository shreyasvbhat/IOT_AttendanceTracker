import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181a20] via-[#232946] to-[#121212] flex flex-col items-center justify-center p-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-[#232946]/90 via-[#232946]/60 to-[#181a20]/90 border border-indigo-900/40 backdrop-blur-2xl p-8 rounded-2xl shadow-2xl max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-6">
          <span className="relative">
            <AlertCircle className="h-16 w-16 text-red-400" />
            <span className="absolute -inset-2 rounded-full bg-red-500 opacity-20 blur-lg"></span>
          </span>
        </div>

        <h1 className="text-3xl font-bold mb-2 text-white">Page Not Found</h1>
        <p className="text-indigo-200 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-500 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
