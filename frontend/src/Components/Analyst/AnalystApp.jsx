import React from "react";
import { Routes, Route } from "react-router-dom";
import AnalystLayout from "./AnalystLayout";
import AnalystDashboard from "./AnalystDashboard";
import SentimentAnalytics from "./SentimentAnalytics";
import IncidentAnalytics from "./IncidentAnalytics";
import SocialMediaAnalytics from "./SocialMediaAnalytics";
import AnalystProfile from "./AnalystProfile";

export default function AnalystApp() {
  return (
    <Routes>
      <Route path="/" element={<AnalystLayout />}>
        <Route index element={<AnalystDashboard />} />
        <Route path="dashboard" element={<AnalystDashboard />} />
        <Route path="sentiment" element={<SentimentAnalytics />} />
        <Route path="incident" element={<IncidentAnalytics />} />
        <Route path="social" element={<SocialMediaAnalytics />} />
        <Route path="profile" element={<AnalystProfile />} />
      </Route>
    </Routes>
  );
}