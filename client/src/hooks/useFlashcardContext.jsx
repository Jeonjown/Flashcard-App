import { useContext } from "react";
import { FlashcardContext } from "../contexts/FlashcardContext";

const useFlashcardContext = () => {
  const context = useContext(FlashcardContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an useDeckProvider");
  }

  return context;
};

export default useFlashcardContext;
