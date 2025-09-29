import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  MessageSquare, 
  AlertTriangle,
  Eye,
  Target,
  Users
} from 'lucide-react';
import { PieChart, BarChart, LineChart } from './Charts';

const AnalystDashboard = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Sample data for overview charts
  const overviewData = [
    { label: 'Verified', value: 156, color: '#10B981' },
    { label: 'Under Review', value: 89, color: '#F59E0B' },
    { label: 'False Reports', value: 23, color: '#EF4444' },
    { label: 'Pending', value: 47, color: '#6B7280' }
  ];

  const sentimentData = [
    { label: 'Positive', value: 245, color: '#10B981' },
    { label: 'Neutral', value: 178, color: '#6B7280' },
    { label: 'Negative', value: 132, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time incident analysis and verification</p>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Incidents</p>
              <p className="text-2xl font-bold text-gray-900">315</p>
              <p className="text-sm text-green-600 mt-1">+12% from yesterday</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
              <p className="text-sm text-red-600 mt-1">Needs attention</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Accuracy Rate</p>
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
              <p className="text-sm text-green-600 mt-1">+2.1% this week</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Analysts</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600 mt-1">Online now</p>
            </div>
            <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-sky-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links to Analytics Pages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          to="/analyst/sentiment" 
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Sentiment Analysis</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Analyze public sentiment and emotional trends from social media and reports.</p>
              <div className="text-sm text-blue-600 group-hover:text-blue-700">View detailed analytics →</div>
            </div>
          </div>
        </Link>

        <Link 
          to="/analyst/incident" 
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Incident Analytics</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Track incident patterns, hotspots, and predictive analysis.</p>
              <div className="text-sm text-green-600 group-hover:text-green-700">View detailed analytics →</div>
            </div>
          </div>
        </Link>

        <Link 
          to="/analyst/social" 
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-sky-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Social Media Analytics</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Monitor social media trends, viral content, and public discourse.</p>
              <div className="text-sm text-sky-600 group-hover:text-sky-700">View detailed analytics →</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Overview Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PieChart 
          data={overviewData}
          title="Incident Status Overview"
          size="w-48 h-48"
        />

        <PieChart 
          data={sentimentData}
          title="Public Sentiment Distribution"
          size="w-48 h-48"
        />
        
        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-sm text-sky-600 hover:text-sky-700">View all</button>
          </div>
          <div className="space-y-3">
            {[
              { time: '2 min ago', action: 'Verified incident report in Mumbai Central', type: 'verified' },
              { time: '5 min ago', action: 'Flagged suspicious social media activity', type: 'flagged' },
              { time: '8 min ago', action: 'Completed sentiment analysis for Delhi region', type: 'completed' },
              { time: '12 min ago', action: 'New high-priority alert generated', type: 'alert' },
              { time: '15 min ago', action: 'Updated incident classification model', type: 'updated' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'verified' ? 'bg-green-500' :
                  activity.type === 'flagged' ? 'bg-red-500' :
                  activity.type === 'completed' ? 'bg-blue-500' :
                  activity.type === 'alert' ? 'bg-orange-500' :
                  'bg-sky-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-sm text-gray-500">
        Last updated: {lastUpdated.toLocaleTimeString()} | System Status: Active
      </div>
    </div>
  );
};

export default AnalystDashboard;