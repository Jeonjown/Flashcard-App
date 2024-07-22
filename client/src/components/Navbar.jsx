import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const handleClick = () => {
    setIsHidden(!isHidden);
  };
  return (
    <>
      <nav className="mt-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="my-5 ml-5 size-10 text-gray-500 md:hidden"
          onClick={handleClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <h2 className="ml-2 font-nunito text-5xl font-bold text-gray-500 md:hidden">
          QuizMe
        </h2>

        <div className="relative m-5 ml-auto flex items-center">
          <div className="ml-auto hidden gap-4 md:flex">
            <Link to={"/login"}>
              <span className="rounded-full border-2 border-primary px-3 py-1">
                Login
              </span>
            </Link>

            <Link to={"/signup"}>
              <span className="mr-5 rounded-full border-2 border-primary px-3 py-1">
                Signup
              </span>
            </Link>
          </div>
          <h3 className="ml-2 font-nunito text-xl font-bold text-gray-500">
            Bats
          </h3>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-1 size-10 text-gray-500"
              onClick={handleClick}
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>

            <div
              className={`absolute right-1 top-11 bg-secondary-100 p-2 ${isHidden ? "hidden" : "block"}`}
            >
              signout
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
