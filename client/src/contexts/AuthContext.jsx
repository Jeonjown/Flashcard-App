import React, { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "LOGOUT":
      return {
        userInfo: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, { userInfo: null });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/validate`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Authentication failed");
        }

        const data = await response.json();
        console.log("from authContext: ", data.isAuthenticated);

        dispatch({ type: "LOGIN", payload: data });

        if (!data.isAuthenticated) {
          navigate("/login", { replace: true });
          throw new Error("not logged in");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    validateAuth();
  }, [dispatch, navigate]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
