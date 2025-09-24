import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Report from './Components/Report/Report.jsx';
import WindyInteractive from './Components/Map/WindyInteractive.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/report" replace />} />
        <Route path="/report" element={<Report />} />
        <Route path="/map" element={<WindyInteractive />} />
        <Route path="*" element={<Navigate to="/report" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
