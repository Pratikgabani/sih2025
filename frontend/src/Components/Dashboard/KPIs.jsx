// src/components/KPIs.jsx
import React from "react";
import useStore from "../../store/UseStore";
// Live Reports
import { BoltIcon } from "@heroicons/react/24/outline";


// Verified Incidents
import { CheckBadgeIcon } from "@heroicons/react/24/outline";


// Hotspot Areas
import { FireIcon } from "@heroicons/react/24/outline";


// Social Mentions
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";


export default function KPIs() {
  const { kpis } = useStore();
  const cards = [
    { 
      label: "Live Reports (24h)", 
      value: kpis.reports24h, 
      icon: <BoltIcon className="h-9 w-9" />, 
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    },
    { 
      label: "Verified Incidents", 
      value: kpis.verified, 
      icon: <CheckBadgeIcon className="h-9 w-9" />, 
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700"
    },
    { 
      label: "Hotspot Areas", 
      value: kpis.hotspots, 
      icon: <FireIcon className="h-9 w-9" />, 
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-700"
    },
    { 
      label: "Social Mentions (1h)", 
      value: kpis.social1h, 
      icon: <ChatBubbleLeftRightIcon className="h-9 w-9" />, 
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700"
    },
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((c, index) => (
        <div 
          key={c.label} 
          className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl border border-gray-200 p-6 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${c.color} flex items-center justify-center text-white text-xl shadow-lg`}>
              {c.icon}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-800">{c.value}</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-700">{c.label}</div>
            <div className="text-xs text-gray-500 leading-relaxed">
              Real-time data from verified sources and social monitoring
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
