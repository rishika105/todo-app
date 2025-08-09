"use client";

import { useEffect, useState } from "react";
import { Plus, Check, Trash2, Calendar, Star, Pencil, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  toggleCompleteTodo,
  updateTodo,
} from "../services/todoAPI";
import { TbLogout } from "react-icons/tb";
import { setToken } from "../slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // State management
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setLoading(true);
    try {
      const response = await fetchTodos(token);
      if (response.success) {
        setTasks(response.data || []);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    dispatch(setToken(null));
    toast.success("Logged Out");
    navigate("/");
  };

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditChange = (e) => {
    setEditFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const { title, description } = formData;

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a task title");
      return;
    }
    setLoading(true);
    try {
      const response = await createTodo(title, description || title, token);
      if (response && response.success) {
        setFormData({ title: "", description: "" });
        loadTodos(); // Reload todos after adding
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (todoId) => {
    setLoading(true);
    try {
      const response = await toggleCompleteTodo(todoId, token);
      if (response && response.success) {
        loadTodos(); // Reload todos after toggling
      }
    } catch (err) {
      console.error("Error updating todo:", err);
    } finally {
      setLoading(false);
    }
  };

  const editTodo = async (todo) => {
    setEditingTodo(todo);
    setEditFormData({
      title: todo.title,
      description: todo.description,
    });
    setModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editFormData.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    setLoading(true);
    try {
      const response = await updateTodo(
        editingTodo._id,
        editFormData.title,
        editFormData.description || editFormData.title,
        token
      );
      if (response && response.success) {
        setModal(false);
        setEditingTodo(null);
        setEditFormData({ title: "", description: "" });
        loadTodos(); // Reload todos after updating
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModal(false);
    setEditingTodo(null);
    setEditFormData({ title: "", description: "" });
  };

  const deleteTodos = async (todoId) => {
    setLoading(true);
    try {
      const response = await deleteTodo(todoId, token);
      if (response && response.success) {
        loadTodos(); // Reload todos after deleting
      }
    } finally {
      setLoading(false);
    }
  };

  // Filter todos based on status only
  const filteredTodos = tasks.filter((todo) => {
    return (
      filter === "all" ||
      (filter === "active" && !todo.completed) ||
      (filter === "completed" && todo.completed)
    );
  });

  const completedCount = tasks.filter((todo) => todo.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-violet-500/10 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-40 right-10 w-16 h-16 bg-pink-500/10 rounded-full blur-xl"></div>

      {/* Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Edit Task</h2>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  placeholder="Enter task title"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  placeholder="Add a description (optional)"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 resize-none"
                  disabled={loading}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !editFormData.title.trim()}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Updating..." : "Update Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ToDoSpace</h1>
                <p className="text-sm text-gray-500">
                  Stay organized, stay productive
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {completedCount}/{totalCount} completed
                </p>
                <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        totalCount > 0 ? (completedCount / totalCount) * 100 : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <TbLogout className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Add Todo Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6 mb-8">
          <form onSubmit={addTodo} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  required
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleOnChange}
                  placeholder="What needs to be done today?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !title.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
                {loading ? "Adding..." : "Add Task"}
              </button>
            </div>
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleOnChange}
              placeholder="Add a description (optional)"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm"
              disabled={loading}
            />
          </form>
        </div>

        {/* Filters Only */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6 mb-8">
          <div className="flex justify-center">
            <div className="flex gap-2">
              {["all", "active", "completed"].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    filter === filterType
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && tasks.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Loading your tasks...</p>
          </div>
        )}

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 && !loading ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tasks found
              </h3>
              <p className="text-gray-500">
                {filter === "active"
                  ? "No active tasks. Great job!"
                  : filter === "completed"
                  ? "No completed tasks yet. Start checking off some tasks!"
                  : "Add your first task to get started!"}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo._id}
                className={`bg-white rounded-xl shadow-sm border border-gray-200/50 p-4 transition-all duration-200 hover:shadow-md ${
                  todo.completed ? "opacity-75" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleTodo(todo._id)}
                    disabled={loading}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-1 ${
                      todo.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-400"
                    } disabled:opacity-50`}
                  >
                    {todo.completed && <Check className="w-4 h-4" />}
                  </button>

                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        todo.completed
                          ? "text-gray-500 line-through"
                          : "text-gray-900"
                      }`}
                    >
                      {todo.title}
                    </p>
                    {todo.description && todo.description !== todo.title && (
                      <p
                        className={`text-sm mt-1 ${
                          todo.completed
                            ? "text-gray-400 line-through"
                            : "text-gray-600"
                        }`}
                      >
                        {todo.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-gray-400">
                        {new Date(todo.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Edit and Delete */}
                  <button
                    onClick={() => editTodo(todo)}
                    disabled={loading}
                    className="p-2 text-gray-400 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-all duration-200 disabled:opacity-50"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteTodos(todo._id)}
                    disabled={loading}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats Footer */}
        {tasks.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {tasks.length}
                </p>
                <p className="text-sm text-gray-500">Total Tasks</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {completedCount}
                </p>
                <p className="text-sm text-gray-500">Completed</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {tasks.length - completedCount}
                </p>
                <p className="text-sm text-gray-500">Remaining</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
