import React, { useState } from "react";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  MessageSquare, 
  User, 
  MapPin, 
  Clock, 
  Eye,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Brain,
  TrendingUp,
  Camera,
  Phone
} from "lucide-react";

export default function ReviewPanel({ selectedIncident, onIncidentUpdate }) {
  const [activeTab, setActiveTab] = useState('feed');

  // Sample crowdsourced reports
  const reports = [
    {
      id: 1,
      incidentId: selectedIncident?.id || 1,
      type: 'text',
      content: 'Seeing massive waves hitting the shore at Marina Beach. Water is coming up to the road level. People are running away from the beach area.',
      author: 'citizen_user_123',
      location: 'Marina Beach, Chennai',
      timestamp: '2025-09-29T10:45:00Z',
      urgencyScore: 8.5,
      credibilityScore: 7.2,
      sentiment: 'panic',
      nlpExtracted: {
        entities: ['Marina Beach', 'Chennai', 'massive waves', 'road level'],
        eventType: 'Tsunami/High Waves',
        classification: 'Emergency',
        sentiment: 'Negative/Panic'
      },
      verification: 'pending',
      upvotes: 45,
      downvotes: 3,
      hasMedia: true
    },
    {
      id: 2,
      incidentId: selectedIncident?.id || 1,
      type: 'social',
      content: 'OMG the waves are huge today! Never seen anything like this in Chennai #tsunami #emergency #help',
      author: '@coastal_observer',
      location: 'Besant Nagar Beach',
      timestamp: '2025-09-29T10:30:00Z',
      urgencyScore: 9.1,
      credibilityScore: 6.8,
      sentiment: 'fear',
      nlpExtracted: {
        entities: ['Chennai', 'huge waves', 'tsunami', 'emergency'],
        eventType: 'Tsunami',
        classification: 'Emergency',
        sentiment: 'Fear/Urgent'
      },
      verification: 'pending',
      upvotes: 128,
      downvotes: 12,
      hasMedia: true
    },
    {
      id: 3,
      incidentId: selectedIncident?.id || 1,
      type: 'official',
      content: 'INCOIS Tsunami Alert: Potential tsunami waves detected. Immediate evacuation recommended for coastal areas of Tamil Nadu.',
      author: 'INCOIS Official',
      location: 'Tamil Nadu Coast',
      timestamp: '2025-09-29T10:15:00Z',
      urgencyScore: 10.0,
      credibilityScore: 10.0,
      sentiment: 'official',
      nlpExtracted: {
        entities: ['INCOIS', 'Tsunami Alert', 'Tamil Nadu', 'evacuation'],
        eventType: 'Official Tsunami Warning',
        classification: 'Official Alert',
        sentiment: 'Authoritative'
      },
      verification: 'verified',
      upvotes: 0,
      downvotes: 0,
      hasMedia: false
    }
  ];

  const handleVerification = (reportId, status) => {
    console.log(`Report ${reportId} marked as ${status}`);
    // In real implementation, this would update the report status
  };

  const getVerificationColor = (status) => {
    const colors = {
      verified: 'text-green-600 bg-green-50',
      rejected: 'text-red-600 bg-red-50',
      pending: 'text-yellow-600 bg-yellow-50'
    };
    return colors[status] || colors.pending;
  };

  const getUrgencyColor = (score) => {
    if (score >= 8) return 'text-red-600 bg-red-50';
    if (score >= 6) return 'text-orange-600 bg-orange-50';
    if (score >= 4) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getSentimentIcon = (sentiment) => {
    const icons = {
      panic: AlertTriangle,
      fear: AlertTriangle,
      concerned: TrendingUp,
      neutral: MessageSquare,
      official: CheckCircle
    };
    return icons[sentiment] || MessageSquare;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Panel</h3>
        <p className="text-sm text-gray-600">Crowdsourced Report Verification & NLP Analysis</p>
        
        {selectedIncident && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                Analyzing: {selectedIncident.type} at {selectedIncident.location}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'feed'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Real-time Feed
        </button>
        <button
          onClick={() => setActiveTab('details')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'details'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Incident Details
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'feed' && (
          <div className="p-4 space-y-4">
            {reports.map((report) => {
              const SentimentIcon = getSentimentIcon(report.sentiment);
              return (
                <div key={report.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  {/* Report Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{report.author}</p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {report.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getVerificationColor(report.verification)}`}>
                        {report.verification}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(report.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  {/* Report Content */}
                  <div className="mb-3">
                    <p className="text-sm text-gray-700 mb-2">{report.content}</p>
                    {report.hasMedia && (
                      <div className="flex items-center space-x-2 text-xs text-blue-600">
                        <Camera className="w-3 h-3" />
                        <span>Media attachments available</span>
                      </div>
                    )}
                  </div>

                  {/* NLP Analysis */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">NLP Analysis</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-600">Event Type:</span>
                        <span className="ml-1 font-medium">{report.nlpExtracted.eventType}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Classification:</span>
                        <span className="ml-1 font-medium">{report.nlpExtracted.classification}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Sentiment:</span>
                        <span className="ml-1 font-medium flex items-center">
                          <SentimentIcon className="w-3 h-3 mr-1" />
                          {report.nlpExtracted.sentiment}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Entities:</span>
                        <span className="ml-1 text-blue-600">{report.nlpExtracted.entities.length} found</span>
                      </div>
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-600">Urgency:</span>
                      <span className={`px-2 py-1 text-xs rounded ${getUrgencyColor(report.urgencyScore)}`}>
                        {report.urgencyScore}/10
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-600">Credibility:</span>
                      <span className={`px-2 py-1 text-xs rounded ${getUrgencyColor(report.credibilityScore)}`}>
                        {report.credibilityScore}/10
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {report.verification === 'pending' && (
                        <>
                          <button
                            onClick={() => handleVerification(report.id, 'verified')}
                            className="flex items-center px-2 py-1 text-xs bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verify
                          </button>
                          <button
                            onClick={() => handleVerification(report.id, 'rejected')}
                            className="flex items-center px-2 py-1 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors"
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            Reject
                          </button>
                        </>
                      )}
                      <button className="flex items-center px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition-colors">
                        <Flag className="w-3 h-3 mr-1" />
                        Flag
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span className="flex items-center">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        {report.upvotes}
                      </span>
                      <span className="flex items-center">
                        <ThumbsDown className="w-3 h-3 mr-1" />
                        {report.downvotes}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'details' && selectedIncident && (
          <div className="p-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Incident Analysis</h4>
              
              {/* Corroboration Window */}
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Social Feed Snippets</h5>
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                  <p className="mb-2"><strong>Geotagged posts clustered with this incident:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>"Massive waves at Marina Beach" - 156 reports</li>
                    <li>"Tsunami warning Chennai" - 89 mentions</li>
                    <li>"Beach evacuation" - 67 posts</li>
                  </ul>
                </div>
              </div>

              {/* Official Data Check */}
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Official Data Check</h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span className="text-sm text-green-800">INCOIS Alert Status</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span className="text-sm text-green-800">Wave Sensor Data</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                    <span className="text-sm text-yellow-800">Storm Track Correlation</span>
                    <Clock className="w-4 h-4 text-yellow-600" />
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Verification Microservice</h5>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    This incident has been automatically flagged for verification based on report volume and urgency scores.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Validate Incident
                </button>
                <button className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Mark False Alarm
                </button>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Flag className="w-4 h-4 mr-2" />
                  Forward to Response
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}