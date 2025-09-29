import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  BarChart3, 
  Edit3, 
  Save, 
  X, 
  Camera, 
  Key,
  Bell,
  Globe,
  Clock,
  Award,
  Users,
  AlertTriangle,
  CheckCircle,
  Settings,
  TrendingUp,
  Database,
  Brain
} from 'lucide-react';

const AnalystProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    id: 'ANA001',
    name: 'Dr. Sarah Kumar',
    email: 'sarah.kumar@storm.gov.in',
    phone: '+91 99887 65432',
    designation: 'Senior Data Analyst',
    department: 'Storm Analytics Division',
    specialization: 'Sentiment Analysis & Predictive Modeling',
    location: 'Bengaluru, Karnataka',
    joiningDate: '2020-07-01',
    employeeId: 'STORM/ANA/2020/001',
    clearanceLevel: 'Level 4 - Data Analytics',
    photo: null
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    analyticsAlerts: true,
    dataUpdates: true,
    reportGeneration: true,
    weeklyInsights: true,
    language: 'english',
    timezone: 'Asia/Kolkata'
  });

  const [analytics, setAnalytics] = useState({
    reportsAnalyzed: 1247,
    accuracyRate: 94.2,
    modelsDeployed: 8,
    dataProcessed: '2.3TB',
    averageResponseTime: '3.2 min',
    specializations: ['Sentiment Analysis', 'Predictive Modeling', 'Social Media Analytics', 'Incident Classification']
  });

  const handleSave = () => {
    // In real app, this would save to backend
    console.log('Saving profile:', profile);
    setEditMode(false);
  };

  const handleCancel = () => {
    // Reset to original values
    setEditMode(false);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile({ ...profile, photo: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center space-x-2 px-3 py-2 bg-sky-50 text-sky-700 rounded-lg hover:bg-sky-100 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        {/* Profile Photo */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative">
            <img
              src={profile.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=0EA5E9&color=fff&size=80`}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-sky-100"
            />
            {editMode && (
              <label className="absolute bottom-0 right-0 w-6 h-6 bg-sky-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-sky-700 transition-colors">
                <Camera className="w-3 h-3 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-900">{profile.name}</h4>
            <p className="text-sky-600 font-medium">{profile.designation}</p>
            <p className="text-gray-600">{profile.department}</p>
          </div>
        </div>

        {/* Profile Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              {editMode ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              ) : (
                <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              {editMode ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              ) : (
                <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              {editMode ? (
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              ) : (
                <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Location
              </label>
              {editMode ? (
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              ) : (
                <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.location}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building className="w-4 h-4 inline mr-2" />
                Department
              </label>
              {editMode ? (
                <input
                  type="text"
                  value={profile.department}
                  onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              ) : (
                <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.department}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Brain className="w-4 h-4 inline mr-2" />
                Specialization
              </label>
              {editMode ? (
                <input
                  type="text"
                  value={profile.specialization}
                  onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              ) : (
                <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.specialization}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Key className="w-4 h-4 inline mr-2" />
                Employee ID
              </label>
              <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-600">{profile.employeeId}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Joining Date
              </label>
              <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-600">
                {new Date(profile.joiningDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Analytics Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-sky-50 rounded-lg">
            <Database className="w-8 h-8 text-sky-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{analytics.reportsAnalyzed}</p>
            <p className="text-sm text-gray-600">Reports Analyzed</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{analytics.accuracyRate}%</p>
            <p className="text-sm text-gray-600">Accuracy Rate</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{analytics.modelsDeployed}</p>
            <p className="text-sm text-gray-600">Models Deployed</p>
          </div>
        </div>

        {/* Specializations */}
        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-900 mb-3">Specializations</h4>
          <div className="flex flex-wrap gap-2">
            {analytics.specializations.map((spec, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-sm"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h3>
      <div className="space-y-4">
        {Object.entries(settings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <p className="text-sm text-gray-600">
                Receive notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Active</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'profile'
                ? 'bg-sky-50 text-sky-700 border-b-2 border-sky-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-sky-50 text-sky-700 border-b-2 border-sky-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && renderProfileTab()}
      {activeTab === 'settings' && renderSettingsTab()}
    </div>
  );
};

export default AnalystProfile;