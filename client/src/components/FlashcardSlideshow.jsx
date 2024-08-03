import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFlashcardContext from "../hooks/useFlashcardContext";

const FlashcardSlideshow = () => {
  const [editTerm, setEditTerm] = useState("");
  const [editDefinition, setEditDefinition] = useState("");
  const [currentEditingId, setCurrentEditingId] = useState(null);
  const { flashcards, dispatch } = useFlashcardContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const { deckId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false); // State for flipping

  // Fetch flashcards on mount or deckId change
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found in local storage.");
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/decks/${deckId}/flashcards/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Failed to fetch flashcards: ${errorText}`);
          throw new Error(`Failed to fetch flashcards: ${response.status}`);
        }

        const data = await response.json();
        dispatch({ type: "SET_FLASHCARDS", payload: data.flashcards });
        localStorage.setItem("flashcards", JSON.stringify(data.flashcards)); // Changed key
        if (data.flashcards.length > 0) setCurrentIndex(0);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };
    fetchFlashcards();
  }, [deckId, dispatch]);

  // Handle flashcard updates
  const handleEditFlashcard = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/decks/${deckId}/flashcards/${currentEditingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ term: editTerm, definition: editDefinition }),
        },
      );
      if (!response.ok) throw new Error("Failed to update flashcard");
      const data = await response.json();
      dispatch({ type: "UPDATE_FLASHCARD", payload: data.updatedFlashcard });

      // Update local storage
      const updatedFlashcards = flashcards.map((flashcard) =>
        flashcard._id === data.updatedFlashcard._id
          ? data.updatedFlashcard
          : flashcard,
      );
      localStorage.setItem("flashcards", JSON.stringify(updatedFlashcards)); // Changed key

      setEditTerm("");
      setEditDefinition("");
      setCurrentEditingId(null);
    } catch (error) {
      console.error("Error updating flashcard:", error);
    }
  };

  // Handle flashcard deletion
  const handleDeleteFlashcard = async (flashcardId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found in local storage.");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/decks/${deckId}/flashcards/${flashcardId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to delete flashcard: ${errorText}`);
        throw new Error("Failed to delete flashcard");
      }

      dispatch({ type: "DELETE_FLASHCARD", payload: flashcardId });

      const updatedFlashcards = flashcards.filter(
        (flashcard) => flashcard._id !== flashcardId,
      );
      localStorage.setItem("flashcards", JSON.stringify(updatedFlashcards)); // Changed key
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  // Handle adding a flashcard
  const handleAddFlashcard = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found in local storage.");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/decks/${deckId}/flashcards/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token here
          },
          body: JSON.stringify({ term, definition }),
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          console.error("Unauthorized: Check your authentication token.");
        } else {
          const errorText = await response.text();
          console.error(`Error creating flashcard: ${errorText}`);
        }
        throw new Error("Error creating flashcard");
      }

      const data = await response.json();
      dispatch({ type: "CREATE_FLASHCARD", payload: data.flashcard });

      // Update local storage
      const updatedFlashcards = [...flashcards, data.flashcard];
      localStorage.setItem("flashcards", JSON.stringify(updatedFlashcards)); // Changed key

      setTerm("");
      setDefinition("");
      setShowAddForm(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Navigate between flashcards
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : flashcards.length - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < flashcards.length - 1 ? prevIndex + 1 : 0,
    );
  };

  // Toggle flip state
  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <>
      <div className="mb-20 mt-8 flex w-full items-center justify-center">
        {flashcards && flashcards.length > 0 && (
          <div className="relative h-60 w-[70%] min-w-96 md:h-80 md:max-w-2xl">
            <div
              onClick={handleClick}
              className={`duration-600 relative h-full w-full rounded-sm shadow-sm transition-transform perspective-1000 ${flipped ? "rotate-flip" : ""}`}
            >
              <div
                className={`absolute inset-0 flex items-center justify-center border bg-white px-3 py-5 shadow-sm backface-hidden ${flipped ? "hidden" : ""}`}
              >
                <p className="text-lg font-bold text-gray-600">
                  {flashcards[currentIndex].term}
                </p>
              </div>
              <div
                className={`absolute inset-0 flex items-center justify-center border bg-white px-3 py-5 shadow-sm rotate-flip ${flipped ? "" : "hidden"}`}
              >
                <p className="text-lg font-bold text-gray-600">
                  {flashcards[currentIndex].definition}
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-center">
              <button
                className="mx-2 rounded bg-gray-200 px-4 py-2"
                onClick={goToPrevious}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </button>
              <button
                className="mx-2 rounded bg-gray-200 px-4 py-2"
                onClick={goToNext}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        {!flashcards || flashcards.length === 0 ? (
          <p>No flashcards available</p>
        ) : (
          <p className="text-lg font-semibold">
            {currentIndex + 1} / {flashcards.length}
          </p>
        )}
      </div>
      {showAddForm && (
        <form
          onSubmit={handleAddFlashcard}
          className="flex flex-col items-center justify-center gap-4"
        >
          <input
            type="text"
            placeholder="Term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="rounded border px-2 py-1"
            required
          />
          <input
            type="text"
            placeholder="Definition"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            className="rounded border px-2 py-1"
            required
          />
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Add Flashcard
          </button>
        </form>
      )}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="mt-4 rounded bg-green-500 px-4 py-2 text-white"
      >
        {showAddForm ? "Cancel" : "Add Flashcard"}
      </button>
      {flashcards.map((flashcard) => (
        <div
          key={flashcard._id}
          className="my-2 flex items-center justify-between"
        >
          <div>
            <p className="font-bold">{flashcard.term}</p>
            <p>{flashcard.definition}</p>
          </div>
          <button
            onClick={() => {
              setEditTerm(flashcard.term);
              setEditDefinition(flashcard.definition);
              setCurrentEditingId(flashcard._id);
            }}
            className="mx-2 rounded bg-yellow-500 px-4 py-2 text-white"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteFlashcard(flashcard._id)}
            className="rounded bg-red-500 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      ))}
      {currentEditingId && (
        <form
          onSubmit={handleEditFlashcard}
          className="flex flex-col items-center justify-center gap-4"
        >
          <input
            type="text"
            placeholder="Edit Term"
            value={editTerm}
            onChange={(e) => setEditTerm(e.target.value)}
            className="rounded border px-2 py-1"
            required
          />
          <input
            type="text"
            placeholder="Edit Definition"
            value={editDefinition}
            onChange={(e) => setEditDefinition(e.target.value)}
            className="rounded border px-2 py-1"
            required
          />
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Save Changes
          </button>
        </form>
      )}
    </>
  );
};

export default FlashcardSlideshow;
