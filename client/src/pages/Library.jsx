import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDeckContext } from "../hooks/useDeckContext.jsx";
import Decks from "../components/Decks.jsx";
import DecksRecent from "../components/DecksRecent.jsx";
const Library = () => {
  const { userInfo } = useAuthContext();
  const { decks, dispatch } = useDeckContext();

  useEffect(() => {
    const getFlashcard = async () => {
      const response = await fetch("http://localhost:3000/quizme/decks/", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      await dispatch({ type: "SET_DECKS", payload: data });
    };
    if (userInfo) {
      getFlashcard();
    }
  }, [dispatch, userInfo]);

  return (
    <>
      {/* titles */}
      <div className="mx-5 md:ml-56 lg:ml-96">
        <h1 className="text-3xl font-bold text-gray-500">Flashcards</h1>

        {/* flashcard container */}
        {decks && (
          <DecksRecent decks={decks} username={userInfo.user.username} />
        )}

        <div className="md: mt-5 w-full">
          {decks && <Decks decks={decks} username={userInfo.user.username} />}
        </div>
      </div>
    </>
  );
};

export default Library;
