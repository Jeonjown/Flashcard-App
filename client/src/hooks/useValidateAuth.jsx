import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.jsx";

const useValidateAuth = () => {
  const { dispatch } = useAuthContext(); // Get dispatch from context
  const navigate = useNavigate();

  const validateAuth = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/quizme/users/validate",
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!response.ok) {
        navigate("/login", { replace: true });
        throw new Error("Authentication failed");
      }

      const data = await response.json();
      console.log("from useValidateAuth: ", data);

      dispatch({ type: "LOGIN", payload: data });

      if (!data.isAuthenticated) {
        navigate("/login", { replace: true });
        throw new Error("not logged in");
      }

      if (data.isAuthenticated) {
        navigate("/home", { replace: true });
      }
    } catch (error) {
      console.error("Error:", error);
      // Optional: Add state management for error
    }
  };

  return { validateAuth };
};

export default useValidateAuth;
