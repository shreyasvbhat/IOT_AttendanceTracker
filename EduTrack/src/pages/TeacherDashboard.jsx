import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StudentList from "../components/StudentList";
import { Users, AlertCircle } from "lucide-react";

const TeacherDashboard = () => {
  const { currentUser, userRole } = useAuth();

  // You would normally use React Router for navigation
  useEffect(() => {
    if (!currentUser || userRole !== "teacher") {
      // This is just a stub since we aren't using actual routing
      console.log("Unauthorized access to teacher dashboard");
    }
  }, [currentUser, userRole]);

  if (!currentUser || userRole !== "teacher") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-300 mb-4">
            You must be logged in as a teacher to view this dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181a20] via-[#232946] to-[#121212] flex flex-col text-white">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-2 py-8">
        <div className="flex items-center gap-3 mb-10">
          <span className="relative">
            <Users className="h-10 w-10 text-indigo-400 drop-shadow-lg" />
            <span className="absolute -inset-1 rounded-full bg-indigo-500 opacity-20 blur-lg"></span>
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow">
            Teacher Dashboard
          </h2>
        </div>

        <div className="w-full max-w-2xl bg-gradient-to-br from-[#232946]/80 to-[#181a20]/80 border border-indigo-900/40 backdrop-blur-2xl p-8 rounded-2xl shadow-2xl mb-10">
          <h3 className="font-semibold text-2xl mb-3 text-indigo-300">
            Welcome, <span className="text-white">{currentUser.name}</span>
          </h3>
          <p className="text-indigo-100 text-lg">
            This dashboard provides an overview of student attendance.
            <br />
            <span className="text-indigo-400 font-semibold">
              Monitor each student's attendance percentage across all subjects.
            </span>
          </p>
        </div>

        <div className="w-full max-w-4xl">
          <StudentList />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeacherDashboard;
