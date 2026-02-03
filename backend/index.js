const express = require("express");
const cors = require('cors');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

const userRouter = require("./routes/user.route");
const todoRouter = require("./routes/todo.routes");
const connectDB = require("./config/db");

connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

app.use("/user", userRouter);
app.use("/todo", todoRouter);



app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
