import { Link } from "react-router-dom";
import { useDeckContext } from "../hooks/useDeckContext";
import { useAuthContext } from "../hooks/useAuthContext";

const DecksRecent = () => {
  const { decks } = useDeckContext();
  const { userInfo } = useAuthContext();

  const validDecks = decks.filter((deck) => deck && deck._id);
  const username = userInfo.user.username;

  return (
    <>
      <h4 className="border-b-2 border-secondary-100 text-xl font-bold text-gray-600">
        Most Recent
      </h4>
      <div className="overflow-x-auto scroll-smooth whitespace-nowrap md:overflow-x-auto">
        {validDecks.length > 0 ? (
          validDecks.map((deck) => (
            <div
              key={deck._id}
              className="my-4 mr-8 inline-block w-64 shadow-md hover:scale-105 hover:cursor-pointer hover:shadow-lg"
            >
              <Link to={`/decks/${deck._id}`}>
                <div className="flex h-32 bg-secondary-100 p-3">
                  <p className="h-10 rounded-full bg-secondary-200 px-4 py-2 text-sm font-bold text-gray-500">
                    {deck.flashcards.length} Terms
                  </p>
                </div>

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
                    <p className="text-l ml-1 mt-1 font-bold text-gray-600">
                      {username}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No recent decks available</p>
        )}
      </div>
    </>
  );
};

export default DecksRecent;
