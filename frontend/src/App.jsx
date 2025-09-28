import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Components/Layout/Layout.jsx';
import CitizenReport from './Citizen/Report.jsx';
import WindyInteractive from './Components/Map/WindyInteractive.jsx';
import Login from './Components/Login/Login.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import CitizenApp from './Citizen/citizenDashboard.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* No global sidebar on login */}
        <Route path="/login" element={<Login />} />

        {/* Citizen app has its own layout/sidebar */}
        <Route path="/citizen/*" element={<CitizenApp />} />

        {/* Routes that should use the global Layout with sidebar */}
        <Route element={<Layout />}>
          <Route path="/report" element={<CitizenReport />} />
          <Route path="/map" element={<WindyInteractive />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/report" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
