import React, { useEffect, useMemo, useState } from 'react';
import { getReports, saveReports, canSubmitReportToday } from './utils/storage';

const ReportsPage = () => {
  const [reports, setReports] = useState(getReports());
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (showForm) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [showForm]);

  const todayInfo = useMemo(() => canSubmitReportToday(), [reports]);

  const handleAdd = (payload) => {
    const info = canSubmitReportToday();
    if (!info.allowed) { alert('Daily limit reached (10 reports).'); return; }
    const newReport = { id: Date.now(), ...payload, createdAt: new Date().toISOString() };
    const arr = [newReport, ...getReports()];
    saveReports(arr);
    setReports(arr);
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold text-gray-800">Your Reports</div>
          <div className="text-sm text-gray-600">{todayInfo.remaining} submissions left today</div>
        </div>
        <button onClick={() => setShowForm(true)} disabled={!todayInfo.allowed} className="px-4 py-2 rounded-lg bg-sky-600 text-white disabled:opacity-50">Add Report</button>
      </div>

      {/* list */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-2">Title</th>
              <th className="text-left px-4 py-2">Location</th>
              <th className="text-left px-4 py-2">Severity</th>
              <th className="text-left px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 && (
              <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={4}>No reports yet</td></tr>
            )}
            {reports.map(r => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-2 font-medium text-gray-800">{r.hazardType || r.title || 'Report'}</td>
                <td className="px-4 py-2">{r.location || '-'}</td>
                <td className="px-4 py-2 capitalize">{r.severity || '-'}</td>
                <td className="px-4 py-2">{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <MinimalReportForm onSubmit={(data)=>{ handleAdd(data); }} />
        </Modal>
      )}
    </div>
  );
};

export default ReportsPage;

// Simple modal and minimal form components
const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50">
    <div className="absolute inset-0 bg-black/50" onClick={onClose} />
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-5 py-3 sticky top-0 bg-white rounded-t-2xl shadow-sm">
          <div className="font-semibold">New Report</div>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>
        <div className="overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const MinimalReportForm = ({ onSubmit }) => {
  const [data, setData] = useState({ hazardType: '', severity: '', location: '', description: '' });
  const [media, setMedia] = useState([]); // File[]
  const [previews, setPreviews] = useState([]); // {url, type}[]
  const [submitting, setSubmitting] = useState(false);
  const canSubmit = data.hazardType && data.severity && data.location && data.description && media.length > 0;

  const hazardTypes = [
    'Tsunami','Storm Surge','High Waves','Coastal Flooding','Coastal Erosion','Abnormal Tide','Swell Surge','Other'
  ];
  const severityLevels = [
    { value: 'low', label: 'Low', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
    { value: 'medium', label: 'Medium', color: 'text-orange-600 bg-orange-50 border-orange-200' },
    { value: 'high', label: 'High', color: 'text-red-600 bg-red-50 border-red-200' },
    { value: 'critical', label: 'Critical', color: 'text-red-800 bg-red-100 border-red-300' }
  ];

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      // Note: Files cannot be persisted to localStorage; we pass counts/metadata.
      await Promise.resolve(onSubmit({ ...data, mediaCount: media.length }));
    } finally {
      setSubmitting(false);
    }
  };

  const gps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos)=>{
        const { latitude, longitude } = pos.coords;
        setData(d => ({ ...d, location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` }));
      });
    }
  };

  const addFiles = (files) => {
    if (!files?.length) return;
    const newPreviews = files.map(f => ({ url: URL.createObjectURL(f), type: f.type.startsWith('image') ? 'image' : (f.type.startsWith('video') ? 'video' : 'other') }));
    setMedia(prev => [...prev, ...files]);
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeAt = (idx) => {
    setPreviews(prev => {
      const copy = [...prev];
      const [removed] = copy.splice(idx, 1);
      if (removed?.url) URL.revokeObjectURL(removed.url);
      return copy;
    });
    setMedia(prev => {
      const copy = [...prev];
      copy.splice(idx, 1);
      return copy;
    });
  };

  useEffect(() => () => { // cleanup on unmount
    previews.forEach(p => p.url && URL.revokeObjectURL(p.url));
  }, [previews]);

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Type of Ocean Hazard *</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {hazardTypes.map((type) => (
              <button key={type} type="button"
                onClick={() => setData(d => ({ ...d, hazardType: type }))}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${data.hazardType === type ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Severity Level *</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {severityLevels.map((level) => (
              <button key={level.value} type="button"
                onClick={() => setData(d => ({ ...d, severity: level.value }))}
                className={`p-3 rounded-xl border-2 text-sm font-bold transition-all duration-200 ${data.severity === level.value ? level.color : 'border-gray-200 hover:border-gray-300'}`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Location *</label>
          <div className="flex gap-3">
            <input type="text" value={data.location} onChange={(e)=>setData(d=>({...d, location:e.target.value}))} placeholder="Enter location or coordinates" className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" required />
            <button type="button" onClick={gps} className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2 font-medium">GPS</button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Detailed Description *</label>
          <textarea value={data.description} onChange={(e)=>setData(d=>({...d, description: e.target.value}))} placeholder="Describe what you observed in detail (wave height, water level, damage, etc.)" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none" required />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Photos/Videos *</label>
          <div className="grid grid-cols-3 gap-4 items-stretch">
            <label htmlFor="capturePhoto" className="cursor-pointer aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 text-center px-2">
              <span className="text-sm font-medium">Take Photo</span>
              <input id="capturePhoto" type="file" accept="image/*" capture="environment" className="hidden" onChange={(e)=>{ const files = Array.from(e.target.files || []); addFiles(files); e.target.value=''; }} />
            </label>
            <label htmlFor="captureVideo" className="cursor-pointer aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 text-center px-2">
              <span className="text-sm font-medium">Record Video</span>
              <input id="captureVideo" type="file" accept="video/*" capture className="hidden" onChange={(e)=>{ const files = Array.from(e.target.files || []); addFiles(files); e.target.value=''; }} />
            </label>
            <div className="col-span-1 flex items-center text-sm text-gray-600">
              {media.length > 0 ? `${media.length} captured` : 'At least 1 capture required'}
            </div>
          </div>
          {previews.length > 0 && (
            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
              {previews.map((p, i) => (
                <div key={p.url} className="relative rounded-xl overflow-hidden shadow-sm bg-gray-50">
                  {p.type === 'image' ? (
                    <img src={p.url} alt={`capture-${i}`} className="w-full h-32 object-cover" />
                  ) : p.type === 'video' ? (
                    <video src={p.url} className="w-full h-32 object-cover" controls />
                  ) : (
                    <div className="h-32 flex items-center justify-center text-xs text-gray-500">Unsupported</div>
                  )}
                  <button type="button" onClick={() => removeAt(i)} className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 rounded-full w-7 h-7 flex items-center justify-center shadow">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Your report will be reviewed by authorities and may be shared with emergency services.</p>
          <button type="submit" disabled={!canSubmit || submitting || media.length === 0} className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
            {submitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </div>
    </form>
  );
};
