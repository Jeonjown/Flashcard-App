import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Library from "./pages/Library";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Test from "./pages/Test";
import Home from "./pages/Home";
import { useAuthContext } from "./hooks/useAuthContext";
import DeckDetails from "./components/DeckDetails";
import DeckStudy from "./components/DeckStudy";
import DeckStudyDetails from "./components/DeckStudyDetails";

function App() {
  const { userInfo, loading } = useAuthContext();

  if (loading) {
    // Render a loading indicator while data is being fetched
    return <div>Loading...</div>;
  }
  return (
    <>
      <Sidebar />
      <div className="md:col-span-7 md:ml-64 lg:col-span-8 lg:ml-96">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Redirect to login if user is not authenticated */}
          <Route
            path="/"
            element={userInfo ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/library"
            element={userInfo ? <Library /> : <Navigate to="/login" />}
          />
          <Route
            path="/test"
            element={userInfo ? <Test /> : <Navigate to="/login" />}
          />
          <Route
            path="/decks/:deckId"
            element={userInfo ? <DeckDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/decks/:deckId/study"
            element={userInfo ? <DeckStudyDetails /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
