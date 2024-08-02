import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex h-screen min-w-96 flex-col items-center justify-center rounded-lg bg-gray-100 p-6 text-center shadow-lg md:p-8 lg:p-10">
      <header>
        <h1 className="mb-4 text-3xl font-bold text-gray-700 md:text-4xl lg:text-5xl">
          Welcome to QuizMe
        </h1>
        <p className="mb-6 text-base text-gray-600 md:text-lg lg:text-xl">
          Your ultimate tool for mastering new concepts.
        </p>
        <Link to="/library">
          <button className="rounded bg-primary px-4 py-2 text-white hover:opacity-80 md:px-6 md:py-3 lg:px-8 lg:py-4">
            Get Started
          </button>
        </Link>
      </header>
    </div>
  );
};

export default Home;
