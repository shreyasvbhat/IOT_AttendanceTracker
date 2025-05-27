import React, { useEffect, useState } from "react";

const PhotoCaptureReminder = ({ visible, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);

      // Auto-hide after 4 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-600 text-white p-6 rounded-xl shadow-2xl z-50 w-full max-w-md">
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-amber-200 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-xl font-bold mb-2">Action Required</h3>
        <p className="text-center mb-4">
          {message || "Please capture photo before scanning ID card."}
        </p>
        <button
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          className="px-4 py-2 bg-white text-amber-600 rounded-md font-medium hover:bg-amber-100 transition-colors"
        >
          Understood
        </button>
      </div>
    </div>
  );
};

export default PhotoCaptureReminder;
