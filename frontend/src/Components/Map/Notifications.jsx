import React from "react";

const Notifications = ({ notifications = [] }) => {
  return (
    <div id="notifications" className="fixed top-20 right-4 z-50 space-y-2">
      {notifications.map((n) => (
        <div key={n.id} className={`toast ${n.type === "success" ? "bg-green-500" : n.type === "error" ? "bg-red-500" : "bg-blue-500"} text-white p-3 rounded shadow`}>
          <div className="flex items-center">
            <i className={`fas ${n.type === "success" ? "fa-check" : n.type === "error" ? "fa-exclamation-triangle" : "fa-info-circle"} mr-2`} />
            <span>{n.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
