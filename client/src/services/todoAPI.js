import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector";

const BASE_URL = import.meta.env.VITE_API_URL;

export const createTodo = async (title, description , token) => {
  const toastId = toast.loading("Creating task...");
  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/createTodo`,
      {title, description},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error("Failed to create task");
    }

    toast.success("Task created successfully");
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    toast.error("Error creating task");
  }
  finally {
    toast.dismiss(toastId); // ✅ always runs
  }
};

export const fetchTodos = async (token) => {
  try {
    const response = await apiConnector("GET", `${BASE_URL}/getTodos`, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error("Failed to fetch tasks");
    }

  //  console.log("Fetched todos", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    toast.error("Error fetching tasks");
  } 
};

export const updateTodo = async (id, title, description, token) => {
  const toastId = toast.loading("Updating task...");
  try {
    const response = await apiConnector(
      "PUT",
      `${BASE_URL}/updateTodo/${id}`,
      {title, description},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error("Failed to update task");
    }

    toast.success("Task updated successfully");
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    toast.error("Error updating task");
  } finally {
    toast.dismiss(toastId); // ✅ always runs
  }
};

export const deleteTodo = async (id, token) => {
  const toastId = toast.loading("Deleting task...");
  try {
    const response = await apiConnector(
      "DELETE",
      `${BASE_URL}/deleteTodo/${id}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error("Failed to delete task");
    }

    toast.success("Task deleted successfully");
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    toast.error("Error deleting task");
  } finally {
    toast.dismiss(toastId); // ✅ always runs
  }
};

export const toggleCompleteTodo = async (id, token) => {
  try {
    const response = await apiConnector(
      "PATCH",
      `${BASE_URL}/toggle/${id}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error("Failed to toggle task");
    }

    //toast.success("Task status updated");
    return response.data;
  } catch (error) {
    console.error("Error toggling task:", error);
    toast.error("Error toggling task");
  } 
};
