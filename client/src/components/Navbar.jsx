import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const [profile, setProfile] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const { userInfo, dispatch } = useAuthContext();
  const { logout } = useLogout();
  const profileRef = useRef(null);
  const hamburgerRef = useRef(null);

  const handleClickProfile = () => {
    setProfile(!profile);
  };

  const handleClickBurger = () => {
    setHamburger(!hamburger);
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setProfile(false);
    }
    if (hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
      setHamburger(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="mt-4 flex min-w-96 items-center">
      <div className="relative md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="my-5 ml-5 size-10 text-gray-500 hover:scale-105 hover:cursor-pointer md:hidden"
          onClick={handleClickBurger}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <div
          ref={hamburgerRef}
          className={`absolute left-5 top-16 z-10 bg-secondary-100 p-5 ${hamburger ? "block" : "hidden"} rounded-md shadow-md`}
        >
          <Link to={"/"}>
            <div className="flex items-center hover:cursor-pointer hover:bg-secondary-200">
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
              <div className="ml-2 mt-1">Home</div>
            </div>
          </Link>
          <Link to={"/library"}>
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
              <div className="ml-2 mt-1">Library</div>
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
              <div className="ml-2 mt-1">Test</div>
            </div>
          </Link>
        </div>
      </div>

      <Link to={"/"}>
        <h2 className="ml-2 font-nunito text-5xl font-bold text-gray-500 md:hidden">
          QuizMe
        </h2>
      </Link>

      <div
        ref={profileRef}
        className="relative my-5 ml-auto mr-4 flex items-center hover:scale-105 hover:cursor-pointer"
        onClickCapture={handleClickProfile}
      >
        <div className="ml-auto hidden gap-4 md:flex">
          {!userInfo && (
            <>
              <Link to="/login">
                <span className="rounded-full border-2 border-primary px-3 py-1">
                  Login
                </span>
              </Link>
              <Link to="/signup">
                <span className="mr-5 rounded-full border-2 border-primary px-3 py-1">
                  Signup
                </span>
              </Link>
            </>
          )}
        </div>
        <h3 className="ml-2 font-nunito text-lg font-bold text-gray-500 md:text-xl">
          {userInfo && <>{userInfo.user.username}</>}
        </h3>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ml-1 size-10 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>

          <div
            className={`absolute right-1 top-10 bg-secondary-100 p-3 ${profile ? "block" : "hidden"} rounded-md shadow-md`}
          >
            {!userInfo && (
              <>
                <Link to={"/login"}>
                  <div className="hover:bg-secondary-200">Login</div>
                </Link>
                <Link to={"/signup"}>
                  <div className="my-2 hover:bg-secondary-200">Signup</div>
                </Link>
              </>
            )}

            <hr className="text-primary" />

            <div
              className="text-primary hover:cursor-pointer hover:bg-secondary-200"
              onClick={() => {
                logout();
                dispatch({ type: "LOGOUT" });
              }}
            >
              Signout
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
