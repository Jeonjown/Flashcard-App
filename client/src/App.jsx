import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Flashcards from "./pages/Flashcards";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Test from "./pages/Test";
import Home from "./pages/Home";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { userInfo } = useAuthContext();

  return (
    <>
      <Sidebar />
      <div className="md:col-span-7 lg:col-span-8">
        <Navbar />
        <Routes>
          <Route
            path="/login"
            element={!userInfo ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/signup" element={<Signup />} />

          {/* Redirect to login if user is not authenticated */}
          <Route
            path="/"
            element={userInfo ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/flashcards"
            element={userInfo ? <Flashcards /> : <Navigate to="/login" />}
          />
          <Route
            path="/test"
            element={userInfo ? <Test /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
