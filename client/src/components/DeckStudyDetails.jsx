import { useParams, useNavigate } from "react-router-dom";
import { useDeckContext } from "../hooks/useDeckContext";
import { useState, useEffect } from "react";
import { FlashCardProvider } from "../contexts/FlashcardContext";
import FlashcardSlideshow from "./FlashcardSlideshow";

const DeckStudyDetails = () => {
  const navigate = useNavigate();
  const { dispatch } = useDeckContext();
  const { deckId } = useParams();
  const [deckTitle, setDeckTitle] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/decks/${deckId}`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Deck not found");
        }
        const data = await response.json();
        setDeckTitle(data.deck);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchDeck();
  }, [deckId]);

  const handleDelete = async (deckId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/decks/${deckId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete deck");
      }
      const json = await response.json();
      console.log(json.message);

      await dispatch({ type: "DELETE_DECK", payload: deckId });

      navigate("/library", { replace: true });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/decks/${deckId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ title: newName }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update deck");
      }

      const json = await response.json();
      console.log(json.updatedDeck);

      await dispatch({ type: "EDIT_DECK", payload: json.updatedDeck });

      setDeckTitle(json.updatedDeck);
    } catch (error) {
      console.error("Error updating deck:", error.message);
    }

    setNewName("");
    setShowForm(false);
  };

  return (
    <>
      <div className="flex items-center border-b-2 border-secondary-100 pb-2 font-bold">
        <h4 className="mx-5 text-xl text-gray-600">{deckTitle.title}</h4>
        <button
          className="ml-auto rounded-full border-2 border-primary px-2 py-1 text-sm text-primary hover:scale-105"
          onClick={() => setShowForm((prevShowForm) => !prevShowForm)}
        >
          {showForm ? "Cancel" : "Rename Deck "}
        </button>
        <button
          className="ml-3 rounded-full border-2 border-primary px-3 py-1 text-sm text-primary"
          onClick={() => handleDelete(deckId)}
        >
          Delete
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleEdit}
          className="mt-5 w-full bg-white p-4 shadow-md"
        >
          <div className="mb-4">
            <input
              className="w-full rounded border px-3 py-2"
              type="text"
              id="title"
              name="title"
              placeholder="Enter new deck title"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
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
      <FlashCardProvider>
        <FlashcardSlideshow />
      </FlashCardProvider>
    </>
  );
};

export default DeckStudyDetails;
