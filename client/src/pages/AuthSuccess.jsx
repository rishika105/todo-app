import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// Import your auth action - adjust the import path as needed
import { setToken } from "../slices/authSlice"; // or whatever your action is called

function AuthSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    
    if (token) {
      // Store in localStorage
      localStorage.setItem("token", token);
      
      // Update Redux store - this is the missing piece!
      dispatch(setToken(token));
      
      // Show success message
      toast.success("Login successful!");
      
      // Navigate to todos page
      navigate("/my-todos", { replace: true });
    } else {
      // No token found, redirect to home
      toast.error("Authentication failed");
      navigate("/", { replace: true });
    }
  }, [navigate, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="text-lg">Logging you in...</span>
    </div>
  );
}

export default AuthSuccess;