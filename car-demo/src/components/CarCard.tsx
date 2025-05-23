import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';
import { motion } from 'framer-motion';

interface CarCardProps {
  car: Car;
  index: number;
}

const CarCard: React.FC<CarCardProps> = ({ car, index }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
    >
      <Link to={`/cars/${car.id}`} className="block h-full">
        <div className="h-48 overflow-hidden">
          <img 
            src={car.images[0]} 
            alt={`${car.make} ${car.model}`} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {car.year} {car.make} {car.model}
            </h3>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              {formatPrice(car.price)}
            </span>
          </div>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <div className="flex justify-between text-sm">
              <span>{car.mileage.toLocaleString()} miles</span>
              <span>{car.transmission}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{car.fuelType}</span>
              <span>{car.exteriorColor}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {car.description.substring(0, 120)}...
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CarCard;