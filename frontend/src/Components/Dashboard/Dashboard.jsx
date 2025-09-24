// src/components/Dashboard.jsx
import React from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import KPIs from "./KPIs";
import Filters from "./Filters";
// import MapView from "./MapView";
import ReportsTable from "./ReportsTable";
import SocialTrends from "./SocialTrends";
import useStore from "../../store/UseStore";

export default function Dashboard() {
  const { role } = useStore();

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="p-4 md:p-6 space-y-4 md:space-y-6 overflow-auto flex-1 scrollbar-thin">
          <div className="animate-fadeInUp">
            <KPIs />
          </div>
          <div className="animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            <Filters />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            <div className="xl:col-span-2">
              <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300 rounded-xl border border-gray-200 dark:border-gray-700 h-[400px] md:h-[520px] flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-xl md:text-2xl">🗺️</span>
                  </div>
                  <p className="text-base md:text-lg font-medium dark:text-gray-300">Map View</p>
                  <p className="text-xs md:text-sm px-4">Interactive coastal monitoring map</p>
                </div>
                {/* <MapView /> */}
              </div>
            </div>
            <div className="xl:col-span-1">
              <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 h-[400px] md:h-[520px] overflow-auto scrollbar-thin">
                <SocialTrends />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
            <ReportsTable />
          </div>

          {role === "analyst" && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300 rounded-xl border border-blue-200 dark:border-blue-700 p-4 md:p-6 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📊</span>
                </div>
                <h3 className="font-bold text-lg md:text-xl text-blue-900 dark:text-blue-100">Analyst Tools</h3>
              </div>
              <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                Integrate hotspot logic by report density and keyword frequency from verified incidents via backend APIs. Configure heatmap weights and clustering strategies to highlight urgency and scale per Mapbox heatmap best practices.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
