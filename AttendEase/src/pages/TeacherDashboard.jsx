import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StudentList from '../components/StudentList';
import { Users, AlertCircle } from 'lucide-react';

const TeacherDashboard = () => {
  const { currentUser, userRole } = useAuth();

  // You would normally use React Router for navigation
  useEffect(() => {
    if (!currentUser || userRole !== 'teacher') {
      // This is just a stub since we aren't using actual routing
      console.log('Unauthorized access to teacher dashboard');
    }
  }, [currentUser, userRole]);

  if (!currentUser || userRole !== 'teacher') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-300 mb-4">You must be logged in as a teacher to view this dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col text-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <Users className="h-8 w-8 text-indigo-400" />
          <h2 className="text-2xl font-bold">Teacher Dashboard</h2>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 mb-8">
          <h3 className="font-semibold text-xl mb-2">Welcome, {currentUser.name}</h3>
          <p className="text-gray-300">
            This dashboard provides an overview of student attendance. You can monitor each student's attendance 
            percentage across all subjects.
          </p>
        </div>
        
        <StudentList />
      </main>
      
      <Footer />
    </div>
  );
};

export default TeacherDashboard;