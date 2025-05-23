import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowLeft, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Car as CarType } from "../types";
import { carsData } from "../data/cars";

const AddCarPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    price: "",
    mileage: "",
    exteriorColor: "",
    interiorColor: "",
    fuelType: "Gasoline",
    transmission: "Automatic",
    engine: "",
    horsepower: "",
    description: "",
    images: ["", ""],
    features: ["", "", "", "", "", ""],
  });
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({
      ...prev,
      features: newFeatures,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShowSuccess(false);
    // Basic validation
    if (
      !formData.make ||
      !formData.model ||
      !formData.price ||
      !formData.mileage
    ) {
      setError("Please fill in all required fields");
      return;
    }

    // Create new car object
    const newCar: CarType = {
      id: carsData.length + 1,
      make: formData.make,
      model: formData.model,
      year: Number(formData.year),
      price: Number(formData.price),
      mileage: Number(formData.mileage),
      exteriorColor: formData.exteriorColor,
      interiorColor: formData.interiorColor,
      fuelType: formData.fuelType,
      transmission: formData.transmission,
      engine: formData.engine,
      horsepower: Number(formData.horsepower),
      images: formData.images.filter((img) => img !== ""),
      features: formData.features.filter((feature) => feature !== ""),
      description: formData.description,
    };

    // Add the new car to the data
    carsData.push(newCar);

    // Navigate back to the car list
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between py-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Cars
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Add New Car
            </h1>
          </div>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded-md flex items-center justify-center"
              >
                <Check className="h-5 w-5 mr-2" />
                Car added successfully! Redirecting...
              </motion.div>
            )}
          </AnimatePresence>

          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mt-4"
          >
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Make *
                </label>
                <input
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Model *
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                  required
                />
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mileage *
                </label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Exterior Color
                </label>
                <input
                  type="text"
                  name="exteriorColor"
                  value={formData.exteriorColor}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Interior Color
                </label>
                <input
                  type="text"
                  name="interiorColor"
                  value={formData.interiorColor}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fuel Type
                </label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                >
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Transmission
                </label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="CVT">CVT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Engine
                </label>
                <input
                  type="text"
                  name="engine"
                  value={formData.engine}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Horsepower
                </label>
                <input
                  type="number"
                  name="horsepower"
                  value={formData.horsepower}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                />
              </div>
            </div>

            {/* Images */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Images
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Image URL {index + 1}
                    </label>
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.features.map((feature, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Feature {index + 1}
                    </label>
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                      placeholder="e.g., Leather Seats"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
              />
            </div>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Car
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddCarPage;
