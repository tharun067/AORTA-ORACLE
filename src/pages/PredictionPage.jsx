import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { formFields } from '../utils/formFields';
import FormField from '../components/FormField';
import { AlertCircle } from 'lucide-react';

//default values for the form
const defaultValues = {
  age: 45,
  sex: 0,
  cp: 0,
  trestbps: 120,
  chol: 200,
  fbs: 0,
  restecg: 0,
  thalach: 150,
  exang: 0,
  oldpeak: 0,
  slope: 0,
  ca: 0,
  thal: 0
}
function PredictionPage({ onSubmit,isDarkMode }) {
  const [formData, setFormData] = useState(defaultValues);
  const [currentSection, setCurrentSection] = useState(0);
  const [validationErrors, setValidationErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const sections = [
    formFields.slice(0, 5),
    formFields.slice(5, 9),
    formFields.slice(9, 13)
  ];
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setApiError(null);
  };

  const validateSection = (sectionIndex) => {
    const errors = [];
    for (const field of sections[sectionIndex]) {
      const value = formData[field.id];
      if (field.required && (value === undefined || value === null || value === '')) {
        errors.push(`${field.label} is required`)
      }
      if (field.type === 'number' && value !== undefined && value !== null) {
        if (field.min !== undefined && value < field.min) {
          errors.push(`${field.label} must be at least ${field.min}`);
        }
        if (field.max !== undefined && value > field.max) {
          errors.push(`${field.label} must be at most ${field.max}`);
        }
      }
    }
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const nextSection = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const prevSection = () => {
    setCurrentSection(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateSection(currentSection)) {
      setIsLoading(true);
      setApiError(null);
      try {
        await onSubmit(formData)
      } catch (error) {
        setApiError('Failed to get prediction. Please try again later.');
        console.error('Prediction error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const sectionTitles = [
    "Personal Information",
    "Heart Measurements",
    "Additional Factors"
  ];

  const progressPercentage = ((currentSection + 1) / sections.length) * 100;

  return (
    <motion.div 
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="mb-10 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold"><span className={`${isDarkMode ? 'text-white':'text-black'}`}>Heart Disease Risk Assessment</span></h1>
          <p className="text-gray-600 mt-2">
            Please fill in your health information accurately for the best prediction results.
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Section {currentSection + 1} of {sections.length}: {sectionTitles[currentSection]}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-600 to-teal-500"
              initial={{ width: `${((currentSection) / sections.length) * 100}%` }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {validationErrors.length > 0 && (
          <motion.div 
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center text-red-600 mb-2">
              <AlertCircle className="h-5 w-5 mr-2" />
              <h4 className="font-semibold">Please correct the following issues:</h4>
            </div>
            <ul className="list-disc pl-10 text-red-600 text-sm">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {apiError && (
          <motion.div 
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center text-red-600">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p>{apiError}</p>
            </div>
          </motion.div>
        )}

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <form onSubmit={handleSubmit}>
            <AnimatedSection key={currentSection}>
              {sections[currentSection].map(field => (
                <FormField 
                  key={field.id}
                  field={field}
                  value={formData[field.id]}
                  onChange={handleChange}
                />
              ))}
            </AnimatedSection>

            <div className="flex justify-between mt-8">
              {currentSection > 0 ? (
                <button
                  type="button"
                  onClick={prevSection}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
                  disabled={isLoading}
                >
                  Previous
                </button>
              ) : <div></div>}

              {currentSection < sections.length - 1 ? (
                <button
                  type="button"
                  onClick={nextSection}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
                  disabled={isLoading}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:from-blue-700 hover:to-teal-600 transition-colors duration-300 flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Get Prediction'
                  )}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

const AnimatedSection = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default PredictionPage
