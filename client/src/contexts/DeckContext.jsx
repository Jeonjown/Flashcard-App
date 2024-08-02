import { createContext, useEffect, useReducer } from "react";

// Create DeckContext
export const DeckContext = createContext();

// Define the reducer function
export const deckReducer = (state, action) => {
  switch (action.type) {
    case "SET_DECKS":
      return { decks: action.payload.decks };
    case "CREATE_DECK":
      return { decks: [action.payload, ...state.decks] };
    case "DELETE_DECK":
      return {
        decks: state.decks.filter((deck) => deck._id !== action.payload),
      };
    case "EDIT_DECK":
      return {
        decks: (state.decks || []).map((deck) =>
          deck._id === action.payload._id ? action.payload : deck,
        ),
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  decks: null,
};

// Create the DeckProvider component
export const DeckContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(deckReducer, initialState);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/decks/`;
        console.log("Fetching from:", apiUrl);

        const response = await fetch(apiUrl, {
          credentials: "include",
        });

        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (!response.ok) {
          // Log response text if not OK
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error("Deck not found");
        }

        const data = await response.json();
        dispatch({ type: "SET_DECKS", payload: data });
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchDeck();
  }, []);

  console.log("deck context: ", state);

  return (
    <DeckContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DeckContext.Provider>
  );
};
