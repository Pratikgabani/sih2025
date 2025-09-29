import React, { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  MessageSquare, 
  Clock, 
  MapPin, 
  Users,
  AlertTriangle,
  Calendar,
  Hash,
  Activity,
  PieChart,
  LineChart
} from "lucide-react";

export default function AnalyticsPanel({ selectedIncident }) {
  const [timeRange, setTimeRange] = useState('12h');
  const [activeChart, setActiveChart] = useState('sentiment');

  // Sample analytics data
  const sentimentData = {
    panic: 45,
    concerned: 30,
    informative: 20,
    neutral: 5
  };

  const hazardBreakdown = {
    'High Waves': 45,
    'Coastal Flooding': 30,
    'Storm Surge': 15,
    'Tsunami Rumor': 10
  };

  const keywordTrends = [
    { keyword: 'tsunami', mentions: 1247, trend: '+45%', urgent: true },
    { keyword: 'evacuation', mentions: 856, trend: '+67%', urgent: true },
    { keyword: 'marina beach', mentions: 634, trend: '+23%', urgent: false },
    { keyword: 'high waves', mentions: 523, trend: '+12%', urgent: false },
    { keyword: 'emergency', mentions: 445, trend: '+89%', urgent: true }
  ];

  const timeSeriesData = [
    { time: '08:00', reports: 12, panic: 2 },
    { time: '09:00', reports: 34, panic: 8 },
    { time: '10:00', reports: 156, panic: 45 },
    { time: '11:00', reports: 89, panic: 67 },
    { time: '12:00', reports: 67, panic: 34 }
  ];

  const getIntensityColor = (value) => {
    if (value > 80) return 'bg-red-500';
    if (value > 60) return 'bg-orange-500';
    if (value > 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getTrendColor = (trend) => {
    const isPositive = trend.startsWith('+');
    return isPositive ? 'text-red-600' : 'text-green-600';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Panel</h3>
        <p className="text-sm text-gray-600">Social Media & Historical Context Analysis</p>
        
        {/* Time Range Selector */}
        <div className="mt-3 flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600">Time Range:</span>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="2h">Last 2 Hours</option>
            <option value="6h">Last 6 Hours</option>
            <option value="12h">Last 12 Hours</option>
            <option value="24h">Last 24 Hours</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Sentiment Trend Analysis */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Sentiment Trend
            </h4>
            <span className="text-xs text-gray-500">Last {timeRange}</span>
          </div>
          
          <div className="space-y-3">
            {Object.entries(sentimentData).map(([sentiment, percentage]) => (
              <div key={sentiment} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    sentiment === 'panic' ? 'bg-red-500' :
                    sentiment === 'concerned' ? 'bg-orange-500' :
                    sentiment === 'informative' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}></div>
                  <span className="text-sm capitalize text-gray-700">{sentiment}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        sentiment === 'panic' ? 'bg-red-500' :
                        sentiment === 'concerned' ? 'bg-orange-500' :
                        sentiment === 'informative' ? 'bg-blue-500' : 'bg-gray-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-3 p-2 bg-red-50 rounded text-xs text-red-800">
            <AlertTriangle className="w-3 h-3 inline mr-1" />
            Peak panic times: 10:00-11:00 AM indicating urgent public response
          </div>
        </div>

        {/* Hazard Type Breakdown */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <PieChart className="w-4 h-4 mr-2" />
            Hazard Type Breakdown
          </h4>
          
          <div className="space-y-2">
            {Object.entries(hazardBreakdown).map(([hazard, percentage]) => (
              <div key={hazard} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{hazard}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Keywords/Hashtags */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <Hash className="w-4 h-4 mr-2" />
            Top Keywords/Hashtags
          </h4>
          
          <div className="space-y-2">
            {keywordTrends.map((keyword, index) => (
              <div key={keyword.keyword} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 w-4">#{index + 1}</span>
                  <span className={`text-sm font-medium ${keyword.urgent ? 'text-red-700' : 'text-gray-700'}`}>
                    {keyword.keyword}
                  </span>
                  {keyword.urgent && (
                    <AlertTriangle className="w-3 h-3 text-red-500" />
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">{keyword.mentions}</span>
                  <span className={`text-xs font-medium ${getTrendColor(keyword.trend)}`}>
                    {keyword.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Analysis */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <LineChart className="w-4 h-4 mr-2" />
            Timeline Analysis
          </h4>
          
          <div className="space-y-3">
            <div className="text-xs text-gray-600 mb-2">Report Volume vs. Panic Level</div>
            {timeSeriesData.map((data, index) => (
              <div key={data.time} className="flex items-center space-x-3">
                <span className="text-xs text-gray-500 w-12">{data.time}</span>
                <div className="flex-1 flex space-x-2">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Reports</span>
                      <span className="text-xs font-medium">{data.reports}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className="h-1 rounded-full bg-blue-500"
                        style={{ width: `${(data.reports / 156) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Panic</span>
                      <span className="text-xs font-medium">{data.panic}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className="h-1 rounded-full bg-red-500"
                        style={{ width: `${(data.panic / 67) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-800">
            <TrendingUp className="w-3 h-3 inline mr-1" />
            Correlation detected: Report spike at 10:00 correlates with emergency broadcast
          </div>
        </div>

        {/* Historical Context */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Historical Context
          </h4>
          
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Similar Pattern Detected</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Pattern matches Cyclone Vardah (2016) - similar social media escalation timeline
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <BarChart3 className="w-4 h-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900">Baseline Comparison</p>
                  <p className="text-xs text-green-700 mt-1">
                    Current activity 340% above normal for Chennai coastal area
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-900">Risk Assessment</p>
                  <p className="text-xs text-red-700 mt-1">
                    High probability of genuine emergency based on multi-source correlation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Time Slider/Filter */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            Event Progression Filter
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>2-4 hours ago</span>
              <span>Present</span>
            </div>
            <div className="relative">
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="80"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Early reports</span>
                <span>Verification</span>
                <span>Peak activity</span>
                <span>Current</span>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Use slider to filter map and charts by time progression
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}