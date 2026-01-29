import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/login", { email, password });
      
      // Token ko localStorage mein save karna
      localStorage.setItem("token", response.data.token);
      
      alert("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Email Address</label>
            <input 
              className="border p-2.5 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              type="email" placeholder="name@company.com" required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Password</label>
            <input 
              className="border p-2.5 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              type="password" placeholder="••••••••" required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2.5 rounded-md font-semibold hover:bg-blue-700">
            Sign In
          </button>
          <p className="text-center text-sm">
            Don't have an account? <Link to="/register" className="text-blue-600 font-bold">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;