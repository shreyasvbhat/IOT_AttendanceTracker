import React, { useMemo } from 'react';
import AttendanceBar from './AttendanceBar';
import db from '../data/db';
import { useAuth } from '../contexts/AuthContext';

const StudentList = () => {
  const { currentUser } = useAuth();
  
  const students = useMemo(() => {
    if (!currentUser || currentUser.role !== 'Teacher') {
      return [];
    }
    
    return db.filter(user => user.role === 'Student');
  }, [currentUser]);

  return (
    <div className="overflow-hidden rounded-xl shadow-lg bg-gray-800 border border-gray-700">
      <div className="px-6 py-4 bg-gray-800 border-b border-gray-700">
        <h3 className="font-bold text-white text-lg">Student List</h3>
        <p className="text-gray-400 text-sm mt-1">Displaying {students.length} students</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Last Active
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {students.map((student) => (
              <tr key={student.uid} className="hover:bg-gray-750 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {student.uid}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(student.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;