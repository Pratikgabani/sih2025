import React, { useState } from 'react';
import { Camera, MapPin, Send, Upload, Mic, AlertTriangle } from 'lucide-react';

const ReportHazard = ({ user }) => {
  const [formData, setFormData] = useState({
    hazardType: '',
    severity: '',
    description: '',
    location: '',
    media: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hazardTypes = [
    'Tsunami',
    'Storm Surge',
    'High Waves',
    'Coastal Flooding',
    'Coastal Erosion',
    'Abnormal Tide',
    'Swell Surge',
    'Other'
  ];

  const severityLevels = [
    { value: 'low', label: 'Low', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
    { value: 'medium', label: 'Medium', color: 'text-orange-600 bg-orange-50 border-orange-200' },
    { value: 'high', label: 'High', color: 'text-red-600 bg-red-50 border-red-200' },
    { value: 'critical', label: 'Critical', color: 'text-red-800 bg-red-100 border-red-300' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Hazard report submitted successfully!');
      setFormData({
        hazardType: '',
        severity: '',
        description: '',
        location: '',
        media: []
      });
    }, 2000);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
        },
        (error) => {
          alert('Unable to get location. Please enter manually.');
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-4 shadow-lg">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Report Ocean Hazard</h1>
          <p className="text-gray-600">Help protect coastal communities by reporting hazardous ocean conditions</p>
        </div>

        {user && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{user.name?.[0] || 'U'}</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Reporting as: {user.name}</p>
                <p className="text-sm text-gray-600">Role: {user.role} | Verified Reporter</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 space-y-6">
            {/* Hazard Type */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Type of Ocean Hazard *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {hazardTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, hazardType: type }))}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                      formData.hazardType === type
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Severity Level */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Severity Level *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {severityLevels.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, severity: level.value }))}
                    className={`p-3 rounded-xl border-2 text-sm font-bold transition-all duration-200 ${
                      formData.severity === level.value
                        ? level.color
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Location *
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter location or coordinates"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2 font-medium"
                >
                  <MapPin className="w-4 h-4" />
                  GPS
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Detailed Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what you observed in detail (wave height, water level, damage, etc.)"
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                required
              />
            </div>

            {/* Media Upload */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Photos/Videos (Optional)
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  className="aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 flex flex-col items-center justify-center text-gray-500 hover:text-blue-500"
                >
                  <Camera className="w-8 h-8 mb-2" />
                  <span className="text-sm font-medium">Take Photo</span>
                </button>
                <button
                  type="button"
                  className="aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 flex flex-col items-center justify-center text-gray-500 hover:text-blue-500"
                >
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-sm font-medium">Upload Media</span>
                </button>
                <button
                  type="button"
                  className="aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 flex flex-col items-center justify-center text-gray-500 hover:text-blue-500"
                >
                  <Mic className="w-8 h-8 mb-2" />
                  <span className="text-sm font-medium">Voice Note</span>
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Your report will be reviewed by authorities and may be shared with emergency services.
              </p>
              <button
                type="submit"
                disabled={isSubmitting || !formData.hazardType || !formData.severity || !formData.location || !formData.description}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Report
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportHazard;