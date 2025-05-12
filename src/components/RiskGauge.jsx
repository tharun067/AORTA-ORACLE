import React from 'react'
import { motion } from 'framer-motion';

function RiskGauge({ probability, riskLevel }) {
  const percentage = Math.round(probability * 100);
  const needleRotation = -90 + (probability * 180);

  const getGaugeColor = () => {
    if (riskLevel === 'low') return 'from-green-500 to-green-600';
    if (riskLevel === 'moderate') return 'from-yellow-500 to-orange-500';
    return 'from-orange-500 to-red-600';
  };

  const getTextColor = () => {
    if (riskLevel === 'low') return 'text-green-600';
    if (riskLevel === 'moderate') return 'text-orange-500';
    return 'text-red-600';
  };

  return (
    <div className="relative w-full max-w-xs mx-auto">
      {/* Gauge background */}
      <div className="relative h-40 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gray-200 rounded-t-full">
          {/* Color gradient fill */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-r ${getGaugeColor()} rounded-t-full`}
            style={{
              height: '100%',
              clipPath: `polygon(0% 100%, 100% 100%, 100% ${100 - percentage}%, 0% ${100 - percentage}%)`
            }}
          />
          
          {/* Gauge tick marks */}
          <div className="absolute bottom-0 left-0 right-0 h-full">
            {[0, 20, 40, 60, 80, 100].map(tick => (
              <div
                key={tick}
                className="absolute bottom-0 w-1 h-3 bg-gray-500"
                style={{
                  left: `${tick}%`,
                  transform: 'translateX(-50%)'
                }}
              />
            ))}
          </div>
          
          {/* Needle */}
          <motion.div
            className="absolute bottom-0 left-1/2 origin-bottom"
            initial={{ rotate: -90 }}
            animate={{ rotate: needleRotation }}
            transition={{
              type: 'spring',
              stiffness: 65,
              damping: 15
            }}
            style={{
              height: '80%',
              transformOrigin: 'bottom center',
              willChange: 'transform',
            }}
          >
            <div className="w-1 h-full bg-gray-800 rounded-t-full" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full border-2 border-white" />
          </motion.div>
        </div>
      </div>
      
      {/* Percentage display */}
      <div className="text-center mt-4">
        <motion.div
          className={`text-4xl font-bold ${getTextColor()}`}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.5,
            type: 'spring',
            stiffness: 80
          }}
        >
          {percentage}%
        </motion.div>
        <motion.div
          className={`text-lg font-medium uppercase ${getTextColor()}`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {riskLevel} risk
        </motion.div>
      </div>
      
      {/* Risk labels */}
      <div className="flex justify-between mt-1 text-xs text-gray-600">
        <span>Low Risk</span>
        <span>Moderate</span>
        <span>High Risk</span>
      </div>
    </div>
  );
};

export default RiskGauge
