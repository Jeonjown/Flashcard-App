import { createContext, useReducer } from "react";

export const FlashcardContext = createContext();

export const FlashcardReducer = (state, action) => {
  switch (action.type) {
    case "SET_FLASHCARDS":
      return { ...state, flashcards: action.payload };
    case "CREATE_FLASHCARD":
      return { ...state, flashcards: [action.payload, ...state.flashcards] };
    case "DELETE_FLASHCARD":
      return {
        ...state,
        flashcards: state.flashcards.filter((fc) => fc._id !== action.payload),
      };
    case "UPDATE_FLASHCARD":
      return {
        ...state,
        flashcards: state.flashcards.map((fc) =>
          fc._id === action.payload._id
            ? {
                ...fc,
                term: action.payload.term,
                definition: action.payload.definition,
              }
            : fc,
        ),
      };
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
