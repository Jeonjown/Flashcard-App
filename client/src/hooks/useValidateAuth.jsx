import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.jsx";

const useValidateAuth = () => {
  const { dispatch } = useAuthContext(); // Get dispatch from context
  const navigate = useNavigate();

  const validateAuth = async () => {
    try {
      // Get the token from Local Storage
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/validate`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Read and log the raw response text
      const responseText = await response.text();
      console.log("Response Text:", responseText);

      // Try to parse JSON from the response
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        throw new Error("Failed to parse JSON response");
      }

      console.log("from useValidateAuth: ", data);

      if (data.isAuthenticated) {
        dispatch({ type: "LOGIN", payload: data });
        navigate("/", { replace: true });
      } else {
        navigate("/login", { replace: true });
        throw new Error("Not logged in");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return { validateAuth };
};

export default useValidateAuth;
