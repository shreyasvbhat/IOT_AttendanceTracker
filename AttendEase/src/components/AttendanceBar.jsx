import React from 'react';

const AttendanceBar = ({ percentage }) => {
  let color = '';
  
  if (percentage >= 85) {
    color = 'bg-emerald-500';
  } else if (percentage >= 75) {
    color = 'bg-green-500';
  } else if (percentage >= 65) {
    color = 'bg-yellow-500';
  } else {
    color = 'bg-red-500';
  }

  return (
    <div className="w-full bg-gray-700 rounded-full h-3">
      <div 
        className={`${color} h-3 rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default AttendanceBar;