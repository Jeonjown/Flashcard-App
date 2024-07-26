const Decks = ({ decks }) => {
  return (
    <>
      {decks.map((deck) => (
        <div key={deck._id} className="m-4 inline-block w-64 shadow-md">
          {/* card 1 */}
          <div className="flex h-32 bg-secondary-100 p-3">
            <p className="h-10 rounded-full bg-secondary-200 px-4 py-2 text-sm font-bold text-gray-500">
              {deck.flashcards.length} Terms
            </p>
          </div>

          {/* card 2 */}
          <div className="bg-white p-3">
            <p className="font-bold text-gray-600">{deck.title}</p>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-5"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <p className="text-l ml-1 mt-1 font-bold text-gray-600">Bats</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Decks;
