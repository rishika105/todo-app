const express = require("express");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleComplete,
} = require("../controllers/todoController");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/getTodos", auth, getTodos);
router.post("/createTodo", auth, createTodo);
router.put("/updateTodo/:id", auth, updateTodo);
router.delete("/deleteTodo/:id", auth, deleteTodo);
router.patch("/toggle/:id", auth, toggleComplete);

module.exports = router;
