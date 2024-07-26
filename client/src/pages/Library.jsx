import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFlashCardContext } from "../hooks/useFlashcardContext";
import Decks from "../components/Decks.jsx";
import DecksRecent from "../components/DecksRecent.jsx";
const Flashcards = () => {
  const { userInfo } = useAuthContext();
  const { decks, dispatch } = useFlashCardContext();
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
      <div className="mx-5 lg:mx-40">
        <h1 className="text-3xl font-bold text-gray-500">Flashcards</h1>
        <h4 className="border-b-2 border-secondary-100 text-xl font-bold text-gray-600">
          Most Recent
        </h4>
        {/* scroll menu */}
        <div className="overflow-x-auto scroll-smooth whitespace-nowrap md:overflow-x-auto">
          {/* flashcard container */}
          {decks && <Decks decks={decks} />}
        </div>

        <h4 className="border-b-2 border-secondary-100 text-xl font-bold text-gray-600">
          Your Sets
        </h4>

        <div className="md: mt-5 w-full">
          {decks && <DecksRecent decks={decks} />}
        </div>
      </div>
    </>
  );
};

export default Flashcards;
