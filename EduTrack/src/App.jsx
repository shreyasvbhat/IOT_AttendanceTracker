import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";
import Loader from "./components/Loader";

// Protected route component
const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser, userRole } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage first in case context hasn't loaded yet
    const savedUser = localStorage.getItem("currentUser");
    const savedRole = localStorage.getItem("userRole");

    if (currentUser || savedUser) {
      const effectiveRole = userRole || savedRole;

      if (!allowedRole || effectiveRole === allowedRole) {
        setIsAuthorized(true);
      }
    }

    setIsLoading(false);
  }, [currentUser, userRole, allowedRole]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Home redirect component that checks both context and localStorage
const HomeRedirect = () => {
  const { currentUser, userRole } = useAuth();
  const [redirectPath, setRedirectPath] = useState("/login");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // First check if we have auth context
    if (currentUser) {
      setRedirectPath(userRole === "teacher" ? "/teacher" : "/student");
      setIsLoading(false);
      return;
    }

    // Fall back to localStorage
    const savedUser = localStorage.getItem("currentUser");
    const savedRole = localStorage.getItem("userRole");

    if (savedUser && savedRole) {
      setRedirectPath(savedRole === "teacher" ? "/teacher" : "/student");
    }

    setIsLoading(false);
  }, [currentUser, userRole]);

  if (isLoading) {
    return <Loader />;
  }

  return <Navigate to={redirectPath} replace />;
};

// Main App Content that uses auth context
const AppContent = () => {
  const { currentUser, userRole } = useAuth();
  const [loading, setLoading] = useState(true);

  // Simulate a short loading time when the app starts
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <Routes>
      <Route
        path="/login"
        element={
          currentUser ? (
            <Navigate
              to={userRole === "teacher" ? "/teacher" : "/student"}
              replace
            />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<HomeRedirect />} />

      {/* 404 Not Found route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
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
