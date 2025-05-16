import React from 'react';
import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';

// Main App Content that uses auth context
const AppContent = () => {
  const { currentUser, userRole } = useAuth();
  const [loading, setLoading] = useState(true);
  
  // Simulate a short loading time when the app starts
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="mt-4 text-gray-300">Loading EduTrack...</p>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Login />;
  }
  
  if (userRole === 'teacher') {
    return <TeacherDashboard />;
  }
  
  if (userRole === 'student') {
    return <StudentDashboard />;
  }
  
  return <Login />;
};

// Root App component with provider wrapping
function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </div>
  );
}

export default App;