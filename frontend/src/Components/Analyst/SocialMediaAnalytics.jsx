import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, LineChart, PieChart, DonutChart } from "./Charts";
import { 
  Hash, 
  TrendingUp, 
  MessageSquare, 
  Users, 
  Share2,
  Eye,
  Heart,
  Repeat,
  AlertTriangle,
  Smartphone,
  ArrowLeft
} from "lucide-react";

export default function SocialMediaAnalytics() {
  const navigate = useNavigate();
  const [platform, setPlatform] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');

  // Platform distribution
  const platformData = [
    { label: 'Twitter', value: 2156, color: '#1DA1F2' },
    { label: 'Facebook', value: 1843, color: '#4267B2' },
    { label: 'Instagram', value: 1234, color: '#E4405F' },
    { label: 'WhatsApp', value: 987, color: '#25D366' },
    { label: 'Telegram', value: 654, color: '#0088CC' },
    { label: 'Reddit', value: 432, color: '#FF4500' }
  ];

  // Engagement metrics
  const engagementData = [
    { label: 'Likes/Reactions', value: 15670 },
    { label: 'Shares/Retweets', value: 8945 },
    { label: 'Comments', value: 6234 },
    { label: 'Direct Messages', value: 3456 },
    { label: 'Story Views', value: 12890 }
  ];

  // Viral content metrics
  const viralContent = [
    { label: '00:00', value: 234 },
    { label: '04:00', value: 189 },
    { label: '08:00', value: 567 },
    { label: '12:00', value: 1234 },
    { label: '16:00', value: 2156 },
    { label: '20:00', value: 1789 }
  ];

  // Hashtag trends
  const hashtagTrends = [
    { tag: '#tsunami', mentions: 12470, trend: '+340%', sentiment: 'panic', verified: 87 },
    { tag: '#chennaiflood', mentions: 8945, trend: '+245%', sentiment: 'concern', verified: 92 },
    { tag: '#evacuation', mentions: 6234, trend: '+189%', sentiment: 'urgent', verified: 78 },
    { tag: '#emergency', mentions: 5678, trend: '+156%', sentiment: 'alert', verified: 89 },
    { tag: '#helpchennai', mentions: 4321, trend: '+234%', sentiment: 'support', verified: 94 },
    { tag: '#prayforchennai', mentions: 3456, trend: '+123%', sentiment: 'sympathy', verified: 96 },
    { tag: '#staysafe', mentions: 2890, trend: '+98%', sentiment: 'care', verified: 91 },
    { tag: '#coastalflood', mentions: 2345, trend: '+87%', sentiment: 'inform', verified: 85 }
  ];

  // Influencer impact
  const influencerData = [
    { label: 'News Outlets', value: 45, color: '#DC2626' },
    { label: 'Government', value: 23, color: '#059669' },
    { label: 'Celebrities', value: 34, color: '#7C3AED' },
    { label: 'Local Leaders', value: 67, color: '#0284C7' },
    { label: 'Citizens', value: 156, color: '#F59E0B' }
  ];

  // Misinformation tracking
  const misinfoData = [
    { label: 'Verified Info', value: 78, color: '#10B981' },
    { label: 'Unverified', value: 15, color: '#F59E0B' },
    { label: 'Misinformation', value: 7, color: '#DC2626' }
  ];

  const getTrendColor = (trend) => {
    const value = parseInt(trend.replace(/[^0-9]/g, ''));
    if (value > 200) return 'text-red-600';
    if (value > 100) return 'text-orange-600';
    return 'text-green-600';
  };

  const getSentimentColor = (sentiment) => {
    const colors = {
      panic: 'bg-red-100 text-red-800',
      concern: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800',
      alert: 'bg-yellow-100 text-yellow-800',
      support: 'bg-blue-100 text-blue-800',
      sympathy: 'bg-purple-100 text-purple-800',
      care: 'bg-green-100 text-green-800',
      inform: 'bg-gray-100 text-gray-800'
    };
    return colors[sentiment] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sky-600 hover:text-sky-800 transition-colors duration-200 mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Social Media Analytics</h1>
          <p className="text-gray-600 mt-1">Real-time social media monitoring and viral content tracking</p>
        </div>
        
        {/* Controls */}
        <div className="flex items-center space-x-4">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
          >
            <option value="all">All Platforms</option>
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
          
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
        </div>
        </div>

      {/* Trending Hashtags & Keywords - Top Priority */}
      <div className="mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Hash className="w-5 h-5 text-blue-600 mr-2" />
            Trending Hashtags & Keywords
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hashtagTrends.map((hashtag, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-blue-600">{hashtag.tag}</span>
                  <span className={`text-sm font-medium ${getTrendColor(hashtag.trend)}`}>
                    {hashtag.trend}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Mentions:</span>
                    <span className="font-medium">{hashtag.mentions.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Verified:</span>
                    <span className="font-medium text-green-600">{hashtag.verified}%</span>
                  </div>
                  <div className="mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getSentimentColor(hashtag.sentiment)}`}>
                      {hashtag.sentiment}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Distribution and Misinformation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PieChart
          data={platformData}
          title="Mentions by Platform"
          colors={platformData.map(item => item.color)}
          size="w-64 h-64"
        />

        <DonutChart
          data={misinfoData}
          title="Information Verification Status"
          centerText="8.3K Posts"
          colors={misinfoData.map(item => item.color)}
        />
      </div>

      {/* Detailed Analysis Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Influencer Impact */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 text-purple-600 mr-2" />
            Influencer Impact Analysis
          </h3>
          <div className="space-y-4">
            <BarChart
              data={influencerData}
              title=""
              color="#7C3AED"
            />
            <div className="text-xs text-gray-600 mt-2">
              <p>• Government accounts: Highest credibility (95%)</p>
              <p>• News outlets: Fastest spread (avg 23 min)</p>
              <p>• Celebrities: Maximum reach (2.1M avg)</p>
            </div>
          </div>
        </div>

        {/* Viral Content Analysis */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 text-red-600 mr-2" />
            Top Viral Content
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <p className="text-sm font-medium text-red-900">Tsunami Video</p>
              <p className="text-xs text-red-700 mt-1">2.3M views, 89K shares</p>
              <div className="flex items-center mt-2 text-xs">
                <Eye className="w-3 h-3 mr-1" />
                <span>234% engagement rate</span>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm font-medium text-blue-900">Official Alert Share</p>
              <p className="text-xs text-blue-700 mt-1">1.8M reach, 67K retweets</p>
              <div className="flex items-center mt-2 text-xs">
                <Repeat className="w-3 h-3 mr-1" />
                <span>High trust score (94%)</span>
              </div>
            </div>
            
            <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <p className="text-sm font-medium text-orange-900">Evacuation Photo</p>
              <p className="text-xs text-orange-700 mt-1">1.2M views, 45K comments</p>
              <div className="flex items-center mt-2 text-xs">
                <MessageSquare className="w-3 h-3 mr-1" />
                <span>High emotional impact</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Monitoring */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Smartphone className="w-5 h-5 text-green-600 mr-2" />
            Real-time Monitoring
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-900">Live Stream Activity</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs text-green-700">Active</span>
                </div>
              </div>
              <p className="text-xs text-green-700 mt-1">23 live streams from affected areas</p>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">Bot Detection</p>
              <p className="text-xs text-blue-700 mt-1">7% bot activity detected</p>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '7%' }}></div>
              </div>
            </div>
            
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900">Alert Triggers</span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">3 misinformation patterns flagged</p>
              <p className="text-xs text-yellow-600 mt-1">Auto-response activated</p>
            </div>
            
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-900">Sentiment Shift</p>
              <p className="text-xs text-purple-700 mt-1">Panic → Concern transition detected</p>
              <p className="text-xs text-purple-600 mt-1">15% improvement in last hour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}