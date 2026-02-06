import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "https://todo-backendd-alpha.vercel.app";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await axios.post(`${API_URL}/user/register`, formData);
      alert("Registration Successful! Now please login.");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-xl shadow-blue-100/50 w-full max-w-md border border-gray-100">
        
        {/* Logo/Icon */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">Join Workflow</h2>
          <p className="text-gray-500 mt-1 font-medium text-center">Create your account and start organizing</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-bold text-gray-700 ml-1 mb-2 block">Username</label>
            <input 
              required
              type="text" 
              placeholder="e.g. nabil_dev" 
              className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              onChange={(e) => setFormData({...formData, username: e.target.value})} 
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 ml-1 mb-2 block">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="name@example.com" 
              className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 ml-1 mb-2 block">Password</label>
            <input 
              required
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-gray-50">
          <p className="text-gray-500 font-medium">
            Already have an account? 
            <Link to="/login" className="text-blue-600 ml-2 font-bold hover:underline">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;