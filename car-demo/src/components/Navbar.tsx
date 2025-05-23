import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Car, Moon, Sun, Menu, X, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      } dark:text-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-semibold">CarShowcase</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && (
              <>
                <Link 
                  to="/" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                >
                  Home
                </Link>
                <Link 
                  to="/add-car" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Car
                </Link>
                <button 
                  onClick={toggleDarkMode} 
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                >
                  <span>Logout</span>
                  <LogOut size={18} />
                </button>
              </>
            )}
            {!isAuthenticated && (
              <Link 
                to="/login" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
        >
          <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated && (
              <>
                <Link 
                  to="/" 
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/add-car" 
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Car
                  </div>
                </Link>
                <button 
                  onClick={toggleDarkMode} 
                  className="w-full text-left flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition duration-300"
                >
                  {darkMode ? (
                    <>
                      <Sun size={18} className="mr-2" /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon size={18} className="mr-2" /> Dark Mode
                    </>
                  )}
                </button>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition duration-300"
                >
                  <LogOut size={18} className="mr-2" /> Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <Link 
                to="/login" 
                className="block px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;