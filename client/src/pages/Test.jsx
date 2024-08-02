import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDeckContext } from "../hooks/useDeckContext.jsx";
import DeckStudy from "../components/DeckStudy.jsx";

const Test = () => {
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
        console.error("Fetch error:", error.message);
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
