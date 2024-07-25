import useValidateAuth from "./useValidateAuth";

export const useLogout = () => {
  const { validateAuth } = useValidateAuth();
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
      await validateAuth();
    } catch (error) {
      console.error(error);
    }
  };

  return { logout };
};
