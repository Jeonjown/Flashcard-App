import { createContext, useEffect, useReducer } from "react";

export const FlashcardContext = createContext();

export const FlashcardReducer = (state, action) => {
  switch (action.type) {
    case "SET_FLASHCARDS":
      return { ...state, flashcards: action.payload };
    case "CREATE_FLASHCARD":
      return { ...state, flashcards: [action.payload, ...state.flashcards] };
    default:
      return state;
  }
};

const initialState = {
  flashcards: null,
};

export const FlashCardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(FlashcardReducer, initialState);
  console.log("flashcard context: ", state);
  return (
    <FlashcardContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FlashcardContext.Provider>
  );
};
