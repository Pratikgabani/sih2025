import React from "react";

const StatisticsPanel = ({ stats = {}, lastUpdate }) => {
  return (
    <div className="statistics fixed bottom-4 left-4 bg-white rounded-lg shadow p-3 z-30">
      <div className="text-sm font-medium">Live Statistics</div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div><small>Active Hotspots</small><div className="stat-value">{stats.hotspotCount}</div></div>
        <div><small>Weather Records</small><div className="stat-value">{stats.weatherRecords}</div></div>
        <div><small>Uploaded Files</small><div className="stat-value">{stats.fileCount}</div></div>
        <div><small>Reports</small><div className="stat-value">{stats.reportCount}</div></div>
      </div>
      <div className="text-xs text-gray-500 mt-2">Last Update: {lastUpdate}</div>
    </div>
  );
};

export default StatisticsPanel;
