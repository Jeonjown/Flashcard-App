import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDeckContext } from "../hooks/useDeckContext.jsx";
import Decks from "../components/Decks.jsx";
import DeckStudy from "../components/DeckStudy.jsx";

const Test = () => {
  const { userInfo } = useAuthContext();
  const { decks, dispatch } = useDeckContext();

  useEffect(() => {
    const getDecks = async () => {
      const response = await fetch("http://localhost:3000/decks/", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      await dispatch({ type: "SET_DECKS", payload: data });
    };
    if (userInfo) {
      getDecks();
    }
  }, [dispatch, userInfo]);

  return (
    <>
      {/* titles */}
      <div className="mx-5">
        <h1 className="text-3xl font-bold text-gray-500">Study Mode</h1>

        <div className="w-full md:mt-5">
          {decks && (
            <DeckStudy decks={decks} username={userInfo.user.username} />
          )}
        </div>
      </div>
    </>
  );
};

export default Test;
