import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDeckContext } from "../hooks/useDeckContext";
import { useState } from "react";

const DeckDetails = () => {
  const { dispatch } = useDeckContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { deckId } = useParams();

  const deck = location.state?.deck;

  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");

  const handleDelete = async (deckId) => {
    const response = await fetch(`http://localhost:3000/decks/${deckId}`, {
      method: "DELETE",
      credentials: "include",
    });

    try {
      if (!response.ok) {
        throw new Error(response.error);
      }
      const json = await response.json();
      console.log(json.message);
    } catch (error) {
      console.error(error.message);
    }
    await dispatch({ type: "DELETE_DECK", payload: deckId });

    navigate("/library", { replace: true });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/decks/${deckId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title: newName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update deck");
      }

      const json = await response.json();
      console.log(json.updatedDeck);

      // Dispatch action with the updated deck
      await dispatch({ type: "EDIT_DECK", payload: json.updatedDeck });

      // Update location state to reflect the changes
      navigate(`/decks/${deckId}`, {
        state: { deck: json.updatedDeck },
        replace: true, // Prevents adding a new entry to the history stack
      });
    } catch (error) {
      console.error("Error updating deck:", error.message);
    }

    // Clear the newName state outside of try/catch
    setNewName("");
    setShowForm(false);
  };

  return (
    <>
      <div className="flex items-center border-b-2 border-secondary-100 pb-2 font-bold">
        <h4 className="text-xl text-gray-600">{deck.title}</h4>
        <button
          className="ml-auto rounded-full border-2 border-primary px-2 py-1 text-sm text-primary hover:scale-105"
          onClick={() => setShowForm((prevShowForm) => !prevShowForm)}
        >
          {showForm ? "Cancel" : "Rename Deck "}
        </button>
        <button
          className="ml-3 rounded-full border-2 border-primary px-3 py-1 text-sm text-primary"
          onClick={() => {
            handleDelete(deckId);
          }}
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

      <h1>TBD FLASHCARD RENDER...</h1>
    </>
  );
};

export default DeckDetails;
