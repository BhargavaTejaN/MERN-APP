import { Routes, Route, Navigate } from "react-router-dom";

// pages and components imports
import NavBar from "./components/NavBar/index";
import Home from "./pages/Home/index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useUserContext } from "./hooks/useUserContext";

function App() {
  const { user } = useUserContext();

  return (
    <div className="App">
      <NavBar />
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
