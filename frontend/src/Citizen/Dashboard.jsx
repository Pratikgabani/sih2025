import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReadOnlyMapLibre from '../Components/Map/ReadOnlyMapLibre.jsx';
import { getProfile, isProfileComplete, saveProfile, getReports, canSubmitReportToday, saveReports } from './utils/storage';
import { FunnelIcon, CameraIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [profile, setProfile] = useState(getProfile());
  const [showProfilePrompt, setShowProfilePrompt] = useState(false);
  const [currentLayer, setCurrentLayer] = useState('wind');
  const [now, setNow] = useState(new Date());
  const [filters, setFilters] = useState({ eventType: '', timeRange: '24h', location: '' });
  const [quickType, setQuickType] = useState('');
  const [quickSeverity, setQuickSeverity] = useState('low');
  const [quickLocation, setQuickLocation] = useState('');
  const [photo, setPhoto] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const emergencyContacts = [
    { label: 'Emergency', phone: '112' },
    // { label: 'Police', phone: '100' },
    { label: 'Fire', phone: '101' },
    { label: 'Coast Guard', phone: '1554' },
    { label: 'Disaster Management', phone: '1077' },
  ];

  useEffect(() => {
    const p = getProfile();
    setProfile(p);
    setShowProfilePrompt(!isProfileComplete(p));
  }, []);

  // live clock for time box
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // silently attempt to capture location for Quick Report
  useEffect(() => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setQuickLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
      },
      () => { /* ignore errors, keep empty location */ },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  }, []);

  const safetyStatus = useMemo(() => {
    // Demo safety status based on gps toggle only
    if (!profile.gpsOn) return { label: 'GPS Off', color: 'bg-gray-100 text-gray-700' };
    return { label: 'Safe', color: 'bg-green-100 text-green-700' };
  }, [profile.gpsOn]);

  // Trust score breakdown
  const { totalTrust, reportTrust, volunteerTrust, trustLevel } = useMemo(() => {
    const reports = getReports();
    const reportCount = Array.isArray(reports) ? reports.length : 0;
    const reportScore = Math.min(60, reportCount * 6); // up to 60
    let volunteerScore = 0;
    try {
      const vs = JSON.parse(localStorage.getItem('vol_stats') || '{}');
      const completed = Number(vs.completed || 0);
      volunteerScore = Math.min(40, completed * 8); // up to 40
    } catch {}
    
    const total = reportScore + volunteerScore;
    
    // Calculate trust level and range
    let level, range, color;
    if (total >= 80) {
      level = 'Excellent';
      range = '80-100';
      color = 'text-green-600';
    } else if (total >= 60) {
      level = 'Good';
      range = '60-79';
      color = 'text-blue-600';
    } else if (total >= 40) {
      level = 'Average';
      range = '40-59';
      color = 'text-yellow-600';
    } else {
      level = 'Poor';
      range = '0-39';
      color = 'text-orange-600';
    }
    
    return { 
      totalTrust: total, 
      reportTrust: reportScore, 
      volunteerTrust: volunteerScore,
      trustLevel: { level, range, color }
    };
  }, [profile]);

  const hotspotBounds = { top: 90, bottom: -90, left: -180, right: 180 };
  const hotspots = [];

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraOpen(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Could not access the camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL and set as photo
      setPhoto(canvas.toDataURL('image/jpeg'));
      stopCamera();
    }
  };

  const removePhoto = () => {
    setPhoto(null);
  };

  const handleQuickReport = () => {
    const check = canSubmitReportToday();
    if (!check.allowed) { alert('Daily limit reached (10 reports). Try again tomorrow.'); return; }
    if (!quickType) { alert('Select a hazard type first.'); return; }
    
    const newReport = {
      id: Date.now(),
      title: 'Quick Report',
      hazardType: quickType,
      severity: quickSeverity,
      location: quickLocation,
      description: 'Quick hazard report',
      photo: photo, // Include the photo in the report
      createdAt: new Date().toISOString()
    };
    
    const arr = [newReport, ...getReports()];
    saveReports(arr);
    
    // Reset form
    setQuickType('');
    setQuickSeverity('low');
    setPhoto(null);
    
    alert('Quick report submitted.');
  };

  return (
    <div className="space-y-7">
      {/* Profile prompt */}
      {showProfilePrompt && (
        <div className="p-4 rounded-xl bg-amber-50 shadow-sm flex items-start justify-between gap-4">
          <div>
            <div className="font-semibold text-amber-900">Complete your profile</div>
            <div className="text-amber-800 text-sm">Please fill in name, phone, email and provide address or enable GPS.</div>
          </div>
          <a href="/citizen/profile" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm">Update Profile</a>
        </div>
      )}

      {/* Top cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="space-y-5">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="text-sm text-gray-500">Safety Status</div>
            <div className={`inline-flex mt-2 px-3 py-1 rounded-full text-sm font-medium ${safetyStatus.color}`}>{safetyStatus.label}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="text-sm text-gray-500">Time</div>
            <div className="mt-2 text-lg font-semibold text-gray-800">{now.toLocaleDateString()}</div>
            <div className="text-2xl font-bold text-sky-700">{now.toLocaleTimeString()}</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-3.5">
          <div className="text-sm text-gray-500">Trust Score</div>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-2xl font-bold text-sky-700">{totalTrust}</span>
            <span className="text-sm text-gray-500">/ 100</span>
          </div>
            {/* <div className="mt-1 flex items-center gap-2">
              <span className={`text-sm font-semibold ${trustLevel.color}`}>{trustLevel.level}</span>
              <span className="text-xs text-gray-500">({trustLevel.range})</span>
            </div> */}
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Reports</span>
              <span className="font-semibold text-gray-800">{reportTrust}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-sky-500" style={{ width: `${(reportTrust/60)*100}%` }} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Volunteering</span>
              <span className="font-semibold text-gray-800">{volunteerTrust}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${(volunteerTrust/40)*100}%` }} />
            </div>
          </div>
          
          {/* Trust Score Rules */}
          <div className="mt-2.5 pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-1 font-medium">Score Ranges:</div>
            <div className="grid grid-cols-2 gap-x-2.5 gap-y-0 text-xs">
              <div className="flex justify-between">
                <span className="text-green-600 font-medium">Excellent</span>
                <span className="text-gray-500">80-100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600 font-medium">Good</span>
                <span className="text-gray-500">60-79</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-600 font-medium">Average</span>
                <span className="text-gray-500">40-59</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-600 font-medium">Poor</span>
                <span className="text-gray-500">0-39</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-3">
          <div className="text-sm text-gray-500 mb-1">Emergency Contacts</div>
          <div className="divide-y divide-gray-100">
            {emergencyContacts.map((c) => (
              <div key={c.phone} className="flex items-center justify-between py-1.5">
                <div className="flex-1 text-gray-800 font-medium text-sm">{c.label}</div>
                <div className="flex-1 text-gray-700 text-sm">{c.phone}</div>
                <a href={`tel:${c.phone}`} aria-label={`Call ${c.label}`} className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h3.04c.994 0 1.86.652 2.136 1.604l.66 2.31a2.25 2.25 0 01-.54 2.19l-1.21 1.21a15.75 15.75 0 006.29 6.29l1.21-1.21a2.25 2.25 0 012.19-.54l2.31.66c.952.276 1.604 1.142 1.604 2.136v3.04c0 1.243-1.007 2.25-2.25 2.25h-.75C8.518 22.5 1.5 15.482 1.5 6.75v-.75z"/></svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map + filters */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 flex flex-wrap gap-3 items-center shadow-sm">
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-5 h-5 text-sky-600" />
            <span className="font-medium text-gray-700">Smart Filters</span>
          </div>
          <ChipSelect
            value={filters.eventType}
            onChange={(v)=>setFilters(f=>({...f, eventType:v}))}
            placeholder="Event Type"
            options={["Tsunami","Storm Surge","Flooding"]}
          />
          <ChipSelect
            value={filters.timeRange}
            onChange={(v)=>setFilters(f=>({...f, timeRange:v}))}
            placeholder="Time Range"
            options={[
              { label: 'Last 1h', value: '1h' },
              { label: 'Last 24h', value: '24h' },
              { label: 'Last 7d', value: '7d' }
            ]}
          />
          <input className="px-3 py-2 rounded-lg bg-sky-50 text-sky-800 placeholder-sky-700/60 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Location" value={filters.location} onChange={(e)=>setFilters(f=>({...f, location:e.target.value}))} />
          <button className="ml-auto px-3 py-1.5 bg-sky-600 text-white rounded-lg shadow-sm">Apply Filters</button>
        </div>
        <div className="aspect-[16/9]">
          <ReadOnlyMapLibre height="100%" />
        </div>
      </div>

      {/* Feed + Quick report */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-5">
          <div className="font-semibold text-gray-800 mb-2">Hotspots & Social Updates</div>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="p-3 bg-gray-50 rounded-lg">High waves reported near Marina Beach.</li>
            <li className="p-3 bg-gray-50 rounded-lg">Coastal flooding alert issued for low-lying areas.</li>
            <li className="p-3 bg-gray-50 rounded-lg">Community volunteers needed at Lighthouse Road.</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="font-semibold text-gray-800 mb-2">Quick Report</div>
          <p className="text-sm text-gray-600 mb-3">Choose hazard type and submit.</p>
          <div className="mb-3 flex flex-wrap gap-3">
            <ChipSelect
              value={quickType}
              onChange={(v)=>setQuickType(v)}
              placeholder="Hazard Type"
              options={["Tsunami","Storm Surge","High Waves","Coastal Flooding","Coastal Erosion","Abnormal Tide","Swell Surge","Other"]}
            />
            <ChipSelect
              value={quickSeverity}
              onChange={(v)=>setQuickSeverity(v)}
              placeholder="Severity"
              options={[
                { label: 'Low', value: 'low' },
                { label: 'Medium', value: 'medium' },
                { label: 'High', value: 'high' },
                { label: 'Critical', value: 'critical' }
              ]}
            />
            <button
              type="button"
              onClick={photo ? removePhoto : startCamera}
              className={`px-3 py-2 rounded-lg flex items-center gap-2 ${photo ? 'bg-red-50 text-red-600' : 'bg-sky-50 text-sky-700'} hover:opacity-90 transition-colors`}
            >
              {photo ? (
                <>
                  <XMarkIcon className="w-5 h-5" />
                  <span>Remove Photo</span>
                </>
              ) : (
                <>
                  <CameraIcon className="w-5 h-5" />
                  <span></span>
                </>
              )}
            </button>
          </div>
          
          {/* Camera preview and capture UI */}
          {cameraOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50 p-4">
              <div className="w-full max-w-md bg-white rounded-lg overflow-hidden">
                <div className="relative" style={{ paddingTop: '75%' }}>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                </div>
                <div className="p-4 flex justify-center gap-4 bg-gray-50">
                  <button
                    onClick={capturePhoto}
                    className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100"
                  >
                    <div className="w-10 h-10 rounded-full bg-red-500 border-4 border-white"></div>
                  </button>
                  <button
                    onClick={stopCamera}
                    className="p-3 text-gray-600 hover:text-gray-800"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Photo preview */}
          {photo && (
            <div className="mb-3 relative group">
              <img 
                src={photo} 
                alt="Captured hazard" 
                className="w-full h-40 object-cover rounded-lg border border-gray-200"
              />
            </div>
          )}
          <button onClick={handleQuickReport} disabled={!quickType} className="w-full py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Submit</button>
          {quickLocation && (
            <p className="mt-2 text-xs text-gray-500">Auto location: {quickLocation}</p>
          )}
          <p className="mt-2 text-xs text-gray-500">Limit: 10 per day.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// Sky-themed custom select to avoid native dark dropdowns
const ChipSelect = ({ value, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const isObj = (o) => typeof o === 'object' && o !== null;
  const items = (options || []).map(o => isObj(o) ? o : ({ label: String(o), value: String(o) }));
  const selected = items.find(i => i.value === value);
  return (
    <div className="relative">
      <button type="button" onClick={()=>setOpen(o=>!o)} className={`px-3 py-2 rounded-lg bg-sky-50 text-sky-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 inline-flex items-center gap-2`}>
        <span>{selected?.label || placeholder}</span>
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-48 bg-white rounded-xl shadow-xl p-1">
          {items.map(it => (
            <button key={it.value} type="button" onClick={()=>{ onChange(it.value); setOpen(false); }} className={`w-full text-left px-3 py-2 rounded-lg hover:bg-sky-50 ${value===it.value ? 'bg-sky-50 text-sky-800' : 'text-gray-700'}`}>
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
