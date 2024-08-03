import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDeckContext } from "../hooks/useDeckContext";
import DeckStudy from "../components/DeckStudy";

const Test = () => {
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

        // Fetch from API if not in local storage
        const token = localStorage.getItem("authToken"); // Retrieve token from local storage
        if (!token) {
          throw new Error("No token found");
        }

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
      <div className="mx-5">
        <h1 className="text-3xl font-bold text-gray-500">Study Mode</h1>

        <div className="w-full md:mt-5">
          {decks && decks.length > 0 ? (
            <DeckStudy decks={decks} username={userInfo.user.username} />
          ) : (
            <p>No decks available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Test;
