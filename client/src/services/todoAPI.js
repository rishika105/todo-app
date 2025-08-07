import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector";

const BASE_URL = import.meta.env.VITE_API_URL;

export const createTodo = async (data, token) => {
  const toastId = toast.loading("Creating task...");
  try {
    const response = await apiConnector("POST", `${BASE_URL}/createTodo`, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error("Failed to create task");
    }

    toast.success("Task created successfully");
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    toast.error("Error creating task");
  }
  toast.dismiss(toastId);
};


export const fetchTodos = async (token) => {
     const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("GET", `${BASE_URL}/getTodos`);

    if (!response.data.success) {
      throw new Error("Failed to fetch categories");
    }
    
    console.log("Fetched todos", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    toast.error("Error fetching tasks")
  }
    toast.dismiss(toastId);
  
};

export const updateTodo = async (id, updatedData, token) => {
  const toastId = toast.loading("Updating task...");
  try {
    const response = await apiConnector("PUT", `${BASE_URL}/updateTodo/${id}`, updatedData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error("Failed to update task");
    }

    toast.success("Task updated successfully");
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    toast.error("Error updating task");
  }
  toast.dismiss(toastId);
};

export const deleteTodo = async (id, token) => {
  const toastId = toast.loading("Deleting task...");
  try {
    const response = await apiConnector("DELETE", `${BASE_URL}/deleteTodo/${id}`, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error("Failed to delete task");
    }

    toast.success("Task deleted successfully");
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    toast.error("Error deleting task");
  }
  toast.dismiss(toastId);
};

export const toggleCompleteTodo = async (id, token) => {
  const toastId = toast.loading("Toggling task status...");
  try {
    const response = await apiConnector("PATCH", `${BASE_URL}/toggleTodo/${id}`, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error("Failed to toggle task");
    }

    toast.success("Task status updated");
    return response.data;
  } catch (error) {
    console.error("Error toggling task:", error);
    toast.error("Error toggling task");
  }
  toast.dismiss(toastId);
};

