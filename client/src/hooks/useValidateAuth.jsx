import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.jsx";

const useValidateAuth = () => {
  const { dispatch } = useAuthContext(); // Get dispatch from context
  const navigate = useNavigate();

  const validateAuth = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/validate", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data = await response.json();
      console.log("from useValidateAuth: ", data);

      if (data.isAuthenticated) {
        dispatch({ type: "LOGIN", payload: data });
        navigate("/", { replace: true });
      } else {
        navigate("/login", { replace: true });
        throw new Error("not logged in");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { validateAuth };
};

export default useValidateAuth;
