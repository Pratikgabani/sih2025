import React, { useState } from 'react';

export const PieChart = ({ data, title, size = "w-48 h-48" }) => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const colors = [
    '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#F97316', '#06B6D4', '#84CC16'
  ];

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;
    
    const color = colors[index % colors.length];
    
    return {
      ...item,
      percentage: percentage.toFixed(1),
      startAngle,
      endAngle,
      color
    };
  });

  const createPath = (startAngle, endAngle) => {
    const start = (startAngle - 90) * (Math.PI / 180);
    const end = (endAngle - 90) * (Math.PI / 180);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    const x1 = 50 + 40 * Math.cos(start);
    const y1 = 50 + 40 * Math.sin(start);
    const x2 = 50 + 40 * Math.cos(end);
    const y2 = 50 + 40 * Math.sin(end);
    
    return `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const handleMouseMove = (e, segment) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left + 10,
      y: e.clientY - rect.top - 10
    });
    setHoveredSegment(segment);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{title}</h3>
      <div className="flex items-center justify-center space-x-6">
        {/* SVG Pie Chart */}
        <div className={`${size} relative`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {segments.map((segment, index) => (
              <path
                key={segment.label}
                d={createPath(segment.startAngle, segment.endAngle)}
                fill={segment.color}
                stroke="white"
                strokeWidth="0.5"
                className="hover:opacity-80 transition-all duration-200 cursor-pointer hover:stroke-2"
                onMouseMove={(e) => handleMouseMove(e, segment)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
            ))}
          </svg>
          
          {/* Tooltip */}
          {hoveredSegment && (
            <div 
              className="absolute bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg z-10 pointer-events-none"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="text-sm font-medium">{hoveredSegment.label}</div>
              <div className="text-xs text-gray-300">
                Value: {hoveredSegment.value} ({hoveredSegment.percentage}%)
              </div>
            </div>
          )}
        </div>
        
        {/* Legend */}
        <div className="space-y-2">
          {segments.map((segment, index) => (
            <div key={segment.label} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: segment.color }}
              ></div>
              <div className="text-sm">
                <span className="font-medium text-gray-900">{segment.label}</span>
                <span className="text-gray-600 ml-2">({segment.percentage}%)</span>
                <div className="text-xs text-gray-500">{segment.value} reports</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DonutChart = ({ data, title, centerText }) => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const colors = [
    '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#F97316', '#06B6D4', '#84CC16'
  ];

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;
    
    const color = colors[index % colors.length];
    
    return {
      ...item,
      percentage: percentage.toFixed(1),
      startAngle,
      endAngle,
      color
    };
  });

  const createDonutPath = (startAngle, endAngle) => {
    const start = (startAngle - 90) * (Math.PI / 180);
    const end = (endAngle - 90) * (Math.PI / 180);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    const x1 = 50 + 35 * Math.cos(start);
    const y1 = 50 + 35 * Math.sin(start);
    const x2 = 50 + 35 * Math.cos(end);
    const y2 = 50 + 35 * Math.sin(end);
    
    const x3 = 50 + 20 * Math.cos(end);
    const y3 = 50 + 20 * Math.sin(end);
    const x4 = 50 + 20 * Math.cos(start);
    const y4 = 50 + 20 * Math.sin(start);
    
    return `M ${x1} ${y1} A 35 35 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A 20 20 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
  };

  const handleMouseMove = (e, segment) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left + 10,
      y: e.clientY - rect.top - 10
    });
    setHoveredSegment(segment);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{title}</h3>
      <div className="flex items-center justify-center space-x-6">
        <div className="w-48 h-48 relative">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {segments.map((segment, index) => (
              <path
                key={segment.label}
                d={createDonutPath(segment.startAngle, segment.endAngle)}
                fill={segment.color}
                stroke="white"
                strokeWidth="0.5"
                className="hover:opacity-80 transition-all duration-200 cursor-pointer hover:stroke-2"
                onMouseMove={(e) => handleMouseMove(e, segment)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
            ))}
            {centerText && (
              <g>
                <text 
                  x="50" 
                  y="46" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="text-xs font-bold fill-gray-700"
                >
                  {centerText.split(' ')[0]}
                </text>
                {centerText.split(' ').length > 1 && (
                  <text 
                    x="50" 
                    y="56" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    className="text-xs font-medium fill-gray-600"
                  >
                    {centerText.split(' ').slice(1).join(' ')}
                  </text>
                )}
              </g>
            )}
          </svg>
          
          {/* Tooltip */}
          {hoveredSegment && (
            <div 
              className="absolute bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg z-10 pointer-events-none"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="text-sm font-medium">{hoveredSegment.label}</div>
              <div className="text-xs text-gray-300">
                Value: {hoveredSegment.value} ({hoveredSegment.percentage}%)
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          {segments.map((segment, index) => (
            <div key={segment.label} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: segment.color }}
              ></div>
              <div className="text-sm">
                <span className="font-medium text-gray-900">{segment.label}</span>
                <span className="text-gray-600 ml-2">({segment.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BarChart = ({ data, title, xLabel, yLabel, color = "#3B82F6" }) => {
  const [hoveredBar, setHoveredBar] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const maxValue = Math.max(...data.map(item => item.value));
  
  const handleMouseMove = (e, item) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left + 10,
      y: e.clientY - rect.top - 10
    });
    setHoveredBar(item);
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 relative">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={item.label} className="flex items-center space-x-3">
            <div className="w-20 text-sm text-gray-600 text-right">{item.label}</div>
            <div className="flex-1 relative">
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div 
                  className="h-6 rounded-full transition-all duration-300 flex items-center justify-end pr-2 cursor-pointer hover:opacity-80"
                  style={{ 
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: color
                  }}
                  onMouseMove={(e) => handleMouseMove(e, item)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <span className="text-white text-xs font-medium">{item.value}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Tooltip */}
      {hoveredBar && (
        <div 
          className="absolute bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg z-10 pointer-events-none"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="text-sm font-medium">{hoveredBar.label}</div>
          <div className="text-xs text-gray-300">
            Value: {hoveredBar.value}
          </div>
        </div>
      )}
      
      {(xLabel || yLabel) && (
        <div className="mt-4 text-xs text-gray-500 text-center">
          {yLabel && <div>{yLabel}</div>}
          {xLabel && <div>{xLabel}</div>}
        </div>
      )}
    </div>
  );
};

export const LineChart = ({ data, title, xLabel, yLabel, color = "#3B82F6" }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const maxValue = Math.max(...data.map(item => item.value));
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 300;
    const y = 100 - ((item.value / maxValue) * 80);
    return `${x},${y}`;
  }).join(' ');

  const handleMouseMove = (e, item) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left + 10,
      y: e.clientY - rect.top - 10
    });
    setHoveredPoint(item);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 relative">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="relative">
        <svg viewBox="0 0 300 120" className="w-full h-48">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line 
              key={y}
              x1="0" 
              y1={y} 
              x2="300" 
              y2={y} 
              stroke="#E5E7EB" 
              strokeWidth="0.5"
            />
          ))}
          
          {/* Data line */}
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2"
            points={points}
            className="transition-all duration-300"
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 300;
            const y = 100 - ((item.value / maxValue) * 80);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill={color}
                className="hover:r-6 transition-all duration-200 cursor-pointer hover:fill-opacity-80"
                onMouseMove={(e) => handleMouseMove(e, item)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          {data.map((item, index) => (
            <span key={index}>{item.label}</span>
          ))}
        </div>
      </div>
      
      {/* Tooltip */}
      {hoveredPoint && (
        <div 
          className="absolute bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg z-10 pointer-events-none"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="text-sm font-medium">{hoveredPoint.label}</div>
          <div className="text-xs text-gray-300">
            Value: {hoveredPoint.value}
          </div>
        </div>
      )}
      
      {(xLabel || yLabel) && (
        <div className="mt-4 text-xs text-gray-500 text-center">
          {yLabel && <div>{yLabel}</div>}
          {xLabel && <div>{xLabel}</div>}
        </div>
      )}
    </div>
  );
};

// Default export of all charts
const Charts = {
  PieChart,
  DonutChart,
  BarChart,
  LineChart
};

export default Charts;