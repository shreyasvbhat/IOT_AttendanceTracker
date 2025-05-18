import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { UserCircle2, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import LoginImage from "/LoginImage.png";

const LoginForm = () => {
  const [uid, setUid] = useState("");
  const [role, setRole] = useState("student");
  const { login, error } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(uid, role);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-[#1e293b] via-[#1e40af] to-[#0f172a]">
      {/* Left: Illustration */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-[#1e40af] to-[#0f172a] p-12"
      >
        <h2 className="text-5xl font-bold text-blue-300 mt-8 text-center drop-shadow-lg">
          Welcome Back!
        </h2>
        <p className="text-blue-100 text-lg text-center mt-2 max-w-md">
          Track your attendance effortlessly with EduTrack.
        </p>
        <img
          src={LoginImage}
          alt="Attendance Illustration"
          className="max-w-full mt-12 h-auto drop-shadow-2xl select-none"
          draggable={false}
        />
      </motion.div>

      {/* Right: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-black/80 bg-opacity-50 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
              Welcome to <span className="text-blue-400">EduTrack</span>
            </h1>
            <p className="text-blue-200 text-base font-normal mt-2">
              Attendance Management System
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-7">
            <Tabs value={role} onValueChange={setRole} className="mb-4">
              <TabsList className="w-full flex bg-gradient-to-r from-blue-900/60 to-blue-800/60 rounded-xl p-1">
                <TabsTrigger
                  value="student"
                  className="flex-1 flex text-white items-center gap-2 rounded-xl data-[state=active]:bg-blue-600/80 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all"
                >
                  <UserCircle2 size={22} /> Student
                </TabsTrigger>
                <TabsTrigger
                  value="teacher"
                  className="flex-1 flex text-white items-center gap-2 rounded-xl data-[state=active]:bg-sky-600/80 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all"
                >
                  <Users size={22} /> Teacher
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-1">
                {role === "student" ? "Student ID" : "Teacher ID"}
              </label>
              <Input
                type="text"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                placeholder={
                  role === "student"
                    ? "Enter Student ID (e.g., S001)"
                    : "Enter Teacher ID (e.g., T001)"
                }
                className="bg-[#1e293b]/80 border-none text-white placeholder:text-blue-300 focus:ring-2 focus:ring-blue-500 w-full placeholder:opacity-80"
                required
              />
              {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-semibold shadow-xl rounded-xl py-2 text-lg transition-all duration-200"
              size="lg"
            >
              Login
            </Button>
            <div className="text-center text-xs text-blue-200 mt-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Use these IDs for testing:
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="font-mono"
              >
                Student: S001-S007 | Teacher: T001-T003
              </motion.p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;
