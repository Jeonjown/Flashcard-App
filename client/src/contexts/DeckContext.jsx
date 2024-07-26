import { createContext, useReducer } from "react";

// Create DeckContext
export const DeckContext = createContext();

// Define the reducer function
export const deckReducer = (state, action) => {
  switch (action.type) {
    case "SET_DECKS":
      return { ...state, decks: action.payload.decks };
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

  console.log(state);

  return (
    <DeckContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DeckContext.Provider>
  );
};
