import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import db from "../../public/data/db.json";
import { rfidStudentMap } from "../../public/data/rfidMap.js";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Initialize state from localStorage if available
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || null;
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Effect to handle authentication on route changes or app initialization
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    const savedRole = localStorage.getItem("userRole");

    if (savedUser && savedRole) {
      const user = JSON.parse(savedUser);

      // Update state if not already set
      if (!currentUser) {
        setCurrentUser(user);
        setUserRole(savedRole);
      }

      // Redirect to appropriate dashboard if on login page
      if (location.pathname === "/login") {
        navigate(savedRole === "teacher" ? "/teacher" : "/student");
      }
    }
  }, [location.pathname, navigate, currentUser]);

  const login = (usnInput, role) => {
    setError("");
    if (role === "teacher") {
      // For teachers, treat USN as UID
      const user = db.find((u) => u.uid === usnInput && u.role === "Teacher");
      if (user) {
        setCurrentUser(user);
        setUserRole(role);
        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.setItem("userRole", role);
        navigate("/teacher");
        return true;
      }
      setError("Teacher ID not found");
      return false;
    } else {
      // For students, find UID by USN in rfidStudentMap
      const uid = Object.keys(rfidStudentMap).find(
        (key) => rfidStudentMap[key].usn === usnInput
      );
      if (uid) {
        // Check if UID is present in db.js (attendance taken)
        const dbStudent = db.find((u) => u.uid === uid && u.role === "Student");
        if (dbStudent) {
          const user = {
            ...dbStudent,
            ...rfidStudentMap[uid],
          };
          setCurrentUser(user);
          setUserRole(role);
          localStorage.setItem("currentUser", JSON.stringify(user));
          localStorage.setItem("userRole", role);
          navigate("/student");
          return true;
        }
      }
      setError("Attendance not taken or USN not found");
      return false;
    }
  };
  const logout = () => {
    setCurrentUser(null);
    setUserRole(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const value = {
    currentUser,
    userRole,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
