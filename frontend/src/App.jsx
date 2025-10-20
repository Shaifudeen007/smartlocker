// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LockerList from './components/LockerList';
import AdminLockerManagement from './pages/AdminLockerManagement';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  return user && user.is_admin ? children : <Navigate to="/lockers" />;
};

// Layout component for pages with Navbar
const LayoutWithNavbar = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected user routes with Navbar */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <LayoutWithNavbar>
                  <Dashboard />
                </LayoutWithNavbar>
              </ProtectedRoute>
            } />
            
            <Route path="/lockers" element={
              <ProtectedRoute>
                <LayoutWithNavbar>
                  <LockerList />
                </LayoutWithNavbar>
              </ProtectedRoute>
            } />
            
            {/* Admin routes with Navbar */}
            <Route path="/admin/lockers" element={
              <AdminRoute>
                <LayoutWithNavbar>
                  <AdminLockerManagement />
                </LayoutWithNavbar>
              </AdminRoute>
            } />
            
            {/* Redirect all other routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;