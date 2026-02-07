const Todo = require("../model/todo.model");

const createTodo = async (req, res) => {
    try {
        /
        const { title, discription, priority, dueData } = req.body; 

        

        const newTodo = await Todo.create({
            user: req.user.userId, 
            title,
            discription: discription || "",
            priority: priority || "Medium",
            dueData: dueData || null
        });

        res.status(201).json(newTodo);
    } catch (error) {
        console.error("Mongoose Error:", error); 
        res.status(400).json({
            message: "Validation Failed - Task not created",
            error: error.message
        });
    }
}

const getTodo = async (req, res) => {
    try {
        const todos = await Todo.find({user: req.user.userId}).sort({createdAt: -1});
        res.status(200).send(todos)
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const updateTodo = async (req, res) => {
    try {
        let todo = await Todo.findOne({ _id: req.params.id, user: req.user.userId });
        
        if (!todo) return res.status(404).json({ message: "Todo not found or Unauthorized" });

        todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: "Todo not found" });

        if (todo.user.toString() !== req.user.userId) {
            return res.status(401).json({ message: "Aap ye delete nahi kar sakte (Unauthorized)" });
        }

        await todo.deleteOne();
        res.status(200).json({ message: "todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete fail", error: error.message });
    }
}

module.exports = {createTodo, getTodo, updateTodo, deleteTodo}
