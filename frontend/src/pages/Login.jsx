import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://todo-backend-weld-one.vercel.app/user/login", { email, password });
      
      // Token save karna
      localStorage.setItem("token", response.data.token);
      
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-xl shadow-blue-100/50 w-full max-w-md border border-gray-100">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight text-center">Welcome Back</h1>
          <p className="text-gray-500 mt-1 font-medium text-center">Enter your details to access your workflow</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 ml-1 mb-2 block">Email Address</label>
            <input 
              className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              type="email" 
              placeholder="name@example.com" 
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 ml-1 mb-2 block">Password</label>
            <input 
              className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              type="password" 
              placeholder="••••••••" 
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 transition-all active:scale-95 disabled:opacity-70 mt-2"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="mt-6 text-center pt-6 border-t border-gray-50">
            <p className="text-gray-500 font-medium text-sm">
              New here? 
              <Link to="/register" className="text-blue-600 ml-2 font-bold hover:underline">Create an account</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;