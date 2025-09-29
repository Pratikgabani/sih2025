import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GovOfficialLayout from './GovOfficialLayout.jsx';
import GovOfficialDashboard from './GovOfficialDashboard.jsx';
import AlertsManagement from './AlertsManagement.jsx';
import ReportManagement from './ReportManagement.jsx';
import TeamManagement from './TeamManagement.jsx';
import GovOfficialProfile from './GovOfficialProfile.jsx';

const GovOfficialApp = () => {
  return (
    <GovOfficialLayout>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<GovOfficialDashboard />} />
        <Route path="alerts" element={<AlertsManagement />} />
        <Route path="reports" element={<ReportManagement />} />
        <Route path="team" element={<TeamManagement />} />
        <Route path="profile" element={<GovOfficialProfile />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </GovOfficialLayout>
  );
};

export default GovOfficialApp;