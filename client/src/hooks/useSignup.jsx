import { useState } from "react";
import useValidateAuth from "./useValidateAuth";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validateAuth } = useValidateAuth();

  // Function to validate authentication after login

  const signup = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
        credentials: "include",
      });

      const json = await response.json();

      if (!response.ok) {
        throw Error(json.error);
      }

      await validateAuth(); // Validate authentication after successful login
    } catch (error) {
      setError(error.message); // Set error state
      console.error("Login error:", error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return { signup, loading, error };
};
