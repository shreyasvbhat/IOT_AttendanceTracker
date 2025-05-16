import React from 'react';
import LoginForm from '../components/LoginForm';
import { GraduationCap } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="flex items-center justify-center mb-8">
          <GraduationCap className="h-12 w-12 text-indigo-500 mr-2" />
          <h1 className="text-3xl font-bold text-white">EduTrack</h1>
        </div>
        
        <LoginForm />
      </div>
      
      <div className="w-full bg-gray-900 text-center py-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} EduTrack Attendance Management System
      </div>
    </div>
  );
};

export default Login;