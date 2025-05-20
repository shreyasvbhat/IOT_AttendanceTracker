import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StudentAttendance from "../components/StudentAttendance";
import { User, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const StudentDashboard = () => {
  const { currentUser, userRole } = useAuth();

  useEffect(() => {
    if (!currentUser || userRole !== "student") {
      console.log("Unauthorized access to student dashboard");
    }
  }, [currentUser, userRole]);

  if (!currentUser || userRole !== "student") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#181a20] via-[#232946] to-[#121212] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="bg-gradient-to-br from-[#232946]/80 to-[#181a20]/80 border border-blue-900/40 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-blue-200 mb-4">
            You must be logged in as a student to view this dashboard.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181a20] via-[#232946] to-[#121212] flex flex-col text-white">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-2 py-8">
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="relative">
            <User className="h-10 w-10 text-sky-400 drop-shadow-lg" />
            <span className="absolute -inset-1 rounded-full bg-sky-500 opacity-20 blur-lg"></span>
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow">
            Student Dashboard
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", delay: 0.2 }}
          className="w-full max-w-2xl bg-gradient-to-br from-[#232946]/80 to-[#181a20]/80 border border-blue-900/40 backdrop-blur-2xl p-8 rounded-2xl shadow-2xl mb-10"
        >
          <h3 className="font-semibold text-2xl mb-3 text-sky-300">
            Welcome, <span className="text-white">{currentUser.name}</span>
          </h3>
          <p className="text-blue-100 text-lg">
            Track your attendance across all subjects in real time.
            <br />
            <span className="text-sky-400 font-semibold">
              Maintain at least 75% attendance to be eligible for examinations.
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", delay: 0.4 }}
          className="w-full max-w-3xl"
        >
          <StudentAttendance />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
