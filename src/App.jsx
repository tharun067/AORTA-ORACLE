import { useState } from 'react';
import Home from './pages/Home';
import PredictionPage from './pages/PredictionPage';
import Results from './pages/Results';
import Help from './pages/Help';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { AnimatePresence } from 'framer-motion';
import { getPrediction } from './services/api';


function App() {

  const [currentPage, setCurrentPage] = useState('home');
  const [patientData, setPatientData] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigateTo = (page) => {
    setCurrentPage(page);
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }
  const handleFormSubmission = async (data) => {
    setPatientData(data);
    const result = await getPrediction(data);
    setPredictionResult(result);
    navigateTo('results');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home
          onGetStarted={() => navigateTo('form')}
          isDarkMode={isDarkMode}
        />;
      case 'form':
        return <PredictionPage
          onSubmit={handleFormSubmission}
          isDarkMode={isDarkMode}
        />;
      case 'results':
        return <Results
          patientData={patientData}
          predictionResult={predictionResult}
          onNewPrediction={() => navigateTo('form')}
        />
      case 'help':
        return <Help isDarkMode={isDarkMode}/>
      default:
        return null;
    }
  };
  return (
    <>
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <NavBar
          onNavigate={navigateTo}
          currentPage={currentPage}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
        <main className='flex-grow'>
          <AnimatePresence mode='wait'>
            {renderCurrentPage()}
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App
