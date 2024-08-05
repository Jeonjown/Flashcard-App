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
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/decks/${deckId}/flashcards/${currentEditingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
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
            <p className="mt-2 text-center text-lg font-semibold">
              {currentIndex + 1} / {flashcards.length}
            </p>
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
        {!flashcards ||
          (flashcards.length === 0 && <p>No flashcards available</p>)}
      </div>

      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="my-3 ml-3 rounded-full border-2 border-primary px-3 py-1 text-sm font-bold text-primary hover:scale-105"
      >
        {showAddForm ? "Cancel" : "Add Flashcard"}
      </button>

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
            className="my-3 ml-3 rounded-full border-2 border-primary px-3 py-1 text-sm font-bold text-primary hover:scale-105"
          >
            Add Flashcard
          </button>
        </form>
      )}
      {flashcards && flashcards.length > 0 ? (
        flashcards.map((flashcard) => (
          <div
            key={flashcard._id}
            className="mx-5 mb-2 flex flex-col bg-white p-4 shadow-sm"
          >
            <div className="flex items-center">
              <span className="ml-2 h-full flex-[1] border-r-2 font-bold text-gray-600">
                {flashcard.term}
              </span>
              <span className="ml-3 h-full flex-[2] font-bold text-gray-600">
                {flashcard.definition}
              </span>
              <div className="ml-3 flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 text-gray-600 hover:scale-110 hover:cursor-pointer hover:text-primary"
                  onClick={() => {
                    setCurrentEditingId((prevId) =>
                      prevId === flashcard._id ? null : flashcard._id,
                    );
                    setEditTerm(flashcard.term);
                    setEditDefinition(flashcard.definition);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={
                      currentEditingId === flashcard._id
                        ? "M6 18L18 6M6 6l12 12"
                        : "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    }
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 text-gray-600 hover:scale-110 hover:cursor-pointer hover:text-primary"
                  onClick={() => handleDeleteFlashcard(flashcard._id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </div>
            {currentEditingId === flashcard._id && (
              <form
                className="mt-5 w-full bg-white p-4 shadow-md"
                onSubmit={handleEditFlashcard}
              >
                <div className="mb-4">
                  <label
                    className="mb-2 block font-bold text-gray-600"
                    htmlFor="term"
                  >
                    Term
                  </label>
                  <input
                    className="w-full rounded border px-3 py-2"
                    type="text"
                    id="term"
                    name="term"
                    placeholder="Enter flashcard term"
                    value={editTerm}
                    onChange={(e) => setEditTerm(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="mb-2 block font-bold text-gray-600"
                    htmlFor="definition"
                  >
                    Definition
                  </label>
                  <input
                    className="w-full rounded border px-3 py-2"
                    type="text"
                    id="definition"
                    name="definition"
                    placeholder="Enter flashcard definition"
                    value={editDefinition}
                    onChange={(e) => setEditDefinition(e.target.value)}
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
          </div>
        ))
      ) : (
        <p>No flashcards available.</p>
      )}
    </>
  );
};

export default FlashcardSlideshow;
