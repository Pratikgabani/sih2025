import React, { useEffect, useState } from 'react';
import { getAvailability, setAvailability } from './utils/storage';

const mockMissions = [
  { id: 1, title: 'Flood Relief - Ward 3', location: 'Lighthouse Rd', needed: 5, desc: 'Distribute sandbags, assist residents', severity: 'High', status: 'pending', skills: ['First Aid'], contact: 'Officer Rao: 9876543210', lat: 13.050, lng: 80.280 },
  { id: 2, title: 'Beach Cleanup', location: 'Marina Beach', needed: 12, desc: 'Clear debris, segregate waste', severity: 'Medium', status: 'pending', skills: ['Teamwork'], contact: 'Nagarajan: 9000000000', lat: 13.060, lng: 80.270 },
];

const Volunteers = () => {
  const [available, setAvail] = useState(getAvailability());
  const [myMissions, setMyMissions] = useState([]);
  const [completeFor, setCompleteFor] = useState(null); // mission id or object

  useEffect(()=>{ setAvail(getAvailability()); },[]);

  const toggleAvail = () => { setAvail(v => { setAvailability(!v); return !v; }); };

  const acceptMission = (m) => {
    if (!available) { alert('Turn ON availability in Profile to accept missions.'); return; }
    setMyMissions((arr)=> arr.find(x=>x.id===m.id) ? arr : [...arr, { ...m, status: 'pending' }]);
  };

  const submitCompletion = (payload) => {
    const { id, status, description, mediaCount } = payload;
    setMyMissions(arr => arr.map(m => m.id === id ? { ...m, status, description, mediaCount, verified: status === 'completed' ? 'requested' : 'none' } : m));
    setCompleteFor(null);
    alert('Submitted for verification.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold text-gray-800">Volunteer Missions</div>
          <div className="text-sm text-gray-600">Current availability: <span className={`font-semibold ${available ? 'text-green-600' : 'text-gray-600'}`}>{available ? 'ON' : 'OFF'}</span></div>
        </div>
        <button onClick={toggleAvail} className={`px-4 py-2 rounded-lg text-white ${available ? 'bg-gray-500' : 'bg-green-600'}`}>{available ? 'Go Offline' : 'Go Online'}</button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {mockMissions.map(m => (
          <div key={m.id} className="bg-white rounded-2xl shadow-md p-5 flex flex-col">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-semibold text-gray-900 text-base">{m.title}</div>
                <div className="mt-1 flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-sky-50 text-sky-700">{m.location}</span>
                  <span className="px-2 py-1 rounded-full bg-amber-50 text-amber-700">Severity: {m.severity}</span>
                  <span className="px-2 py-1 rounded-full bg-gray-50 text-gray-700">Required: {m.needed}</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">Skills: {m.skills.join(', ')}</div>
                <div className="text-sm text-gray-600">Lead: {m.contact}</div>
              </div>
              <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}`} className="px-3 py-1.5 bg-sky-600 text-white rounded-lg">Navigate</a>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={()=>acceptMission(m)} className="px-3 py-2 rounded-lg bg-green-600 text-white">Accept Mission</button>
            </div>
          </div>
        ))}
      </div>

      {myMissions.length > 0 && (
        <div className="space-y-3">
          <div className="text-lg font-semibold text-gray-800">My Missions</div>
          {myMissions.map(m => (
            <div key={m.id} className="bg-white rounded-2xl shadow-md p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{m.title}</div>
                  <div className="mt-1 text-sm text-gray-600">{m.location}</div>
                  <div className="mt-2 text-xs">Status: <span className={`px-2 py-1 rounded-full ${m.status==='pending' ? 'bg-yellow-50 text-yellow-700' : m.status==='completed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{m.status}</span></div>
                </div>
                <button onClick={()=>setCompleteFor(m)} className="px-3 py-1.5 bg-sky-600 text-white rounded-lg">Complete & Verify</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {completeFor && (
        <CompleteModal mission={completeFor} onClose={()=>setCompleteFor(null)} onSubmit={submitCompletion} />
      )}
    </div>
  );
};

// Reusable sky-themed custom select to avoid native dark dropdowns
const ChipSelect = ({ value, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const isObj = (o) => typeof o === 'object' && o !== null;
  const items = (options || []).map(o => isObj(o) ? o : ({ label: String(o), value: String(o) }));
  const selected = items.find(i => i.value === value);
  return (
    <div className="relative inline-block">
      <button type="button" onClick={()=>setOpen(o=>!o)} className={`px-3 py-2 rounded-lg bg-sky-50 text-sky-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 inline-flex items-center gap-2`}>
        <span>{selected?.label || placeholder}</span>
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-56 bg-white rounded-xl shadow-xl p-1">
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

export default Volunteers;

// Completion Modal with live capture and description
const CompleteModal = ({ mission, onClose, onSubmit }) => {
  const [status, setStatus] = useState('completed');
  const [desc, setDesc] = useState('');
  const [media, setMedia] = useState([]);
  const [previews, setPreviews] = useState([]);

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
    setMedia(prev => { const copy = [...prev]; copy.splice(idx, 1); return copy; });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!media.length) { alert('Please capture at least one photo/video.'); return; }
    onSubmit({ id: mission.id, status, description: desc, mediaCount: media.length });
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <form onSubmit={submit} className="bg-white rounded-2xl w-full max-w-3xl shadow-xl overflow-hidden">
          <div className="px-5 py-3 shadow-sm sticky top-0 bg-white">
            <div className="font-semibold">Complete & Verify — {mission.title}</div>
          </div>
          <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="grid md:grid-cols-2 gap-3">
              <label className="text-sm text-gray-700">Status
                <div className="mt-1">
                  <ChipSelect
                    value={status}
                    onChange={(v)=>setStatus(v)}
                    placeholder="Select status"
                    options={[
                      { label: 'Partially Completed', value: 'partial' },
                      { label: 'Completed', value: 'completed' }
                    ]}
                  />
                </div>
              </label>
              <label className="text-sm text-gray-700">Description
                <input value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="What did you complete?" className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </label>
            </div>

            <div>
              <div className="text-sm font-semibold text-gray-800 mb-2">Capture Proof *</div>
              <div className="grid grid-cols-3 gap-3 items-stretch">
                <label htmlFor="vcapPhoto" className="cursor-pointer aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 text-center px-2">
                  <span className="text-sm font-medium">Take Photo</span>
                  <input id="vcapPhoto" type="file" accept="image/*" capture="environment" className="hidden" onChange={(e)=>{ const files = Array.from(e.target.files || []); addFiles(files); e.target.value=''; }} />
                </label>
                <label htmlFor="vcapVideo" className="cursor-pointer aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 text-center px-2">
                  <span className="text-sm font-medium">Record Video</span>
                  <input id="vcapVideo" type="file" accept="video/*" capture className="hidden" onChange={(e)=>{ const files = Array.from(e.target.files || []); addFiles(files); e.target.value=''; }} />
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
                        <img src={p.url} alt={`mcap-${i}`} className="w-full h-32 object-cover" />
                      ) : p.type === 'video' ? (
                        <video src={p.url} className="w-full h-32 object-cover" controls />
                      ) : (
                        <div className="h-32 flex items-center justify-center text-xs text-gray-500">Unsupported</div>
                      )}
                      <button type="button" onClick={()=>removeAt(i)} className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 rounded-full w-7 h-7 flex items-center justify-center shadow">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="px-5 py-3 bg-gray-50 flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-sky-600 text-white">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
