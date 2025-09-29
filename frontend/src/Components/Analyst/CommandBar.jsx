import React from "react";
import { AlertTriangle, TrendingUp, FileText, Shield, Activity } from "lucide-react";

export default function CommandBar() {
  const kpis = [
    {
      id: 'active_incidents',
      label: 'Total Active Incidents',
      value: '247',
      change: '+12',
      trend: 'up',
      color: 'red',
      icon: AlertTriangle,
      description: 'Unique unverified/confirmed events under monitoring'
    },
    {
      id: 'high_urgency',
      label: 'High Urgency',
      value: '23',
      change: '+5',
      trend: 'up',
      color: 'orange',
      icon: Activity,
      description: 'Incidents with Verification Score ≥ critical threshold (8/10)',
      blinking: true
    },
    {
      id: 'new_reports',
      label: 'New Reports',
      value: '156',
      change: '+28',
      trend: 'up',
      color: 'blue',
      icon: FileText,
      description: 'Rate of incoming crowdsourced reports and social media clusters'
    },
    {
      id: 'official_alerts',
      label: 'Official Alerts (INCOIS)',
      value: '8',
      change: '+2',
      trend: 'up',
      color: 'green',
      icon: Shield,
      description: 'Active officially issued warnings from INCOIS (Tsunami, Storm Surge, High Wave)'
    }
  ];

  const getColorClasses = (color, blinking = false) => {
    const colors = {
      red: `bg-red-50 border-red-200 ${blinking ? 'animate-pulse' : ''}`,
      orange: `bg-orange-50 border-orange-200 ${blinking ? 'animate-pulse' : ''}`,
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200'
    };
    return colors[color] || colors.blue;
  };

  const getTextColorClasses = (color) => {
    const colors = {
      red: 'text-red-700',
      orange: 'text-orange-700',
      blue: 'text-blue-700',
      green: 'text-green-700'
    };
    return colors[color] || colors.blue;
  };

  const getIconColorClasses = (color) => {
    const colors = {
      red: 'text-red-600',
      orange: 'text-orange-600',
      blue: 'text-blue-600',
      green: 'text-green-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="px-6 py-4 bg-white border-b border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const IconComponent = kpi.icon;
          return (
            <div
              key={kpi.id}
              className={`p-4 rounded-lg border-2 transition-all hover:shadow-md cursor-pointer ${getColorClasses(kpi.color, kpi.blinking)}`}
              title={kpi.description}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-white ${getIconColorClasses(kpi.color)}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                    <div className="flex items-baseline space-x-2">
                      <p className={`text-2xl font-bold ${getTextColorClasses(kpi.color)}`}>
                        {kpi.value}
                      </p>
                      {kpi.change && (
                        <span className={`text-sm font-medium ${
                          kpi.trend === 'up' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {kpi.change}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {kpi.blinking && (
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full absolute"></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}