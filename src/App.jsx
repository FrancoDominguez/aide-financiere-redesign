import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import AppDrawer from "./components/drawer";
import LoginPage from "./pages/loginPage";
import MyAccountPage from "./pages/myAccountPage";
import SignupPage from "./pages/signupPage";
import LandingPage from "./pages/landingPage";
import ApplicationPage from "./pages/applicationPage";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function AppContent() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to landing page if logged in and trying to access login/signup
  useEffect(() => {
    if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/')) {
      navigate('/landing');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AppDrawer open={open} toggleDrawer={toggleDrawer} />
      <Header onOpenDrawer={toggleDrawer(true)} />
      <main className="flex-grow container mx-auto p-6 block items-center justify-center">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Protected routes */}
          <Route path="/landing" element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          } />
          <Route path="/my-account" element={
            <ProtectedRoute>
              <MyAccountPage />
            </ProtectedRoute>
          } />
          <Route path="/application" element={
            <ProtectedRoute>
              <ApplicationPage />
            </ProtectedRoute>
          } />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
