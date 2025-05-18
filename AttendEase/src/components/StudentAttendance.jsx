import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { User } from "lucide-react";

const StudentAttendance = () => {
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.role !== "Student") return null;

  return (
    <div className="rounded-2xl shadow-2xl border border-blue-900/40 bg-gradient-to-br from-[#232946]/80 to-[#181a20]/80 backdrop-blur-xl overflow-hidden">
      <div className="px-6 py-5 bg-gradient-to-r from-[#2563eb]/80 to-[#1e40af]/80 border-b border-blue-900/40 flex items-center space-x-4">
        <span className="relative">
          <User className="h-8 w-8 text-sky-300 drop-shadow" />
          <span className="absolute -inset-1 rounded-full bg-sky-400 opacity-20 blur-lg"></span>
        </span>
        <div>
          <h3 className="font-bold text-white text-lg">{currentUser.name}</h3>
          <p className="text-sky-200 text-sm">Student ID: {currentUser.uid}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="text-blue-100">
          <p>
            Last Active:{" "}
            <span className="font-mono text-sky-300">
              {new Date(currentUser.timestamp).toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
