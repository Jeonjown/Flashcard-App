import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDeckContext } from "../hooks/useDeckContext.jsx";
import Decks from "../components/Decks.jsx";
import DecksRecent from "../components/DecksRecent.jsx";

const Library = () => {
  const { userInfo } = useAuthContext();
  const { decks, dispatch } = useDeckContext();

  useEffect(() => {
    const getDecks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/decks/`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch decks");
        }

        const data = await response.json();
        dispatch({ type: "SET_DECKS", payload: data });
      } catch (error) {
        console.error(error.message);
      }
    };

    if (userInfo) {
      getDecks();
    }
  }, [dispatch, userInfo]);

  return (
    <>
      {/* titles */}
      <div className="mx-5">
        <h1 className="text-3xl font-bold text-gray-500">Decks</h1>

        {/* flashcard container */}
        {decks && (
          <DecksRecent decks={decks} username={userInfo.user.username} />
        )}

        <div className="w-full md:mt-5">
          {decks && <Decks decks={decks} username={userInfo.user.username} />}
        </div>
      </div>
    </>
  );
};

export default Library;
