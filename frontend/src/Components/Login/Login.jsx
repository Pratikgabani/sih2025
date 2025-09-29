
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [activeTab, setActiveTab] = useState("signin");
  const [signInRole, setSignInRole] = useState("citizen");
  const [joinRole, setJoinRole] = useState("");
  const navigate = useNavigate();

  const gotoByRole = (role) => {
    localStorage.setItem("role", role);
    if (role === "citizen") navigate("/citizen/dashboard");
    else if (role === "government") navigate("/govofficial/dashboard");
    else navigate("/dashboard");
  };

  return (
    <div className="min-h-full flex items-start justify-center py-4 md:py-8">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md mx-4 md:mx-auto min-h-fit">
        
        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab("signin")}
            className={`w-1/2 py-2 rounded-lg font-medium transition ${
              activeTab === "signin"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("join")}
            className={`w-1/2 py-2 rounded-lg font-medium transition ${
              activeTab === "join"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Join Platform
          </button>
        </div>

        {/* Conditional Content Based on Active Tab */}
        {activeTab === "signin" ? (
          <>
            {/* Sign In Form */}
            <h2 className="text-2xl font-bold text-center text-gray-800  mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Continue your mission to protect our oceans
            </p>

            <form className="space-y-4" onSubmit={(e)=>{ e.preventDefault(); gotoByRole(signInRole); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={signInRole}
                  onChange={(e)=>setSignInRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-sm"
                >
                  <option value="citizen">Citizen Reporter</option>
                  <option value="analyst">Analyst</option>
                  <option value="government">Government Official</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:opacity-90 transition shadow-md hover:shadow-lg"
              >
                Access Platform
              </button>
            </form>
          </>
        ) : (
          <>
            {/* Join Platform Form */}
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Join Our Mission
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Help us create a safer ocean environment for everyone
            </p>

            <form className="space-y-4" onSubmit={(e)=>{ e.preventDefault(); gotoByRole(joinRole || 'citizen'); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Role
                </label>
                <select
                  value={joinRole}
                  onChange={(e)=>setJoinRole(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                  <option value="">Select your role</option>
                  <option value="citizen">Citizen Reporter</option>
                  <option value="analyst">Analyst</option>
                  <option value="government">Government Official</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-lg  bg-blue-600 text-white font-semibold hover:opacity-90 transition"
              >
                Join the Platform
              </button>
            </form>
          </>
        )}

        {/* Footer */}
        <p className="text-xs text-center text-gray-500 mt-6">
          By continuing, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
