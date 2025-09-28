import React, { useEffect, useState } from 'react';
import { getProfile, saveProfile, isProfileComplete, setAvailability, getAvailability } from './utils/storage';

const UserDetails = () => {
  const [profile, setProfile] = useState(getProfile());
  const [available, setAvail] = useState(getAvailability());
  const [editMode, setEditMode] = useState(false);

  useEffect(() => { setProfile(getProfile()); setAvail(getAvailability()); }, []);

  const handleSave = () => {
    saveProfile({ ...profile, available });
    setAvailability(available);
    setEditMode(false);
    alert('Profile saved');
  };

  const handleCancel = () => {
    setProfile(getProfile());
    setAvail(getAvailability());
    setEditMode(false);
  };

  const onPickPhoto = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfile(p => ({ ...p, photo: reader.result }));
    reader.readAsDataURL(file);
  };

  const useCurrentLocation = () => {
    if (!('geolocation' in navigator)) { alert('Geolocation not supported'); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setProfile(p => ({ ...p, address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`, gpsOn: true }));
      },
      (err) => { console.warn('Geolocation failed', err?.message); },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  return (
    <div className="max-w-md mx-4 sm:mx-auto w-full text-base sm:text-sm">
      {/* Header with edit button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl sm:text-2xl font-bold text-gray-900">Profile</h1>
        {!editMode ? (
          <button 
            onClick={() => setEditMode(true)}
            className="text-sky-600 hover:text-sky-700"
            aria-label="Edit profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Cancel editing"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button 
              onClick={handleSave}
              className="text-sky-600 hover:text-sky-700"
              aria-label="Save changes"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <img 
              src={profile.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || 'User')}&background=0EA5E9&color=fff`} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-4 border-sky-100"
            />
            {editMode && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                <label className="bg-white p-1.5 rounded-full shadow-md cursor-pointer hover:bg-gray-50">
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => onPickPhoto(e.target.files?.[0])} />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
                {profile.photo && (
                  <button 
                    onClick={() => setProfile(p => ({...p, photo: ''}))}
                    className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-50"
                    aria-label="Remove photo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900">{profile.name || 'Citizen User'}</h2>
          <p className="text-gray-600">Citizen</p>
        </div>
        {/* Details Section */}
        <div className="space-y-6 sm:space-y-8">
          {!editMode ? (
            // Read-only view
            <>
              <div className="flex justify-between py-6 border-b border-gray-100">
                <span className="text-lg text-gray-600 font-medium">Email</span>
                <span className="text-lg text-gray-900 text-right">{profile.email || '—'}</span>
              </div>
              <div className="flex justify-between py-6 border-b border-gray-100">
                <span className="text-lg text-gray-600 font-medium">Phone</span>
                <span className="text-lg text-gray-900">{profile.phone || '—'}</span>
              </div>
              <div className="flex justify-between py-6 border-b border-gray-100">
                <span className="text-lg text-gray-600 font-medium">Location</span>
                <span className="text-lg text-gray-900 text-right max-w-[200px] truncate">{profile.address || '—'}</span>
              </div>
              <div className="flex justify-between py-6 border-b border-gray-100">
                <span className="text-lg text-gray-600 font-medium">GPS</span>
                <span className={`${profile.gpsOn ? 'text-green-600' : 'text-gray-600'} font-medium`}>
                  {profile.gpsOn ? 'On' : 'Off'}
                </span>
              </div>
              <div className="flex justify-between py-6">
                <span className="text-lg text-gray-600 font-medium">Availability</span>
                <span className={`${available ? 'text-green-600' : 'text-gray-600'} font-medium`}>
                  {available ? 'Available' : 'Not Available'}
                </span>
              </div>
            </>
          ) : (
            // Edit form
            <div className="space-y-6">
              <div>
                <label className="block text-base sm:text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-base sm:text-sm"
                  value={profile.name || ''}
                  onChange={(e) => setProfile(p => ({...p, name: e.target.value}))}
                />
              </div>
              
              <div>
                <label className="block text-base sm:text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-base sm:text-sm"
                  value={profile.email}
                  onChange={(e) => setProfile(p => ({...p, email: e.target.value}))}
                />
              </div>
              
              <div>
                <label className="block text-base sm:text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-base sm:text-sm"
                  value={profile.phone}
                  onChange={(e) => setProfile(p => ({...p, phone: e.target.value}))}
                />
              </div>
              
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-1">
                  <label className="block text-base sm:text-sm font-medium text-gray-700">Location</label>
                  <button
                    type="button"
                    onClick={useCurrentLocation}
                    className="text-sm sm:text-xs text-sky-600 hover:text-sky-700 flex items-center gap-1 self-start sm:self-auto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Use Current Location</span>
                  </button>
                </div>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-base sm:text-sm"
                  value={profile.address}
                  onChange={(e) => setProfile(p => ({...p, address: e.target.value}))}
                  placeholder="Enter your address"
                />
              </div>
              
              <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-base sm:text-sm font-medium text-gray-900">GPS Location</p>
                    <p className="text-sm sm:text-xs text-gray-500">Enable to share your location</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={profile.gpsOn}
                      onChange={(e) => setProfile(p => ({...p, gpsOn: e.target.checked}))}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-base sm:text-sm font-medium text-gray-900">Availability</p>
                    <p className="text-sm sm:text-xs text-gray-500">Mark yourself as available for volunteering</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={available}
                      onChange={(e) => setAvail(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                  </label>
                </div>
              </div>
              
              <div className="pt-4 sticky bottom-4 sm:static">
                <button
                  type="button"
                  onClick={handleSave}
                  className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base sm:text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

};
export default UserDetails;
