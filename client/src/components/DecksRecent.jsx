const DecksRecent = ({ decks }) => {
  return (
    <>
      {decks.map((deck) => (
        <div className="mt-5 w-full shadow-md" key={deck._id}>
          {/* card 1 */}
          <div className="flex h-16 bg-secondary-100 p-3">
            <p className="rounded-full bg-secondary-200 px-4 py-2 text-sm font-bold text-gray-500">
              {deck.flashcards.length} terms
            </p>
            <div className="ml-auto mr-3 flex items-center">
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

          {/* card 2 */}
          <div className="bg-white p-3">
            <p className="font-bold text-gray-600">{deck.title}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default DecksRecent;
