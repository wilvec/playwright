import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { carsData } from '../data/cars';
import { Car, Search, X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const CarListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCars, setFilteredCars] = useState(carsData);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [selectedMakes, setSelectedMakes] = useState<string[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    let result = carsData;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        car => 
          car.make.toLowerCase().includes(term) || 
          car.model.toLowerCase().includes(term) ||
          `${car.year}`.includes(term) ||
          car.exteriorColor.toLowerCase().includes(term)
      );
    }
    
    // Apply price filter
    result = result.filter(
      car => car.price >= priceRange[0] && car.price <= priceRange[1]
    );
    
    // Apply make filter
    if (selectedMakes.length > 0) {
      result = result.filter(car => selectedMakes.includes(car.make));
    }
    
    // Apply fuel type filter
    if (selectedFuelTypes.length > 0) {
      result = result.filter(car => selectedFuelTypes.includes(car.fuelType));
    }
    
    setFilteredCars(result);
  }, [searchTerm, priceRange, selectedMakes, selectedFuelTypes]);

  const availableMakes = Array.from(new Set(carsData.map(car => car.make)));
  const availableFuelTypes = Array.from(new Set(carsData.map(car => car.fuelType)));
  
  const handleMakeToggle = (make: string) => {
    setSelectedMakes(prev => 
      prev.includes(make)
        ? prev.filter(m => m !== make)
        : [...prev, make]
    );
  };
  
  const handleFuelTypeToggle = (fuelType: string) => {
    setSelectedFuelTypes(prev => 
      prev.includes(fuelType)
        ? prev.filter(ft => ft !== fuelType)
        : [...prev, fuelType]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 200000]);
    setSelectedMakes([]);
    setSelectedFuelTypes([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="py-10">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between flex-wrap gap-4"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Discover Your Dream Car
            </h1>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              {searchTerm && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                </button>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Price Range Filter */}
                    <div>
                      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Price Range</h3>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ${priceRange[0].toLocaleString()}
                        </span>
                        <input
                          type="range"
                          min="0"
                          max="200000"
                          step="5000"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ${priceRange[1].toLocaleString()}
                        </span>
                        <input
                          type="range"
                          min="0"
                          max="200000"
                          step="5000"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>
                    </div>
                    
                    {/* Make Filter */}
                    <div>
                      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Make</h3>
                      <div className="space-y-1">
                        {availableMakes.map(make => (
                          <div key={make} className="flex items-center">
                            <input
                              id={`make-${make}`}
                              type="checkbox"
                              checked={selectedMakes.includes(make)}
                              onChange={() => handleMakeToggle(make)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`make-${make}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                              {make}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Fuel Type Filter */}
                    <div>
                      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Fuel Type</h3>
                      <div className="space-y-1">
                        {availableFuelTypes.map(fuelType => (
                          <div key={fuelType} className="flex items-center">
                            <input
                              id={`fuel-${fuelType}`}
                              type="checkbox"
                              checked={selectedFuelTypes.includes(fuelType)}
                              onChange={() => handleFuelTypeToggle(fuelType)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`fuel-${fuelType}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                              {fuelType}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                    >
                      Clear Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {filteredCars.length === 0 ? (
            <div className="mt-10 text-center py-12">
              <Car className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No cars found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
              <div className="mt-6">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-300 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 transition-colors duration-300"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CarListPage;