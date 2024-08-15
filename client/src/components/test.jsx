import { useState } from "react";

const Test = () => {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <button
        onClick={() => {
          setCounter((prevCounter) => counter + 1);
        }}
      ></button>
      <p>test</p>
    </>
  );
};

export default Test;
