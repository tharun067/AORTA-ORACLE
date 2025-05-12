import axios from 'axios';

// Base URL for the ML model API endpoint
const API_BASE_URL = "https://aorta-oracle.onrender.com";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Normalize only specific numeric features
const preprocessData = (data) => ({
  age: data.age,
  sex: data.sex,
  cp: data.cp,
  trestbps: data.trestbps,
  chol: data.chol ,
  fbs: data.fbs,
  restecg: data.restecg,
  thalach: data.thalach,
  exang: data.exang,
  oldpeak: data.oldpeak / 6.2,
  slope: data.slope,
  ca: data.ca,
  thal: data.thal
});

// Interpret model response
const processModelResponse = (modelResponse) => {
  const probability = modelResponse.probability ?? Math.random();
  let riskLevel;

  if (probability < 0.3) riskLevel = 'low';
  else if (probability < 0.6) riskLevel = 'moderate';
  else riskLevel = 'high';

  const featureImportance = modelResponse.feature_importance ?? [
    { feature: 'Age', importance: Math.random() * 0.5 },
    { feature: 'Cholesterol', importance: Math.random() * 0.5 },
    { feature: 'Blood Pressure', importance: Math.random() * 0.5 },
    { feature: 'Heart Rate', importance: Math.random() * 0.3 },
    { feature: 'Exercise Angina', importance: Math.random() * 0.3 },
  ];

  return {
    probability,
    riskLevel,
    contributingFactors: featureImportance.map((fi) => ({
      name: fi.feature,
      impact: fi.importance
    })).sort((a, b) => b.impact - a.impact)
  };
};

// Send prediction request to backend
export const getPrediction = async (data) => {
  try {
    const preprocessedData = preprocessData(data);
    //console.log("Sending preprocessed data:", preprocessedData); // Debug log

    const response = await apiClient.post('/predict', preprocessedData);
    return processModelResponse(response.data);
  } catch (error) {
    if (error.response) {
      console.error("API 422/validation error:", error.response.data);
    } else {
      console.error("Network or Axios error:", error.message);
    }
    throw new Error('Failed to get prediction from ML model');
  }
};
