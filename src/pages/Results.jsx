import React, { useRef } from 'react'
import { motion } from 'framer-motion';
import  html2pdf  from 'html2pdf.js';
import RiskGauge from '../components/RiskGauge';
import FactorInfluence from '../components/FactorInfluence';
import { AlertTriangle, ArrowRight, Download, Heart } from 'lucide-react';

function Results({ patientData, predictionResult, onNewPrediction }) {

  const reportRef = useRef();
  if (!patientData || !predictionResult) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800">No prediction data available</h2>
        <p className="mt-4 text-gray-600">Please complete the prediction form first.</p>
        <button
          onClick={onNewPrediction}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Go to Prediction Form
        </button>
      </div>
    );
  }

  const getRecommendations = () => {
    switch (predictionResult.riskLevel) {
      case 'low':
        return [
          "Continue with regular exercise and a balanced diet",
          "Maintain annual check-ups with your healthcare provider",
          "Monitor your blood pressure and cholesterol levels regularly",
          "Stay physically active with at least 150 minutes of moderate activity per week"
        ];
      case 'moderate':
        return [
          "Schedule a follow-up with your doctor within the next 3 months",
          "Consider dietary modifications to lower cholesterol and blood pressure",
          "Increase physical activity to at least 150 minutes per week",
          "Monitor your blood pressure more frequently",
          "Reduce sodium and saturated fat intake"
        ];
      case 'high':
        return [
          "Consult with a cardiologist as soon as possible",
          "Follow a heart-healthy diet plan recommended by healthcare professionals",
          "Begin a medically supervised exercise program",
          "Monitor your blood pressure daily",
          "Discuss medication options with your doctor",
          "Consider stress reduction techniques like meditation"
        ];
      default:
        return [];
    }
  };

  const handleExport = () => {
    const element = reportRef.current;
    const options = {
      margin: 0.5,
      filename: `Heart_Risk_Results_${Date.now()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    html2pdf().set(options).from(element).save();
  };


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
          <h1 className="text-3xl font-bold mb-3">Your Heart Disease Risk Assessment</h1>
          <p className="text-gray-600">
            Below is a detailed analysis of your heart disease risk based on the information provided.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-6">Risk Assessment</h2>
            <RiskGauge
              probability={predictionResult.probability}
              riskLevel={predictionResult.riskLevel}
            />
            <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-100">
              <div className="flex">
                <Heart className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  This assessment is based on statistical models and should be considered as a screening tool, not a diagnosis. Always consult with a healthcare professional for proper medical advice.
                </p>
              </div>
            </div>
          </motion.div>

          <FactorInfluence factors={predictionResult.contributingFactors} />
        </div>

        <motion.div
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
          {predictionResult.riskLevel === 'high' && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-100 flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> Your assessment indicates a high risk of heart disease. We strongly recommend consulting with a healthcare professional as soon as possible for a thorough evaluation.
              </p>
            </div>
          )}
          
          <ul className="space-y-3">
            {getRecommendations().map((recommendation, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <ArrowRight className="h-5 w-5 text-teal-500 mr-3 flex-shrink-0 mt-0.5" />
                <span>{recommendation}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={onNewPrediction}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center cursor-pointer"
          >
            New Prediction
          </button>

          <button
            className="no-print w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center cursor-pointer"
            onClick={handleExport}
          >
            <Download className="h-5 w-5 mr-2" />
            Export Results
          </button>
        </motion.div>

        <motion.div
          className="mt-10 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p>
            This prediction is based on general statistical models and is not a substitute for professional medical advice,
            diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider
            with any questions you may have regarding a medical condition.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Results
