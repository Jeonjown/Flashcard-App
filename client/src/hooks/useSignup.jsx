import { useState } from "react";
import useValidateAuth from "./useValidateAuth";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validateAuth } = useValidateAuth();

  // Function to validate authentication after signup
  const signup = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        },
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error);
      }

      // Store the token in Local Storage
      localStorage.setItem("authToken", json.token);

      await validateAuth(); // Validate authentication after successful signup
    } catch (error) {
      setError(error.message); // Set error state
      console.error("Signup error:", error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return { signup, loading, error };
};
