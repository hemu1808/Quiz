import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { GlobalStyles } from './styles/GlobalStyles'; 
import HomeScreen from './components/HomeScreen';
import QuizPage from './components/QuizPage';
import ScorePage from './components/ScorePage';
import LearningPage from './components/LearningPage';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/quiz/:topic" element={<QuizPage />} />
        <Route path="/score" element={<ScorePage />} />
        <Route path="/learn/:topic" element={<LearningPage />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <AnimatedRoutes />
      </Router>
    </>
  );
}

export default App;