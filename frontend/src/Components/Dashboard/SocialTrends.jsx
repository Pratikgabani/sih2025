// src/components/SocialTrends.jsx
import React from "react";
import useStore from "../../store/UseStore";

export default function SocialTrends() {
  const { socialIndicators } = useStore();

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Social Media Indicators</h3>
      <ul className="space-y-3">
        {socialIndicators.map((s, idx) => (
          <li key={idx} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-800 dark:text-gray-200">{s.keyword}</span>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full">{s.source}</span>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-2">
              <span className="inline-flex items-center gap-1">
                📊 <span className="text-green-600 dark:text-green-400">Mentions: {s.mentions}</span>
              </span>
              <span className="mx-2">·</span>
              <span className="inline-flex items-center gap-1">
                💭 <span className="text-blue-600 dark:text-blue-400">Sentiment: {s.sentiment}</span>
              </span>
              <span className="mx-2">·</span>
              <span className="inline-flex items-center gap-1">
                🔥 <span className="text-purple-600 dark:text-purple-400">Engagement: {s.engagement}</span>
              </span>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              <span className="font-medium">💡 Data Source:</span> NLP classification and trend extraction from social feeds (X/Twitter, Facebook, YouTube), mapped as keyword-weighted hotspots.
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
        <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
          <span className="font-medium">🔗 Integration:</span> NLP backend computes keyword intensity and pushes data to map as heatmap weights following Mapbox property weighting standards.
        </p>
      </div>
    </div>
  );
}
