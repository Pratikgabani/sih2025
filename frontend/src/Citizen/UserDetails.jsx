import React, { useEffect, useState } from 'react';
import { getProfile, saveProfile, isProfileComplete, setAvailability, getAvailability } from './utils/storage';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  X, 
  Camera,
  Award,
  Settings,
  Shield,
  Clock
} from 'lucide-react';

// Mock data for certifications
const mockCertifications = [
  { id: 1, title: 'First Aid Certified', organization: 'Red Cross', date: '2023-05-15' },
  { id: 2, title: 'Disaster Response Training', organization: 'NDRF', date: '2023-08-22' },
];

// Mock data for skills
const mockSkills = [
  { id: 1, name: 'First Aid', level: 'Advanced' },
  { id: 2, name: 'CPR', level: 'Intermediate' },
  { id: 3, name: 'Emergency Response', level: 'Advanced' },
  { id: 4, name: 'Crisis Management', level: 'Intermediate' },
];

const UserDetails = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [profile, setProfile] = useState(getProfile());
  const [available, setAvail] = useState(getAvailability());
  const [editMode, setEditMode] = useState(false);
  const [skills, setSkills] = useState(mockSkills);
  const [certifications, setCertifications] = useState(mockCertifications);
  const [newSkill, setNewSkill] = useState('');
  const [newCertification, setNewCertification] = useState({ title: '', organization: '', date: '' });

  useEffect(() => { 
    setProfile(getProfile()); 
    setAvail(getAvailability()); 
  }, []);

  const handleSave = () => {
    saveProfile(profile);
    setEditMode(false);
  };

  const handleCancel = () => {
    setProfile(getProfile());
    setAvail(getAvailability());
    setEditMode(false);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const newSkillObj = {
        id: skills.length + 1,
        name: newSkill.trim(),
        level: 'Beginner'
      };
      setSkills([...skills, newSkillObj]);
      setNewSkill('');
    }
  };

  const addCertification = () => {
    if (newCertification.title && newCertification.organization && newCertification.date) {
      const newCert = {
        id: certifications.length + 1,
        ...newCertification
      };
      setCertifications([...certifications, newCert]);
      setNewCertification({ title: '', organization: '', date: '' });
      document.getElementById('add-certification-modal').close();
    }
  };

  const removeSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const removeCertification = (id) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  // Handle photo selection
  const onPickPhoto = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfile(p => ({ ...p, photo: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const useCurrentLocation = () => {
    if (!('geolocation' in navigator)) { 
      alert('Geolocation not supported'); 
      return; 
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setProfile(p => ({ ...p, address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`, gpsOn: true }));
      },
      (err) => { console.warn('Geolocation failed', err?.message); },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={profile.name || ''}
                      onChange={(e) => setProfile(p => ({...p, name: e.target.value}))}
                    />
                  ) : (
                    <div className="flex items-center text-gray-900">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      {profile.name || 'Not provided'}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  {editMode ? (
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={profile.email || ''}
                      onChange={(e) => setProfile(p => ({...p, email: e.target.value}))}
                    />
                  ) : (
                    <div className="flex items-center text-gray-900">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      {profile.email || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  {editMode ? (
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={profile.phone || ''}
                      onChange={(e) => setProfile(p => ({...p, phone: e.target.value}))}
                    />
                  ) : (
                    <div className="flex items-center text-gray-900">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      {profile.phone || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    {editMode && (
                      <button
                        type="button"
                        onClick={useCurrentLocation}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Use Current
                      </button>
                    )}
                  </div>
                  {editMode ? (
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={profile.address || ''}
                      onChange={(e) => setProfile(p => ({...p, address: e.target.value}))}
                      rows={3}
                      placeholder="Enter your address or enable GPS"
                    />
                  ) : (
                    <div className="flex items-center text-gray-900">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {profile.address || 'Not provided'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-8">
            {/* Skills Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
                {editMode && (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      placeholder="Add a skill"
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={addSkill}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {skills.map(skill => (
                  <div key={skill.id} className="relative group">
                    <div className="px-4 py-2 bg-blue-50 text-blue-800 text-sm font-medium rounded-lg flex items-center border border-blue-200">
                      {skill.name}
                      {editMode && (
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {skills.length === 0 && (
                  <p className="text-sm text-gray-500">No skills added yet.</p>
                )}
              </div>
            </div>

            {/* Certifications Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
                {editMode && (
                  <button
                    onClick={() => document.getElementById('add-certification-modal').showModal()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <svg className="-ml-0.5 mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Certification
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.length > 0 ? (
                  certifications.map(cert => (
                    <div key={cert.id} className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-blue-900">{cert.title}</h4>
                          <p className="text-sm text-blue-700 mt-1">{cert.organization}</p>
                          <p className="text-xs text-blue-600 mt-2">Issued: {cert.date}</p>
                        </div>
                        {editMode && (
                          <button
                            onClick={() => removeCertification(cert.id)}
                            className="text-red-600 hover:text-red-800 ml-2"
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <Shield className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">No certifications added yet.</p>
                  </div>
                )}
              </div>

              {/* Add Certification Modal */}
              <dialog id="add-certification-modal" className="p-6 rounded-lg shadow-xl max-w-md w-full mt-20 ml-20 sm:mt-32 sm:ml-30 md:mt-40 md:ml-40 lg:mt-60 lg:ml-80 xl:ml-140">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Certification</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={newCertification.title}
                      onChange={(e) => setNewCertification({...newCertification, title: e.target.value})}
                      placeholder="e.g., First Aid Certified"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={newCertification.organization}
                      onChange={(e) => setNewCertification({...newCertification, organization: e.target.value})}
                      placeholder="e.g., Red Cross"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={newCertification.date}
                      onChange={(e) => setNewCertification({...newCertification, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => document.getElementById('add-certification-modal').close()}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={addCertification}
                    className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Add Certification
                  </button>
                </div>
              </dialog>
            </div>
          </div>
        );

      case 'gps':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Services</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <h4 className="font-medium text-gray-900">GPS Tracking</h4>
                  <p className="text-sm text-gray-500">Share your location with trusted organizations</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={profile.gpsOn}
                    onChange={(e) => {
                      const newProfile = { ...profile, gpsOn: e.target.checked };
                      setProfile(newProfile);
                      saveProfile(newProfile);
                    }}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'availability':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <h4 className="font-medium text-gray-900">Available for Emergencies</h4>
                  <p className="text-sm text-gray-500">Mark yourself as available to help in emergency situations</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={available}
                    onChange={(e) => {
                      const newAvailable = e.target.checked;
                      setAvail(newAvailable);
                      setAvailability(newAvailable);
                    }}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl text-white p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  {profile.photo ? (
                    <img 
                      src={profile.photo} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                </div>
                {editMode && (
                  <label className="absolute -bottom-2 -right-2 bg-white text-blue-600 rounded-full p-2 cursor-pointer hover:bg-gray-100 transition-colors shadow-lg">
                    <Camera className="w-4 h-4" />
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => onPickPhoto(e.target.files?.[0])} />
                  </label>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">{profile.name || 'User Profile'}</h1>
                <p className="text-white-100 text-base mb-1">Citizen</p>
                <p className="text-white-200 text-sm">Community Member</p>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center text-white-100 text-sm">
                    <Shield className="w-4 h-4 mr-2" />
                    Community Volunteer
                  </div>
                  {profile.address && (
                    <div className="flex items-center text-white-100 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      {profile.address.length > 25 ? profile.address.substring(0, 25) + '...' : profile.address}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-colors flex items-center text-sm"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg backdrop-blur-sm transition-colors flex items-center text-sm"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors flex items-center font-medium text-sm"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'personal', name: 'Personal Information', icon: User },
              { id: 'skills', name: 'Skills & Certifications', icon: Award },
              { id: 'gps', name: 'GPS', icon: MapPin },
              { id: 'availability', name: 'Availability', icon: Clock },
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
