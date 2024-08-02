import { useAuthContext } from "./useAuthContext";
import { useDeckContext } from "./useDeckContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchDeck } = useDeckContext();
  const logout = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/quizme/users/logout",
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
      console.error(error);
    }
  };

  return { logout };
};
