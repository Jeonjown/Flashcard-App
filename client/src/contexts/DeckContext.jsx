import { createContext, useReducer } from "react";

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
        decks: state.decks.filter(),
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

  return (
    <DeckContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DeckContext.Provider>
  );
};
