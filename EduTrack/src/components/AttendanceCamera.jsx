import React, { useRef, useEffect, useState } from "react";

const AttendanceCamera = ({ onCapture, onClose, capturing }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (capturing) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch((err) => {
          setError("Camera access denied or unavailable.");
        });
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [capturing]);

  const handleCapture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob) {
        onCapture(blob);
      } else {
        setError("Image capture failed.");
      }
    }, "image/jpeg");
  };

  if (!capturing) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
      <video ref={videoRef} autoPlay playsInline className="rounded-lg shadow-lg w-full max-w-md mb-4" />
      {error && <div className="text-red-400 mb-2">{error}</div>}
      <div className="flex gap-4">
        <button onClick={handleCapture} className="px-4 py-2 bg-indigo-600 text-white rounded">Capture</button>
        <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded">Close Attendance</button>
      </div>
    </div>
  );
};

export default AttendanceCamera;
