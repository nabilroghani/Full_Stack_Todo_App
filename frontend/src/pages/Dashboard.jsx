import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium"); // Priority state
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get("https://todo-backend-weld-one.vercel.app/todo/get", config);
      setTodos(data);
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
    }
  };

  useEffect(() => { fetchTodos(); }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const { data } = await axios.post("http://localhost:3000/todo/create", { title, priority }, config);
      setTodos([data, ...todos]);
      setTitle("");
      setPriority("Medium");
    } catch (err) { alert("Add failed"); }
  };

  const handleToggle = async (todo) => {
    try {
      const { data } = await axios.put(`http://localhost:3000/todo/update/${todo._id}`, { isCompleted: !todo.isCompleted }, config);
      setTodos(todos.map((t) => (t._id === todo._id ? data : t)));
    } catch (err) { alert("Update failed"); }
  };

  const handleSaveEdit = async (id) => {
    try {
      const { data } = await axios.put(`http://localhost:3000/todo/update/${id}`, { title: editTitle }, config);
      setTodos(todos.map((t) => (t._id === id ? data : t)));
      setEditingId(null);
    } catch (err) { alert("Edit failed"); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todo/delete/${id}`, config);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) { alert("Delete failed"); }
  };

  const getPriorityColor = (p) => {
    switch (p) {
      case "High": return "bg-red-100 text-red-700 border-red-200";
      case "Medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Header - Glassmorphism effect */}
        <header className="flex flex-col sm:flex-row justify-between items-center bg-white border border-gray-200 p-6 rounded-2xl shadow-sm mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-black text-blue-600 tracking-tight">WORKFLOW</h1>
            <p className="text-gray-500 text-sm">Organize your day efficiently</p>
          </div>
          <button 
            onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}
            className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
          >
            Logout
          </button>
        </header>

        {/* Create Task Card */}
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm mb-10">
          <form onSubmit={handleAddTodo} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-3">
              <input 
                type="text" 
                className="flex-1 bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-lg"
                placeholder="What's on your mind today?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="md:w-40 bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              >
                <option value="High">🔥 High</option>
                <option value="Medium">⚡ Medium</option>
                <option value="Low">🌱 Low</option>
              </select>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-blue-100 transition-all active:scale-95">
                Create Task
              </button>
            </div>
          </form>
        </div>

        {/* Task List Section */}
        <div className="grid gap-4">
          <h2 className="text-lg font-bold text-gray-700 px-2">Your Timeline</h2>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div key={todo._id} className="group flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all gap-4">
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="w-6 h-6 rounded-full border-2 border-gray-300 checked:bg-blue-600 checked:border-blue-600 cursor-pointer transition-all appearance-none"
                      checked={todo.isCompleted}
                      onChange={() => handleToggle(todo)}
                    />
                    {todo.isCompleted && (
                      <svg className="absolute w-4 h-4 text-white left-1 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  
                  {editingId === todo._id ? (
                    <input 
                      className="flex-1 border-b-2 border-blue-500 outline-none text-lg py-1 font-medium italic"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onBlur={() => handleSaveEdit(todo._id)}
                      autoFocus
                    />
                  ) : (
                    <div className="flex flex-col">
                      <span className={`text-lg font-semibold leading-tight ${todo.isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {todo.title}
                      </span>
                      <span className={`mt-1 text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full border ${getPriorityColor(todo.priority)} w-fit`}>
                        {todo.priority}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 mt-2 sm:mt-0">
                  <button 
                    onClick={() => { setEditingId(todo._id); setEditTitle(todo.title); }}
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Task"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleDelete(todo._id)} 
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Task"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl py-20 flex flex-col items-center justify-center">
              <div className="bg-blue-50 text-blue-500 p-4 rounded-full mb-4">☕</div>
              <p className="text-gray-400 font-medium">All caught up! Time for a break.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;