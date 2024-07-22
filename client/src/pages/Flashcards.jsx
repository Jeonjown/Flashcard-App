const Flashcards = () => {
  return (
    <>
      {/* titles */}
      <div className="mx-5 lg:mx-40">
        <h1 className="text-3xl font-bold text-gray-500">Flashcards</h1>
        <h4 className="border-b-2 border-secondary-100 text-xl font-bold text-gray-600">
          Most Recent
        </h4>

        {/* scroll menu */}
        <div className="overflow-x-auto scroll-smooth whitespace-nowrap md:overflow-x-auto">
          {/* flashcard container */}
          <div className="inline-block w-64 shadow-md">
            {/* card 1 */}
            <div className="flex h-32 bg-secondary-100 p-3">
              <p className="h-10 rounded-full bg-secondary-200 px-4 py-2 text-sm font-bold text-gray-500">
                15 terms
              </p>
            </div>
            {/* card 2 */}
            <div className="bg-white p-3">
              <p className="font-bold text-gray-600">Diwata Pares Overload</p>
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
                <div></div>
              </div>
            </div>
          </div>

          {/* flashcard container */}
          <div className="m-4 inline-block w-64 shadow-md">
            {/* card 1 */}
            <div className="flex h-32 bg-secondary-100 p-3">
              <p className="h-10 rounded-full bg-secondary-200 px-4 py-2 text-sm font-bold text-gray-500">
                15 terms
              </p>
            </div>

            {/* card 2 */}
            <div className="bg-white p-3">
              <p className="font-bold text-gray-600">Diwata Pares Overload</p>
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
                <div></div>
              </div>
            </div>
          </div>

          {/* flashcard container */}
          <div className="m-4 inline-block w-64 shadow-md">
            {/* card 1 */}
            <div className="flex h-32 bg-secondary-100 p-3">
              <p className="h-10 rounded-full bg-secondary-200 px-4 py-2 text-sm font-bold text-gray-500">
                15 terms
              </p>
            </div>

            {/* card 2 */}
            <div className="bg-white p-3">
              <p className="font-bold text-gray-600">Diwata Pares Overload</p>
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
                <div></div>
              </div>
            </div>
          </div>
        </div>

        <h4 className="border-b-2 border-secondary-100 text-xl font-bold text-gray-600">
          Your Sets
        </h4>

        <div className="md: mt-5 w-full">
          <div className="mt-5 w-full shadow-md">
            {/* card 1 */}
            <div className="flex h-16 bg-secondary-100 p-3">
              <p className="rounded-full bg-secondary-200 px-4 py-2 text-sm font-bold text-gray-500">
                15 terms
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
              <p className="font-bold text-gray-600">Diwata Pares Overload</p>
            </div>
          </div>
          <div className="mt-5 w-full shadow-md">
            {/* card 1 */}
            <div className="flex h-16 bg-secondary-100 p-3">
              <p className="rounded-full bg-secondary-200 px-4 py-2 text-sm font-bold text-gray-500">
                15 terms
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
              <p className="font-bold text-gray-600">Diwata Pares Overload</p>
            </div>
          </div>
          <div className="mt-5 w-full shadow-md">
            {/* card 1 */}
            <div className="flex h-16 bg-secondary-100 p-3">
              <p className="rounded-full bg-secondary-200 px-4 py-2 text-sm font-bold text-gray-500">
                15 terms
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
              <p className="font-bold text-gray-600">Diwata Pares Overload</p>
            </div>
          </div>
          <div className="mt-5 w-full shadow-md">
            {/* card 1 */}
            <div className="flex h-16 bg-secondary-100 p-3">
              <p className="rounded-full bg-secondary-200 px-4 py-2 text-sm font-bold text-gray-500">
                15 terms
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
              <p className="font-bold text-gray-600">Diwata Pares Overload</p>
            </div>
          </div>{" "}
          <div className="mt-5 w-full shadow-md">
            {/* card 1 */}
            <div className="flex h-16 bg-secondary-100 p-3">
              <p className="rounded-full bg-secondary-200 px-4 py-2 text-sm font-bold text-gray-500">
                15 terms
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
              <p className="font-bold text-gray-600">Diwata Pares Overload</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Flashcards;
