import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="hidden bg-white p-4 md:col-span-3 md:block md:h-full lg:col-span-2">
        <Link to={"/home"}>
          <h2 className="ml-2 text-4xl font-bold text-gray-500 md:text-5xl">
            QuizMe
          </h2>
        </Link>

        <div className="p-4 text-xl md:p-5 md:text-2xl">
          <Link to={"/home"}>
            <div className="mt-2 flex items-center hover:cursor-pointer hover:bg-secondary-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 md:h-8 md:w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>

              <div className="ml-2 mt-1 hidden text-sm font-bold md:ml-4 md:block md:text-base">
                Home
              </div>
            </div>
          </Link>
          <Link to={"/flashcards"}>
            <div className="mt-2 flex items-center hover:cursor-pointer hover:bg-secondary-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 md:h-8 md:w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                />
              </svg>

              <div className="ml-2 mt-1 hidden text-sm font-bold md:ml-4 md:block md:text-base">
                Flashcards
              </div>
            </div>
          </Link>
          <Link to={"/test"}>
            <div className="mt-2 flex items-center hover:cursor-pointer hover:bg-secondary-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 md:h-8 md:w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>

              <div className="ml-2 mt-1 hidden text-sm font-bold md:ml-4 md:block md:text-base">
                Test
              </div>
            </div>
          </Link>

          <div className="mt-8 flex items-center border-t-2 pt-3 text-primary hover:cursor-pointer hover:bg-secondary-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 md:h-8 md:w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            <div className="ml-2 mt-1 hidden text-sm font-bold md:ml-4 md:block md:text-base">
              Logout
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
