const express = require("express");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/getTodos", auth, getTodos);
router.post("/createTodo", auth, createTodo);
router.put("/updateTodo", auth, updateTodo);
router.delete("/deleteTodo", auth, deleteTodo);

module.exports = router;