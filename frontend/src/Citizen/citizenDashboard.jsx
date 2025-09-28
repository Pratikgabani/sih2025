import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CitizenLayout from './CitizenLayout.jsx';
import Dashboard from './Dashboard.jsx';
import ReportsPage from './ReportsPage.jsx';
import Volunteers from './Volunteers.jsx';
import UserDetails from './UserDetails.jsx';

const CitizenApp = () => {
  return (
    <CitizenLayout>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="volunteers" element={<Volunteers />} />
        <Route path="profile" element={<UserDetails />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </CitizenLayout>
  );
};

export default CitizenApp;
