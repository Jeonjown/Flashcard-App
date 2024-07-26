import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Added state for username
  const { signup } = useSignup();

  const handleClick = async (e) => {
    e.preventDefault();
    await signup(username, email, password); // Include username in the signup function
  };

  return (
    <section className="">
      <div className="mx-auto flex flex-col items-center px-6 py-8 md:h-screen lg:py-0">
        <a
          href="#"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900"
        ></a>
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-5 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-500 md:text-2xl">
              Sign up for an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-500"
                >
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                  placeholder="Your username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-500"
                >
                  Your email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                  placeholder="name@email.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-500"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                onClick={handleClick}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
