import { useEffect } from "react";
import toast from "react-hot-toast";
import { replace, useNavigate } from "react-router-dom";

function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    
    if (token) {
      localStorage.setItem("token", token);
      navigate("/my-todos", {replace: true}); // redirect to main
      // This replaces the current history entry (login page or home) with /my-todos, so pressing Back won’t return the user to home.
    }
  }, [navigate]);

  const handleLogIn = () => {
    toast.loading("Logging In");
  };

  return <span onClick={handleLogIn}>Logging you in...</span>;
}

export default AuthSuccess;
