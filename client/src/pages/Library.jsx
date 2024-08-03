import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDeckContext } from "../hooks/useDeckContext";
import Decks from "../components/Decks";
import DecksRecent from "../components/DecksRecent";

const Library = () => {
  const { userInfo } = useAuthContext();
  const { decks, dispatch } = useDeckContext();

  useEffect(() => {
    const fetchAndStoreDecks = async () => {
      try {
        // Check local storage first
        const storedDecks = localStorage.getItem("decks");
        if (storedDecks) {
          dispatch({ type: "SET_DECKS", payload: JSON.parse(storedDecks) });
          return;
        }

        // Get the token from local storage
        const token = localStorage.getItem("authToken");

        // Fetch from API if not in local storage
        const response = await fetch(`${import.meta.env.VITE_API_URL}/decks/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch decks");
        }

        const data = await response.json();
        dispatch({ type: "SET_DECKS", payload: data });

        // Store decks in local storage
        localStorage.setItem("decks", JSON.stringify(data));
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    if (userInfo) {
      fetchAndStoreDecks();
    }
  }, [dispatch, userInfo]);

  return (
    <>
      {/* Titles */}
      <div className="mx-5">
        <h1 className="text-3xl font-bold text-gray-500">Decks</h1>

        {/* Flashcard container */}
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
