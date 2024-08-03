import Decks from "../components/Decks";
import DecksRecent from "../components/DecksRecent";

const Library = () => {
  return (
    <div className="mx-5">
      <h1 className="text-3xl font-bold text-gray-500">Decks</h1>
      <>
        <DecksRecent />
        <div className="w-full md:mt-5">
          <Decks />
        </div>
      </>
    </div>
  );
};

export default Library;
