// Importing React hooks
import { useState } from "react";
import useValidateAuth from "./useValidateAuth";

// Custom hook for login functionality
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validateAuth } = useValidateAuth();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        },
      );

      // Check if the response is okay
      if (!response.ok) {
        const errorJson = await response.json(); // Try to parse the error JSON
        throw new Error(errorJson.error || "Unknown error");
      }

      // Ensure we parse the response JSON
      const json = await response.json();
      if (!json) throw new Error("Invalid response format");

      await validateAuth();
    } catch (error) {
      setError(error.message);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
