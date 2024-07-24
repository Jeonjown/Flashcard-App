import { createContext, useEffect, useReducer } from "react";

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
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, { userInfo: null });

  state.userInfo && console.log("Context: ", state.userInfo.user.email);

  useEffect(() => {
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
          throw new Error("Authentication failed");
        }

        const data = await response.json();
        dispatch({ type: "LOGIN", payload: data });
        if (!data.isAuthenticated) {
          throw Error("not logged in");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    validateAuth();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
