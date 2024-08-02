import { useState } from "react";
import useValidateAuth from "./useValidateAuth";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validateAuth } = useValidateAuth();

  // Function to validate authentication after login

  const login = async (email, password) => {
    setLoading(true);
    setError(null); // Reset error state before new login attempt
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error);
      }

      await validateAuth(); // Validate authentication after successful login
    } catch (error) {
      setError(error.message); // Set error state
      console.error("Login error:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return { login, loading, error };
};
