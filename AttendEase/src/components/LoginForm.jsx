import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserCircle2, Users } from 'lucide-react';

const LoginForm = () => {
  const [uid, setUid] = useState('');
  const [role, setRole] = useState('student');
  const { login, error } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(uid, role);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden w-full max-w-md mx-auto">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5">
        <h2 className="text-white text-2xl font-bold text-center">Welcome to EduTrack</h2>
        <p className="text-indigo-200 text-center mt-1">Attendance Management System</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`flex flex-col items-center justify-center p-4 border ${
              role === 'student' 
                ? 'border-indigo-500 bg-indigo-900/30 text-indigo-300' 
                : 'border-gray-700 bg-gray-800 text-gray-400'
            } rounded-lg transition-all duration-200 hover:bg-gray-700/50`}
          >
            <UserCircle2 size={40} className="mb-2" />
            <span className="font-medium">Student</span>
          </button>
          
          <button
            type="button"
            onClick={() => setRole('teacher')}
            className={`flex flex-col items-center justify-center p-4 border ${
              role === 'teacher' 
                ? 'border-indigo-500 bg-indigo-900/30 text-indigo-300' 
                : 'border-gray-700 bg-gray-800 text-gray-400'
            } rounded-lg transition-all duration-200 hover:bg-gray-700/50`}
          >
            <Users size={40} className="mb-2" />
            <span className="font-medium">Teacher</span>
          </button>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            {role === 'student' ? 'Student ID' : 'Teacher ID'}
          </label>
          <input
            type="text"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder={role === 'student' ? 'Enter Student ID (e.g., S001)' : 'Enter Teacher ID (e.g., T001)'}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
            required
          />
          {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800"
        >
          Login
        </button>
        
        <div className="text-center text-sm text-gray-400 mt-4">
          <p>Use these IDs for testing:</p>
          <p>Student: S001-S007 | Teacher: T001-T003</p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;