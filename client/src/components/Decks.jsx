import { useEffect, useState } from "react";
import { useDeckContext } from "../hooks/useDeckContext.jsx";
import { Link } from "react-router-dom";

const Decks = ({ decks = [], username }) => {
  const [deckTitle, setDeckTitle] = useState("");
  const [showForm, setShowForm] = useState(false);
  // Initialize sortedDecks
  const [sortedDecks, setSortedDecks] = useState([]);
  const { dispatch } = useDeckContext();

  useEffect(() => {
    if (decks.length) {
      const sorted = decks
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title));
      setSortedDecks(sorted);
    }
  }, [decks]);

  const createDeck = async () => {
    try {
      const response = await fetch("http://localhost:3000/decks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title: deckTitle }),
      });

      if (!response.ok) {
        throw new Error("Response not ok");
      }

      const json = await response.json();
      console.log("Created deck:", json);

      // Access deck data from nested structure
      const newDeck = json.newDeck;
      console.log("newdeck :", newDeck);

      dispatch({ type: "CREATE_DECK", payload: newDeck });
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createDeck();
    setDeckTitle("");
    setShowForm(false);
  };

  console.log("from decks", decks);
  return (
    <>
      <div className="flex items-center border-b-2 border-secondary-100 pb-2 font-bold">
        <h4 className="text-xl text-gray-600">Your Sets</h4>
        <button
          className="ml-auto rounded-full border-2 border-primary px-2 py-1 text-sm text-primary hover:scale-105"
          onClick={() => setShowForm((prevShowForm) => !prevShowForm)}
        >
          {showForm ? "Cancel" : "Add Set +"}
        </button>
      </div>

      {showForm && (
        <form
          className="mt-5 w-full bg-white p-4 shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="mb-2 block font-bold text-gray-600"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="w-full rounded border px-3 py-2"
              type="text"
              id="title"
              name="title"
              placeholder="Enter deck title"
              value={deckTitle}
              onChange={(e) => setDeckTitle(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="hover:bg-primary-dark rounded-full bg-primary px-4 py-2 text-white"
          >
            Save
          </button>
        </form>
      )}

      {sortedDecks.length > 0 ? (
        sortedDecks.map((deck) => (
          <div
            className="mt-5 w-full shadow-md hover:scale-105 hover:cursor-pointer hover:shadow-lg"
            key={`${deck._id}`}
          >
            <Link to={`/decks/${deck._id}`} state={{ deck }}>
              <div className="flex h-16 bg-secondary-100 p-3">
                <p className="rounded-full bg-secondary-200 px-4 py-2 text-sm font-bold text-gray-500">
                  {deck.flashcards.length} terms
                </p>
                <div className="ml-auto mr-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <p className="text-l ml-1 mt-1 font-bold text-gray-600">
                    {username}
                  </p>
                </div>
              </div>
              <div className="bg-white p-3">
                <p className="font-bold text-gray-600">{deck.title}</p>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p>No decks available</p>
      )}
    </>
  );
};

export default Decks;
