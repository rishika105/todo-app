const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    if (!title || !description) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const todo = await Todo.create({
      //from middleware
      userId: req.user._id,
      title,
      description,
      completed,
    });

    res.status(200).json({
      success: true,
      message: "Task created successfully",
      data: todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const todos = await Todo.find({ userId });

    res.status(200).json({
      success: true,
      message: "Fetched todos of user successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    if (!title || !description || !id) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      { _id: id },
      { title, description, completed, updatedAt: Date.now() },
      { new: true } //to return the updated document
    );

    res.status(200).json({
      success: true,
      message: "Updated todo Successfully",
      data: updatedTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Deleted todo successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
