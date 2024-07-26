import { useAuthContext } from "./useAuthContext";
import useValidateAuth from "./useValidateAuth";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
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
    } catch (error) {
      console.error(error);
    }
  };

  return { logout };
};
