import React from 'react'
import { motion } from 'framer-motion'
import { formFields } from '../utils/formFields'
import { Activity, AlertCircle, Heart, Info } from 'lucide-react';

function Help({isDarkMode}) {
    return (
        <motion.div
            className="container mx-auto px-4 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-4xl mx-auto">
                <motion.div
                    className="text-center mb-10"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <h1 className="text-3xl font-bold mb-3"><span className={`${isDarkMode ? ' text-white' : 'bg-white'}`}>Understanding Heart Disease Indicators</span></h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Learn about the medical measurements and indicators used in heart disease prediction.
                    </p>
                </motion.div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <Info className="h-6 w-6 text-blue-500" />
                        <h2 className="text-xl font-semibold dark:text-white">About the Prediction Model</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Our heart disease prediction model uses multiple health indicators to assess your risk level.
                        Understanding these indicators can help you provide more accurate information and better interpret your results.
                    </p>
                    <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <AlertCircle className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                            All measurements should be recent and accurate. Consult with healthcare professionals for proper medical tests and measurements.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {formFields.map((field, index) => (
                        <motion.div
                            key={field.id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                        >
                            <h3 className="text-xl font-semibold mb-3 dark:text-white">
                                {field.label}
                            </h3>
              
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Activity className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-600 dark:text-gray-300">{field.description}</p>
                                        {field.type === 'number' && field.min !== undefined && field.max !== undefined && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                Normal range: {field.min} - {field.max}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {field.options && (
                                    <div className="mt-4">
                                        <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-200">Possible Values:</h4>
                                        <ul className="space-y-2 pl-6">
                                            {field.options.map(option => (
                                                <li key={option.value} className="text-gray-600 dark:text-gray-300">
                                                    <span className="font-medium">{option.label}</span>
                                                    {field.id === 'cp' && (
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                            {option.value === 0 && "Classic symptoms of heart-related chest pain"}
                                                            {option.value === 1 && "Chest pain that may be heart-related but doesn't fit typical pattern"}
                                                            {option.value === 2 && "Chest pain not typical of heart-related issues"}
                                                            {option.value === 3 && "No chest pain symptoms"}
                                                        </p>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-10 p-6 bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl text-white text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="flex justify-center mb-4">
                        <Heart className="h-12 w-12" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Ready to Check Your Heart Health?</h2>
                    <p className="mb-6">
                        Use this knowledge to complete your heart disease risk assessment more accurately.
                    </p>
                    <button
                        onClick={() => window.location.href = '/prediction'}
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
                    >
                        Start Assessment
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Help
