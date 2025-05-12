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


const preprocessData = (data) => {
  return {
    ...data,
    age: (data.age - 29) / (77 - 29),
    trestbps: (data.trestbps - 94) / (200 - 94),
    chol: (data.chol - 126) / (564 - 126),
    thalach: (data.thalach - 71) / (202 - 71),
    oldpeak: data.oldpeak / 6.2
  };
};


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

export const getPrediction = async (data) => {
    try {
        const preprocessedData = preprocessData(data);
        const response = await apiClient.post('/predict', preprocessedData);
        return processModelResponse(response.data);
    } catch (error) {
        console.error('Error fetching prediction:', error);
        throw new Error('Failed to get prediction from ML model');
    }
};


