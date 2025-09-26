// src/components/SocialTrends.jsx
import React from "react";
import useStore from "../../store/UseStore";

export default function SocialTrends() {
  const { socialIndicators } = useStore();

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4 text-gray-800">Social Media Indicators</h3>
      <ul className="space-y-3">
        {socialIndicators.map((s, idx) => (
          <li key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-800">{s.keyword}</span>
              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">{s.source}</span>
            </div>
            <div className="text-sm text-gray-700 font-medium mb-2">
              <span className="inline-flex items-center gap-1">
                 <span className="">Mentions: {s.mentions}</span>
              </span>
              <span className="mx-2">·</span>
              <span className="inline-flex items-center gap-1">
                 <span className="">Sentiment: {s.sentiment}</span>
              </span>
              <span className="mx-2">·</span>
              <span className="inline-flex items-center gap-1">
                 <span className="">Engagement: {s.engagement}</span>
              </span>
            </div>
            <div className="text-xs text-gray-600 leading-relaxed">
              <span className="font-medium">💡 Data Source:</span> NLP classification and trend extraction from social feeds (X/Twitter, Facebook, YouTube), mapped as keyword-weighted hotspots.
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-700 leading-relaxed">
          <span className="font-medium">🔗 Integration:</span> NLP backend computes keyword intensity and pushes data to map as heatmap weights following Mapbox property weighting standards.
        </p>
      </div>
    </div>
  );
}
