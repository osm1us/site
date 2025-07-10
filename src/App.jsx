import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import CustomCursor from './components/CustomCursor';
import HomePage from './pages/HomePage';
import './index.css';

const App = () => {
  return (
    <div className="App font-sans text-light-slate">
      <CustomCursor />
      <AnimatedBackground />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

