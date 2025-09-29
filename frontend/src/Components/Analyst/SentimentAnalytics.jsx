import React, { useState } from "react";
import { PieChart, DonutChart, BarChart, LineChart } from "./Charts";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  MessageSquare, 
  Users
} from "lucide-react";

export default function SentimentAnalytics() {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Sentiment distribution data
  const sentimentData = [
    { label: 'Panic', value: 156, color: '#DC2626' },
    { label: 'Fear', value: 89, color: '#EA580C' },
    { label: 'Concerned', value: 134, color: '#D97706' },
    { label: 'Neutral', value: 78, color: '#059669' },
    { label: 'Informative', value: 45, color: '#0284C7' }
  ];

  // Sentiment by region
  const regionalSentiment = [
    { label: 'Chennai', value: 245 },
    { label: 'Mumbai', value: 189 },
    { label: 'Kochi', value: 134 },
    { label: 'Vizag', value: 98 },
    { label: 'Mangalore', value: 67 }
  ];

  // Sentiment trends over time
  const sentimentTrends = [
    { label: '08:00', value: 23 },
    { label: '10:00', value: 67 },
    { label: '12:00', value: 156 },
    { label: '14:00', value: 134 },
    { label: '16:00', value: 89 },
    { label: '18:00', value: 45 }
  ];

  // Emotion intensity data
  const emotionIntensity = [
    { label: 'Extreme Panic', value: 34, color: '#7F1D1D' },
    { label: 'High Anxiety', value: 89, color: '#DC2626' },
    { label: 'Moderate Concern', value: 167, color: '#F59E0B' },
    { label: 'Mild Worry', value: 134, color: '#10B981' },
    { label: 'Calm/Neutral', value: 78, color: '#3B82F6' }
  ];

  // Social media platform breakdown
  const platformData = [
    { label: 'Twitter', value: 234 },
    { label: 'Facebook', value: 189 },
    { label: 'Instagram', value: 123 },
    { label: 'WhatsApp', value: 98 },
    { label: 'Telegram', value: 67 }
  ];

  const totalReports = sentimentData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sentiment Analytics</h1>
          <p className="text-gray-600 mt-1">Real-time emotional response analysis and trends</p>
        </div>
        
        {/* Controls */}
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
          >
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
          
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
          >
            <option value="all">All Regions</option>
            <option value="chennai">Chennai</option>
            <option value="mumbai">Mumbai</option>
            <option value="kochi">Kochi</option>
            <option value="vizag">Visakhapatnam</option>
          </select>
        </div>
      </div>

      {/* Critical Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Critical Alerts */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            Critical Sentiment Alerts
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <p className="text-sm font-medium text-red-900">Panic Spike Detected</p>
              <p className="text-xs text-red-700 mt-1">Chennai region showing 340% increase in panic-related posts</p>
              <p className="text-xs text-red-600 mt-1">12:45 PM - Ongoing</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <p className="text-sm font-medium text-orange-900">Fear Escalation</p>
              <p className="text-xs text-orange-700 mt-1">Mumbai coast reports doubling every 15 minutes</p>
              <p className="text-xs text-orange-600 mt-1">1:20 PM - Active</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm font-medium text-yellow-900">Misinformation Pattern</p>
              <p className="text-xs text-yellow-700 mt-1">False evacuation orders spreading via WhatsApp groups</p>
              <p className="text-xs text-yellow-600 mt-1">2:10 PM - Monitoring</p>
            </div>
          </div>
        </div>

        {/* Top Emotional Analysis */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
            Top Emotional Analysis
          </h3>
          <div className="space-y-3">
            {[
              { word: 'tsunami', sentiment: 'panic', count: 1247, intensity: 95 },
              { word: 'evacuation', sentiment: 'fear', count: 856, intensity: 87 },
              { word: 'help', sentiment: 'panic', count: 634, intensity: 82 },
              { word: 'scared', sentiment: 'fear', count: 523, intensity: 78 },
              { word: 'emergency', sentiment: 'concern', count: 445, intensity: 71 }
            ].map((keyword, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${
                    keyword.sentiment === 'panic' ? 'bg-red-500' :
                    keyword.sentiment === 'fear' ? 'bg-orange-500' : 'bg-yellow-500'
                  }`}></span>
                  <span className="text-sm font-medium text-gray-900">#{keyword.word}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{keyword.count}</div>
                  <div className="text-xs text-gray-500">{keyword.intensity}% intensity</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 text-green-600 mr-2" />
            AI Recommendations
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">Immediate Action</p>
              <p className="text-xs text-blue-700 mt-1">Deploy calming messaging campaign in Chennai region</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-900">Communication Strategy</p>
              <p className="text-xs text-green-700 mt-1">Counter misinformation with official updates every 10 minutes</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-900">Resource Allocation</p>
              <p className="text-xs text-purple-700 mt-1">Focus response teams on high-panic coastal areas</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">Monitoring Priority</p>
              <p className="text-xs text-gray-700 mt-1">Watch for sentiment escalation in Vizag and Mangalore</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Main Sentiment Distribution */}
        <PieChart
          data={sentimentData}
          title="Overall Sentiment Distribution"
          colors={sentimentData.map(item => item.color)}
          size="w-64 h-64"
        />

        {/* Regional Sentiment Bar Chart */}
        <BarChart
          data={regionalSentiment}
          title="Sentiment by Region"
          xLabel="Number of Reports"
          yLabel="Coastal Regions"
          color="#DC2626"
        />
      </div>
    </div>
  );
}