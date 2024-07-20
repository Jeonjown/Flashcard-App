const Flashcards = () => {
  return (
    <>
      {/* titles */}
      <div className=" mx-5">
        <h1 className=" text-gray-500 text-3xl font-bold">Flashcards</h1>
        <h4 className=" text-gray-600 text-xl font-bold border-b-2 border-secondary-100">
          Most Recent
        </h4>

        {/* scroll menu */}
        <div className="overflow-x-auto whitespace-nowrap scroll-smooth h-full transform">
          {/* flashcard container */}
          <div className=" shadow-md  inline-block w-64 ">
            {/* card 1 */}
            <div className=" h-32 bg-secondary-100 p-3 flex">
              <p className="bg-secondary-200 rounded-full py-2 px-4 text-sm text-gray-500 font-bold h-10">
                15 terms
              </p>
            </div>

            {/* card 2 */}
            <div className="bg-white p-3 ">
              <p className="text-gray-600 font-bold">Diwata Pares Overload</p>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <p className="ml-1 text-gray-600 text-l mt-1 font-bold">Bats</p>
                <div></div>
              </div>
            </div>
          </div>

          {/* flashcard container */}
          <div className=" shadow-md m-4 inline-block w-64 ">
            {/* card 1 */}
            <div className=" h-32 bg-secondary-100 p-3 flex">
              <p className="bg-secondary-200 rounded-full py-2 px-4 text-sm text-gray-500 font-bold h-10">
                15 terms
              </p>
            </div>

            {/* card 2 */}
            <div className="bg-white p-3 ">
              <p className="text-gray-600 font-bold">Diwata Pares Overload</p>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <p className="ml-1 text-gray-600 text-l mt-1 font-bold">Bats</p>
                <div></div>
              </div>
            </div>
          </div>

          {/* flashcard container */}
          <div className=" shadow-md m-4 inline-block w-64 ">
            {/* card 1 */}
            <div className=" h-32 bg-secondary-100 p-3 flex">
              <p className="bg-secondary-200 rounded-full py-2 px-4 text-sm text-gray-500 font-bold h-10">
                15 terms
              </p>
            </div>

            {/* card 2 */}
            <div className="bg-white p-3 ">
              <p className="text-gray-600 font-bold">Diwata Pares Overload</p>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <p className="ml-1 text-gray-600 text-l mt-1 font-bold">Bats</p>
                <div></div>
              </div>
            </div>
          </div>
        </div>

        <h4 className=" text-gray-600 text-xl font-bold border-b-2 border-secondary-100">
          Your Sets
        </h4>

        <div className="w-full mt-5 ">
          <div className="shadow-md  w-full mt-5">
            {/* card 1 */}
            <div className=" h-16 bg-secondary-100 p-3 flex ">
              <p className="bg-secondary-200 rounded-full py-2 px-4 text-sm text-gray-500 font-bold ">
                15 terms
              </p>
              <div className="flex items-center ml-auto mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <p className="ml-1 text-gray-600 text-l mt-1 font-bold">Bats</p>
              </div>
            </div>

            {/* card 2 */}
            <div className="bg-white p-3 ">
              <p className="text-gray-600 font-bold">Diwata Pares Overload</p>
            </div>
          </div>
          <div className="shadow-md  w-full mt-5">
            {/* card 1 */}
            <div className=" h-16 bg-secondary-100 p-3 flex ">
              <p className="bg-secondary-200 rounded-full py-2 px-4 text-sm text-gray-500 font-bold ">
                15 terms
              </p>
              <div className="flex items-center ml-auto mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <p className="ml-1 text-gray-600 text-l mt-1 font-bold">Bats</p>
              </div>
            </div>

            {/* card 2 */}
            <div className="bg-white p-3 ">
              <p className="text-gray-600 font-bold">Diwata Pares Overload</p>
            </div>
          </div>
          <div className="shadow-md  w-full mt-5">
            {/* card 1 */}
            <div className=" h-16 bg-secondary-100 p-3 flex ">
              <p className="bg-secondary-200 rounded-full py-2 px-4 text-sm text-gray-500 font-bold ">
                15 terms
              </p>
              <div className="flex items-center ml-auto mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <p className="ml-1 text-gray-600 text-l mt-1 font-bold">Bats</p>
              </div>
            </div>

            {/* card 2 */}
            <div className="bg-white p-3 ">
              <p className="text-gray-600 font-bold">Diwata Pares Overload</p>
            </div>
          </div>
          <div className="shadow-md  w-full mt-5">
            {/* card 1 */}
            <div className=" h-16 bg-secondary-100 p-3 flex ">
              <p className="bg-secondary-200 rounded-full py-2 px-4 text-sm text-gray-500 font-bold ">
                15 terms
              </p>
              <div className="flex items-center ml-auto mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <p className="ml-1 text-gray-600 text-l mt-1 font-bold">Bats</p>
              </div>
            </div>

            {/* card 2 */}
            <div className="bg-white p-3 ">
              <p className="text-gray-600 font-bold">Diwata Pares Overload</p>
            </div>
          </div>{" "}
          <div className="shadow-md  w-full mt-5">
            {/* card 1 */}
            <div className=" h-16 bg-secondary-100 p-3 flex ">
              <p className="bg-secondary-200 rounded-full py-2 px-4 text-sm text-gray-500 font-bold ">
                15 terms
              </p>
              <div className="flex items-center ml-auto mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <p className="ml-1 text-gray-600 text-l mt-1 font-bold">Bats</p>
              </div>
            </div>

            {/* card 2 */}
            <div className="bg-white p-3 ">
              <p className="text-gray-600 font-bold">Diwata Pares Overload</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Flashcards;
