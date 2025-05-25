import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Users } from "lucide-react";
import db from "../../public/data/db.json";
import { rfidStudentMap } from "../../public/data/rfidMap.js";
import { motion } from "framer-motion";

const StudentList = () => {
  const { currentUser } = useAuth();
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:3001/students"); // Your local server endpoint
      const data = await res.json();
      const filtered = data.filter((user) => user.role === "Student");
      setStudents(filtered);
    } catch (error) {
      console.error("Failed to fetch student data", error);
    }
  };

  useEffect(() => {
    if (currentUser?.role === "Teacher") {
      fetchStudents();
    }
    // Only show students whose UID is present in db.js and mapped in rfidStudentMap
    return db
      .filter((user) => user.role === "Student" && rfidStudentMap[user.uid])
      .map((user) => ({
        ...user,
        ...rfidStudentMap[user.uid],
      }));
  }, [currentUser]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="rounded-3xl shadow-2xl border border-indigo-900/40 bg-gradient-to-br from-[#232946]/90 via-[#232946]/60 to-[#181a20]/90 backdrop-blur-2xl overflow-hidden"
    >
      <div className="px-6 py-5 bg-gradient-to-r from-[#2563eb]/80 to-[#1e40af]/80 border-b border-indigo-900/40 flex items-center space-x-4">
        <span className="relative">
          <Users className="h-8 w-8 text-indigo-300 drop-shadow" />
          <span className="absolute -inset-1 rounded-full bg-indigo-400 opacity-20 blur-lg"></span>
        </span>
        <div>
          <h3 className="font-bold text-white text-lg">Student List</h3>
          <p className="text-indigo-200 text-sm">
            Displaying {students.length} students
          </p>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-full divide-y divide-indigo-900/40">
          <thead className="bg-transparent">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-indigo-300 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-indigo-300 uppercase tracking-wider">
                USN
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Roll No
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Section
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Sem
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Last Active
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-indigo-900/40">
            {students.map((student) => (
              <tr
                key={student.uid}
                className="hover:bg-indigo-900/30 transition-colors duration-150 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white font-mono">
                  {student.uid}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-100">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-100">
                  {student.usn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-100">
                  {student.rollNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-100">
                  {student.section}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-100">
                  {student.sem}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-100">
                  {student.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-200 font-mono">
                  {new Date(student.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default StudentList;
