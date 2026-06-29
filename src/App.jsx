import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import { DarkModeProvider } from "./context/DarkModeContext";
import { NotificationProvider } from "./context/NotificationContext";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Technology from "./pages/Technology";
import Screening from "./pages/Screening";
import ForProfessionals from "./pages/ForProfessionals";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";

// Protected Pages
import Dashboard from "./pages/Dashboard";
import NewAnalysis from "./pages/NewAnalysis";
import MyReports from "./pages/MyReports";
import Profile from "./pages/Profile";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserManagement from "./pages/Admin/UserManagement";
import DocumentationManager from "./pages/Admin/DocumentationManager";
import AdminSettings from "./pages/Admin/AdminSettings";
import AdminAnalytics from "./pages/Admin/AdminAnalytics";
import ContentManager from "./pages/Admin/ContentManager";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("isAdminLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("isAdminLoggedIn", isAdminLoggedIn);
  }, [isAdminLoggedIn]);

  return (
    <NotificationProvider>
      <DarkModeProvider>
        <Router basename="/parkinsons-project">
          <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/screening" element={<Screening />} />
          <Route path="/for-professionals" element={<ForProfessionals />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/signup"
            element={<Signup setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/admin-login"
            element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />}
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/new-analysis"
            element={
              isLoggedIn ? (
                <NewAnalysis setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/my-reports"
            element={
              isLoggedIn ? (
                <MyReports setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <Profile setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              isAdminLoggedIn ? (
                <AdminDashboard setIsLoggedIn={setIsAdminLoggedIn} />
              ) : (
                <Navigate to="/admin-login" />
              )
            }
          />
          <Route
            path="/admin/users"
            element={
              isAdminLoggedIn ? (
                <UserManagement setIsLoggedIn={setIsAdminLoggedIn} />
              ) : (
                <Navigate to="/admin-login" />
              )
            }
          />
          <Route
            path="/admin/docs/fyp"
            element={
              isAdminLoggedIn ? (
                <DocumentationManager setIsLoggedIn={setIsAdminLoggedIn} />
              ) : (
                <Navigate to="/admin-login" />
              )
            }
          />
          <Route
            path="/admin/settings"
            element={
              isAdminLoggedIn ? (
                <AdminSettings setIsLoggedIn={setIsAdminLoggedIn} />
              ) : (
                <Navigate to="/admin-login" />
              )
            }
          />
          <Route
            path="/admin/analytics"
            element={
              isAdminLoggedIn ? (
                <AdminAnalytics setIsLoggedIn={setIsAdminLoggedIn} />
              ) : (
                <Navigate to="/admin-login" />
              )
            }
          />
          <Route
            path="/admin/content"
            element={
              isAdminLoggedIn ? (
                <ContentManager setIsLoggedIn={setIsAdminLoggedIn} />
              ) : (
                <Navigate to="/admin-login" />
              )
            }
          />

          {/* Catch all - show 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </DarkModeProvider>
    </NotificationProvider>
  );
}
