import { useAuthContext } from "./useAuthContext";
import { useDeckContext } from "./useDeckContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchDeck } = useDeckContext();

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/quizme/users/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      const json = await response.json();
      console.log(json);

      await dispatch({ type: "LOGOUT" });
      await dispatchDeck({ type: "SET_DECK", payload: null });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { logout };
};
