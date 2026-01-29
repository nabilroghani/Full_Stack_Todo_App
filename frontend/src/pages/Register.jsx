import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/register", formData);
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 font-bold">Register</h2>
        <input 
          type="text" placeholder="Username" className="w-full border p-2 mb-3"
          onChange={(e) => setFormData({...formData, username: e.target.value})} 
        />
        <input 
          type="email" placeholder="Email" className="w-full border p-2 mb-3"
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
        />
        <input 
          type="password" placeholder="Password" className="w-full border p-2 mb-3"
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
        <p className="mt-2 text-sm">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;