import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User } from 'lucide-react';

const StudentAttendance = () => {
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.role !== 'Student') return null;

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-800 to-purple-800 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <User className="h-6 w-6 text-indigo-300" />
          <div>
            <h3 className="font-bold text-white text-lg">{currentUser.name}</h3>
            <p className="text-indigo-200 text-sm">Student ID: {currentUser.uid}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="text-gray-300">
          <p>Last Active: {new Date(currentUser.timestamp).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;