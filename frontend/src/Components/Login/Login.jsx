import { useState } from "react";

export default function Login() {
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        
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

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Continue your mission to protect our oceans
        </p>

        {/* Form */}
        <form className="space-y-4">
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold hover:opacity-90 transition"
          >
            Access Platform
          </button>
        </form>

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
