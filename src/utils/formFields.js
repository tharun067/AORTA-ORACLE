export const formFields = [
  {
    id: 'age',
    label: 'Age',
    type: 'number',
    min: 15,
    max: 80,
    description: 'Age of the patient in years',
    required: true
  },
  {
    id: 'sex',
    label: 'Sex',
    type: 'select',
    options: [
      { value: 0, label: 'Female' },
      { value: 1, label: 'Male' },
    ],
    description: 'Sex of the patient',
    required: true
  },
  {
    id: 'cp',
    label: 'Chest Pain Type',
    type: 'select',
    options: [
      { value: 0, label: 'Typical Angina' },
      { value: 1, label: 'Atypical Angina' },
      { value: 2, label: 'Non-anginal Pain' },
      { value: 3, label: 'Asymptomatic' }
    ],
    description: 'Type of chest pain experienced',
    required: true
  },
  {
    id: 'trestbps',
    label: 'Resting Blood Pressure',
    type:'number',
    min: 94,
    max: 120,
    description: 'Resting blood pressure in mm Hg',
    required: true
  },
  {
    id: 'chol',
    label: 'Serum Cholesterol',
    type:'number',
    min: 126,
    max: 564,
    description: 'Serum cholesterol in mg/dl',
    required: true
  },
  {
    id: 'fbs',
    label: 'Fasting Blood Sugar',
    type: 'select',
    options: [
      { value: 0, label: '<= 120 mg/dl' },
      { value: 1, label: '> 120 mg/dl' },
    ],
    description: 'Fasting blood sugar level',
    required: true
  },
  {
    id: 'restecg',
    label: 'Resting ECG',
    type: 'select',
    options: [
      { value: 0, label: 'Normal' },
      { value: 1, label: 'ST-T Wave Abnormality' },
      { value: 2, label: 'Left Ventricular Hypertrophy' }
    ],
    description: 'Resting electrocardiographic results',
    required: true
  },
  {
    id: 'thalach',
    label: 'Maximum Heart Rate',
    type:'number',
    min: 71,
    max: 202,
    description: 'Maximum heart rate achieved',
    required: true
  },
  {
    id: 'exang',
    label: 'Exercise-Included Angina',
    type: 'select',
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Yes' },
    ],
    description: 'Exercise-induced angina',
    required: true
  },
  {
    id: 'oldpeak',
    label: 'ST Depression',
    type: 'number',
    min: 0,
    max: 6.2,
    step: 0.1,
    description: 'ST depression induced by exercise relative to rest',
    required: true
  },
  {
    id: 'slope',
    label: 'slope of peak Exercise ST Segment',
    type: 'select',
    options: [
      { value: 0, label: 'UpSloping' },
      { value: 1, label: 'Flat' },
      { value: 2, label: 'DownSloping' }
    ],
    description: 'The slope of the peak exercise ST segment',
    required: true
  },
  {
    id: 'ca',
    label: 'Number of Major Vessels',
    type: 'select',
    options: [
      { value: 0, label: '0' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' }
    ],
    description: 'Number of major vessels colored by fluoroscopy',
    required: true
  },
  {
    id: 'thal',
    label: 'Thalassemia',
    type: 'select',
    options: [
      { value: 0, label: 'Normal' },
      { value: 1, label: 'Fixed Defect' },
      { value: 2, label: 'Reversible Defect' }
    ],
    description: 'Type of heart defect',
    required: true
  },
]