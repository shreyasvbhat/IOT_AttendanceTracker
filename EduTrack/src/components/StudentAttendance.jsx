import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { User } from "lucide-react";

const StudentAttendance = () => {
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.role !== "Student") return null;

  return (
    <div className="rounded-2xl shadow-2xl border border-blue-900/40 bg-gradient-to-br from-[#232946]/80 to-[#181a20]/80 backdrop-blur-xl overflow-hidden">
      <div className="px-6 py-5 bg-gradient-to-r from-[#2563eb]/80 to-[#1e40af]/80 border-b border-blue-900/40 flex flex-col md:flex-row md:items-center md:space-x-8 space-y-2 md:space-y-0">
        <span className="relative self-start md:self-auto">
          <User className="h-10 w-10 text-sky-300 drop-shadow" />
          <span className="absolute -inset-1 rounded-full bg-sky-400 opacity-20 blur-lg"></span>
        </span>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sky-200 text-sm">
          <div>
            <span className="font-semibold text-white">Name:</span>{" "}
            {currentUser.name}
          </div>
          <div>
            <span className="font-semibold text-white">Student ID:</span>{" "}
            {currentUser.uid}
          </div>
          <div>
            <span className="font-semibold text-white">USN:</span>{" "}
            {currentUser.usn}
          </div>
          <div>
            <span className="font-semibold text-white">Roll No:</span>{" "}
            {currentUser.rollNumber}
          </div>
          <div>
            <span className="font-semibold text-white">Section:</span>{" "}
            {currentUser.section}
          </div>
          <div>
            <span className="font-semibold text-white">Semester:</span>{" "}
            {currentUser.sem}
          </div>
          <div className="col-span-2">
            <span className="font-semibold text-white">Email:</span>{" "}
            {currentUser.email}
          </div>
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
