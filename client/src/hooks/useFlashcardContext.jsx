import { useContext } from "react";
import { DeckContext } from "../contexts/DeckContext";

export const useFlashCardContext = () => {
  const context = useContext(DeckContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an useDeckProvider");
  }

  return context;
};
