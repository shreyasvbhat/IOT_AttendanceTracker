import React from 'react';
import { GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { currentUser, userRole, logout } = useAuth();

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-indigo-400" />
          <h1 className="text-xl font-bold">EduTrack</h1>
        </div>
        
        {currentUser && (
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">
              <span>Logged in as: </span>
              <span className="font-semibold">{currentUser.name}</span>
              <span className="ml-2 px-2 py-1 bg-indigo-700 rounded-full text-xs">
                {userRole === 'teacher' ? 'Teacher' : 'Student'}
              </span>
            </div>
            <button 
              onClick={logout}
              className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 transition-colors duration-200 px-3 py-1 rounded-md text-sm"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;