import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StudentList from "../components/StudentList";
import { Users, AlertCircle } from "lucide-react";
import AttendanceCamera from "../components/AttendanceCamera";
import ProxyAlert from "./ProxyAleart";

const TeacherDashboard = () => {
  const { currentUser, userRole } = useAuth();
  const [attendanceMode, setAttendanceMode] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [proxyAlert, setProxyAlert] = useState("");
  const [processing, setProcessing] = useState(false);
  const [studentsToCapture, setStudentsToCapture] = useState([]);
  const [currentStudentIdx, setCurrentStudentIdx] = useState(0);
  const [attendanceResults, setAttendanceResults] = useState([]);
  const [results, setResults] = useState([]);
  const [isProxyDetected, setIsProxyDetected] = useState(false);
  const [students, setStudents] = useState([]);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // You would normally use React Router for navigation
  useEffect(() => {
    if (!currentUser || userRole !== "teacher") {
      // This is just a stub since we aren't using actual routing
      console.log("Unauthorized access to teacher dashboard");
    }
  }, [currentUser, userRole]);

  // Camera access logic
  useEffect(() => {
    if (attendanceMode) {
      // Try to access webcam
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
          }
        })
        .catch((err) => {
          setProxyAlert("Camera access denied or unavailable.");
          setAttendanceMode(false);
        });
    } else {
      // Stop camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [attendanceMode]);

  // Fetch students for attendance (new entries only)
  const fetchNewStudents = async () => {
    try {
      const res = await fetch("http://localhost:5959/students");
      const data = await res.json();
      const filtered = data.filter((user) => user.role === "Student");
      setStudentsToCapture(filtered);
      setCurrentStudentIdx(0);
    } catch (e) {
      setProxyAlert("Failed to fetch students for attendance.");
    }
  };

  const handleStartAttendance = () => {
    setAttendanceMode(true);
    setProxyAlert("");
    fetchNewStudents();
    setCapturing(true);
    setAttendanceResults([]);
  };

  const handleCloseAttendance = () => {
    setAttendanceMode(false);
    setCapturing(false);
    setProxyAlert("");
    setCurrentStudentIdx(0);
    setStudentsToCapture([]);
    setAttendanceResults([]);
  };

  const handleCapture = async (blob) => {
    if (!studentsToCapture[currentStudentIdx]) return;
    setProcessing(true);
    const formData = new FormData();
    formData.append("image", blob);
    formData.append("uid", studentsToCapture[currentStudentIdx].uid);
    try {
      const res = await fetch("http://localhost:5959/recognize", {
        method: "POST",
        body: formData,
      });
      const res1 = await res.json();
      // console.log(result);
      // Save result for proxy detection
      // setAttendanceResults((prev) => [
      //   ...prev,
      //   { ...result, uid: studentsToCapture[currentStudentIdx].uid },
      // ]);
      const alreadyPresent = results.find((name) => name == res1.match);

      if (alreadyPresent) {
        setIsProxyDetected(true);
      }

      setResults((prev) => [...prev, res1.match]);
      setResults(results);
      // Proxy detection: check if same identity for different uids
      const seen = {};
      let proxyDetected = false;
      for (const entry of [
        ...attendanceResults,
        { ...result, uid: studentsToCapture[currentStudentIdx].uid },
      ]) {
        if (entry.identity) {
          if (seen[entry.identity] && seen[entry.identity] !== entry.uid) {
            setProxyAlert(
              `Proxy attendance detected for student: ${entry.identity}`
            );
            proxyDetected = true;
            break;
          }
          seen[entry.identity] = entry.uid;
        }
      }
      if (!proxyDetected) setProxyAlert("");
    } catch (e) {
      setProxyAlert("Face recognition failed.");
    }
    setProcessing(false);
    // Move to next student
    if (currentStudentIdx + 1 < studentsToCapture.length) {
      setCurrentStudentIdx(currentStudentIdx + 1);
    } else {
      setCapturing(false);
    }
  };

  if (!currentUser || userRole !== "teacher") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-300 mb-4">
            You must be logged in as a teacher to view this dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181a20] via-[#232946] to-[#121212] flex flex-col text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-2 py-8">
        <div className="flex items-center gap-3 mb-10">
          <span className="relative">
            <Users className="h-10 w-10 text-indigo-400 drop-shadow-lg" />
            <span className="absolute -inset-1 rounded-full bg-indigo-500 opacity-20 blur-lg"></span>
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow">
            Teacher Dashboard
          </h2>
        </div>
        <ProxyAlert isProxyDetected={isProxyDetected} />
        <div className="w-full max-w-2xl bg-gradient-to-br from-[#232946]/80 to-[#181a20]/80 border border-indigo-900/40 backdrop-blur-2xl p-8 rounded-2xl shadow-2xl mb-10">
          <h3 className="font-semibold text-2xl mb-3 text-indigo-300">
            Welcome, <span className="text-white">{currentUser.name}</span>
          </h3>
          <p className="text-indigo-100 text-lg">
            This dashboard provides an overview of student attendance.
            <br />
            <span className="text-indigo-400 font-semibold">
              Monitor each student's attendance percentage across all subjects.
            </span>
          </p>
        </div>

        <div className="flex gap-4 mb-6">
          {!attendanceMode && (
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow"
              onClick={handleStartAttendance}
            >
              Take Attendance
            </button>
          )}
          {attendanceMode && (
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow"
              onClick={handleCloseAttendance}
            >
              Close Attendance
            </button>
          )}
        </div>
        {attendanceMode &&
          capturing &&
          studentsToCapture[currentStudentIdx] && (
            <AttendanceCamera
              capturing={capturing}
              onCapture={handleCapture}
              onClose={handleCloseAttendance}
            />
          )}
        {proxyAlert && <div className="text-red-400 mb-4">{proxyAlert}</div>}
        {attendanceMode && !capturing && !processing && (
          <div className="text-green-400 mb-4">Attendance complete.</div>
        )}
        <div className="w-full max-w-4xl">
          <StudentList
            students={students}
            setStudents={setStudents}
            isProxyDetected={isProxyDetected}
            setProxyAlert={setProxyAlert}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeacherDashboard;
