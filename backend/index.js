const express = require("express");
const cors = require('cors');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

const userRouter = require("./routes/user.route");
const todoRouter = require("./routes/todo.routes");
const connectDB = require("./config/db");

// Database Connect karein
connectDB();

// CORS Settings - Flexibility ke liye origin true rakha hai
app.use(cors({
    origin: true, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// Main Route (Check karne ke liye ke server live hai)
app.get("/", (req, res) => {
    res.json({ message: "Server is running perfectly!", status: "OK" });
});

app.use("/user", userRouter);
app.use("/todo", todoRouter);

// Local testing ke liye listen, Vercel khud manage karega production mein
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;