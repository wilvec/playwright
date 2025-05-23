import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CarListPage from './pages/CarListPage';
import CarDetailsPage from './pages/CarDetailsPage';
import AddCarPage from './pages/AddCarPage';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return element;
};

function App() {
  const { isAuthenticated } = useAuth();

  // Update page title
  useEffect(() => {
    document.title = "CarShowcase - Find Your Dream Car";
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute element={<CarListPage />} />
        } />
        <Route path="/cars/:id" element={
          <ProtectedRoute element={<CarDetailsPage />} />
        } />
        <Route path="/add-car" element={
          <ProtectedRoute element={<AddCarPage />} />
        } />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </div>
  );
}

export default App;