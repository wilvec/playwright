import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { carsData } from '../data/cars';
import { Car as CarType } from '../types';
import { ChevronLeft, ChevronRight, Star, ArrowLeft, Fuel, Gauge, Calendar, Truck, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const CarDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<CarType | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Simulate loading
    setLoading(true);
    const timer = setTimeout(() => {
      const foundCar = carsData.find(c => c.id === Number(id));
      setCar(foundCar || null);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id, isAuthenticated, navigate]);

  const goToNextImage = () => {
    if (!car) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === car.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevImage = () => {
    if (!car) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? car.images.length - 1 : prevIndex - 1
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center pt-16">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Car not found</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">The car you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cars
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-6"
        >
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cars
          </button>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 h-[400px]"
          >
            <img 
              src={car.images[currentImageIndex]} 
              alt={`${car.make} ${car.model}`} 
              className="w-full h-full object-cover"
            />
            
            {car.images.length > 1 && (
              <>
                <button
                  onClick={goToPrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors duration-300"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={goToNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors duration-300"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {car.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 w-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {car.year} {car.make} {car.model}
              </h1>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                {formatPrice(car.price)}
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center space-x-2">
                <Fuel className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{car.fuelType}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Gauge className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{car.mileage.toLocaleString()} miles</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{car.year}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{car.transmission}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{car.engine}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{car.horsepower} hp</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-400">{car.description}</p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Features</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {car.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                <span>Contact Seller</span>
              </button>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Vehicle Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Exterior</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Color</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{car.exteriorColor}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Body</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Sedan</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Interior</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Color</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{car.interiorColor}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Seats</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">5</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Performance</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Engine</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{car.engine}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Horsepower</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{car.horsepower} hp</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CarDetailsPage;