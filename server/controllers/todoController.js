const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
     return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const todo = await Todo.create({
      //from middleware
      userId: req.user.id,
      title,
      description,
    });

  return res.status(200).json({
      success: true,
      message: "Task created successfully",
      data: todo,
    });
  } catch (error) {
    console.log(error);
 return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

exports.getTodos = async (req, res) => {
  try {

    const userId = req.user.id;

    if (!userId) {
     return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const todos = await Todo.find({ userId });

   return res.status(200).json({
      success: true,
      message: "Fetched todos of user successfully",
      data: todos
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description || !id) {
    return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      { _id: id },
      { title, description, updatedAt: Date.now() },
      { new: true } //to return the updated document
    );

    return res.status(200).json({
      success: true,
      message: "Updated todo Successfully",
      data: updatedTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Deleted todo successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
exports.toggleComplete = async (req, res) => {
  try {
    const todoId = req.params.id;
    const userId = req.user.id; // assuming you're setting req.user in middleware

    const todo = await Todo.findOne({ _id: todoId, userId });

    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }

    todo.completed = !todo.completed;
    await todo.save();

    return res.status(200).json({
      success: true,
      message: "Todo status toggled successfully",
      data: todo,
    });
  } catch (error) {
    console.error("Error toggling todo:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};