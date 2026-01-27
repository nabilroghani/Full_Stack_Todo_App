🧩 Task: Full Stack MERN Application (Auth + Protected Dashboard)
🛠 Tech Stack
Frontend: React (with Hooks), React Router


Backend: Node.js, Express.js


Database: MongoDB Atlas


Auth & Security: bcryptjs, JWT


HTTP Client: Axios / Fetch



📌 Frontend Requirements (3 Pages)
1️⃣ Register Page
User should be able to register with:
Email (unique)


Username (unique)


Password (hashed in backend)


Validations:
All fields required


Email format validation


Password min length (e.g. 6)


On success:
Redirect to Login page



2️⃣ Login Page
User logs in using:
Email


Password


On success:
Receive JWT token


Store token in localStorage


Redirect to Dashboard



3️⃣ Dashboard Page (Protected 🔒)
Accessible only if user is authenticated


If token missing/invalid → redirect to Login


Shows all users data in a table


Table columns:
Username


Email


Created At (optional)



🔐 Backend Requirements (Express + MongoDB Atlas)
📂 User Schema (MongoDB)
{
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
}


🔑 Authentication Flow
✅ Register Route
POST /api/auth/register
Accepts: username, email, password


Password must be hashed using bcrypt


Save user to MongoDB


Prevent duplicate email/username



✅ Login Route
POST /api/auth/login
Validate email & password


Compare password using bcrypt.compare


Generate JWT token


Return token to frontend



🔒 Get Users Route (Protected)
GET /api/users
Requires JWT token


Use auth middleware


Returns list of all users (excluding password)



🛡 Auth Middleware
Read token from Authorization header


Verify JWT


Allow access only if valid



📁 Suggested Folder Structure
Backend
backend/
│── models/
│   └── User.js
│── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
│── middleware/
│   └── authMiddleware.js
│── server.js

Frontend
frontend/
│── pages/
│   ├── Register.jsx
│   ├── Login.jsx
│   └── Dashboard.jsx
│── components/
│   └── ProtectedRoute.jsx
│── App.jsx


⭐ Bonus (Optional but Good)
Logout functionality


Loading & error states


Password hide/show


Clean UI (Bootstrap / Tailwind / MUI)

