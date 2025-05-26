import React, { createContext, useContext, useState } from "react";
import db from "../../public/data/db.json";
import { rfidStudentMap } from "../../public/data/rfidMap.js";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState("");

  const login = (usnInput, role) => {
    setError("");
    if (role === "teacher") {
      // For teachers, treat USN as UID
      const user = db.find((u) => u.uid === usnInput && u.role === "Teacher");
      if (user) {
        setCurrentUser(user);
        setUserRole(role);
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
