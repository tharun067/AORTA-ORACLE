import React from 'react'
import { motion } from 'framer-motion';
import { Activity, BarChart2, Shield, Zap } from 'lucide-react';

function Home({ onGetStarted,isDarkMode }) {
  
  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center mb-20">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className={`${isDarkMode ? ' text-white' : ''}`}>Predict Heart Disease Risk with</span>
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"> Advanced AI</span>
          </motion.h1>
          
          <motion.p
            className="text-gray-600 text-lg mb-8 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Our cutting-edge algorithm analyzes your health metrics to provide personalized heart disease risk assessment. Early detection can save lives.
          </motion.p>
          
          <motion.button
            onClick={onGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>
        </div>
        
        <div className="md:w-1/2">
          <motion.img
            src="https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Doctor reviewing heart health data"
            className="rounded-2xl shadow-2xl w-full h-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
          />
        </div>
      </div>
      
      {/* Features */}
      <div className="mb-20">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Why Use AORTA ORACLE ?
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Activity className="h-10 w-10 text-blue-500" />,
              title: "Accurate Prediction",
              description: "Our model uses 13 key health indicators to provide a precise risk assessment."
            },
            {
              icon: <Zap className="h-10 w-10 text-teal-500" />,
              title: "Instant Results",
              description: "Get your heart disease risk evaluation immediately after entering your data."
            },
            {
              icon: <BarChart2 className="h-10 w-10 text-indigo-500" />,
              title: "Detailed Analysis",
              description: "Understand which factors contribute most to your risk level."
            },
            {
              icon: <Shield className="h-10 w-10 text-purple-500" />,
              title: "Private & Secure",
              description: "Your health data remains confidential and is never stored on our servers."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-gray-50 p-4 rounded-lg inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* CTA */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-10 text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to assess your heart health?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Take the first step toward a healthier future by understanding your risk factors today.
        </p>
        <motion.button
          onClick={onGetStarted}
          className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Prediction
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Home
