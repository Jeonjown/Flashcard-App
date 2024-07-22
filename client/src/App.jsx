import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Flashcards from "./pages/Flashcards";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Test from "./pages/Test";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Sidebar />
      <div className="md:col-span-7 md:bg-red-400 lg:col-span-8 lg:bg-blue-200">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/flashcards" element={<Flashcards />}></Route>
          <Route path="/test" element={<Test />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
