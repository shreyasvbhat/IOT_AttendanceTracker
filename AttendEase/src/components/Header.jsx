import React from 'react';
import { GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Header = () => {
  const { currentUser, userRole, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-[#1e293b] via-[#2563eb] to-[#0f172a] shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="flex items-center space-x-2"
        >
          <span className="relative">
            <GraduationCap className="h-8 w-8 text-blue-400 drop-shadow-lg animate-glow" />
            {/* Glowing effect */}
            <span className="absolute -inset-1 rounded-full bg-blue-500 opacity-20 blur-lg"></span>
          </span>
          <span className="text-2xl font-extrabold text-white tracking-tight drop-shadow">
            EduTrack
          </span>
        </motion.div>

        {currentUser && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring", delay: 0.2 }}
            className="flex items-center space-x-4"
          >
            <div className="text-sm text-blue-100 flex items-center gap-2">
              <span>Logged in as:</span>
              <span className="font-semibold text-white">{currentUser.name}</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold
                ${userRole === 'teacher'
                  ? 'bg-gradient-to-r from-blue-700 to-sky-600 text-white'
                  : 'bg-gradient-to-r from-sky-600 to-blue-700 text-white'}
              `}>
                {userRole === 'teacher' ? 'Teacher' : 'Student'}
              </span>
            </div>
            <Button
              variant="ghost"
              onClick={logout}
              className="flex items-center gap-1 bg-gradient-to-r from-blue-800/80 to-blue-600/80 hover:from-blue-700 hover:to-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 focus:ring-2 focus:ring-blue-400"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;