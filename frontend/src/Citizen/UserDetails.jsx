import React, { useEffect, useState } from 'react';
import { getProfile, saveProfile, isProfileComplete, setAvailability, getAvailability } from './utils/storage';

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
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm"
                      value={profile.name || ''}
                      onChange={(e) => setProfile(p => ({...p, name: e.target.value}))}
                    />
                  ) : (
                    <p className="text-gray-900">{profile.name || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {editMode ? (
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm"
                      value={profile.email || ''}
                      onChange={(e) => setProfile(p => ({...p, email: e.target.value}))}
                    />
                  ) : (
                    <p className="text-gray-900">{profile.email || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  {editMode ? (
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm"
                      value={profile.phone || ''}
                      onChange={(e) => setProfile(p => ({...p, phone: e.target.value}))}
                    />
                  ) : (
                    <p className="text-gray-900">{profile.phone || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    {editMode && (
                      <button
                        type="button"
                        onClick={useCurrentLocation}
                        className="text-xs text-sky-600 hover:text-sky-700 flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Use Current Location</span>
                      </button>
                    )}
                  </div>
                  {editMode ? (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm"
                      value={profile.address || ''}
                      onChange={(e) => setProfile(p => ({...p, address: e.target.value}))}
                      placeholder="Enter your address"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.address || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>

            {editMode && (
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
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
                      className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    />
                    <button
                      onClick={addSkill}
                      className="px-3 py-1.5 bg-sky-600 text-white text-sm font-medium rounded-md hover:bg-sky-700"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <div key={skill.id} className="relative group">
                    <div className="px-3 py-1.5 bg-sky-100 text-sky-800 text-sm font-medium rounded-full flex items-center">
                      {skill.name}
                      {editMode && (
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="ml-1.5 text-sky-600 hover:text-sky-800"
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
          </div>
        );

      case 'gps':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Services</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">GPS Tracking</h4>
                  <p className="text-sm text-gray-500">Share your location with trusted organizations</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={profile.gpsOn}
                    onChange={(e) => setProfile(p => ({...p, gpsOn: e.target.checked}))}
                    disabled={!editMode}
                  />
                  <div className={`w-11 h-6 ${editMode ? 'bg-gray-200 peer-focus:outline-none' : 'bg-gray-100'} rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${editMode ? 'peer-checked:bg-sky-600' : ''}`}></div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'availability':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Available for Emergencies</h4>
                  <p className="text-sm text-gray-500">Mark yourself as available to help in emergency situations</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={available}
                    onChange={(e) => setAvail(e.target.checked)}
                    disabled={!editMode}
                  />
                  <div className={`w-11 h-6 ${editMode ? 'bg-gray-200 peer-focus:outline-none' : 'bg-gray-100'} rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${editMode ? 'peer-checked:bg-sky-600' : ''}`}></div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'certifications':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
                {editMode && (
                  <button
                    onClick={() => document.getElementById('add-certification-modal').showModal()}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700"
                  >
                    <svg className="-ml-0.5 mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Certification
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {certifications.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {certifications.map(cert => (
                      <li key={cert.id} className="py-4 flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{cert.title}</h4>
                          <p className="text-sm text-gray-600">{cert.organization}</p>
                          <p className="text-xs text-gray-500 mt-1">Issued: {cert.date}</p>
                        </div>
                        {editMode && (
                          <button
                            onClick={() => removeCertification(cert.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No certifications added yet.</p>
                )}
              </div>
            </div>

            {/* Add Certification Modal */}
            <dialog id="add-certification-modal" className="p-6 rounded-lg shadow-xl max-w-md w-full mt-20 ml-20 sm:mt-32 sm:ml-30 md:mt-40 md:ml-40 lg:mt-60 lg:ml-80 xl:ml-140">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Certification</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm"
                    value={newCertification.title}
                    onChange={(e) => setNewCertification({...newCertification, title: e.target.value})}
                    placeholder="e.g., First Aid Certified"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm"
                    value={newCertification.organization}
                    onChange={(e) => setNewCertification({...newCertification, organization: e.target.value})}
                    placeholder="e.g., Red Cross"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm"
                    value={newCertification.date}
                    onChange={(e) => setNewCertification({...newCertification, date: e.target.value})}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => document.getElementById('add-certification-modal').close()}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addCertification}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700"
                >
                  Add Certification
                </button>
              </div>
            </dialog>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-sm"
                  src={profile.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || 'User')}&background=0EA5E9&color=fff`}
                  alt="Profile"
                />
                {editMode && (
                  <label className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-md cursor-pointer hover:bg-gray-50">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => onPickPhoto(e.target.files?.[0])} />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </label>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profile.name || 'User Profile'}</h1>
                <p className="text-gray-600">Citizen</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'personal', name: 'Personal Information' },
                { id: 'skills', name: 'Skills' },
                { id: 'gps', name: 'GPS' },
                { id: 'availability', name: 'Availability' },
                { id: 'certifications', name: 'Certifications' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${activeTab === tab.id
                    ? 'border-sky-500 text-sky-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
