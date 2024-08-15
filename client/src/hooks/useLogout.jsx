import { useAuthContext } from "./useAuthContext";
import { useDeckContext } from "./useDeckContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchDeck } = useDeckContext();

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
          },
        },
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      const json = await response.json();
      console.log(json);

      // Clear token from Local Storage
      localStorage.removeItem("authToken");
      localStorage.removeItem("decks");

      // Dispatch logout actions
      dispatch({ type: "LOGOUT" });
      dispatchDeck({ type: "SET_DECKS", payload: [] });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { logout };
};
