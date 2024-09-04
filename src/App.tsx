import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import SignupForm from "./pages/SignupForm";
import SigninForm from "./pages/SigninForm";
import * as authService from "../src/services/authService";
import { useEffect } from "react";
import useStore from "./store/store";
import PrivateRoute from "./components/PrivateRoute";
import CharactersPage from "./pages/CharactersPage";
import CharacterSheet from "./pages/CharacterSheet";

function App() {
  const updateUser = useStore((state) => state.updateUser);
  const user = useStore((state) => state.user);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      updateUser(await authService.getUser());
    };
    fetchLoggedInUser();
  }, []);

  function handleSignout() {
    authService.signout();
    updateUser(null);
  }
  return (
    <>
      <Sidebar handleSignout={handleSignout} />
      <h1>Hello</h1>
      <Routes>
        {user ? (
          <>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute user={user}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/characters"
              element={
                <PrivateRoute user={user}>
                  <CharactersPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/characters/:characterId"
              element={<CharacterSheet />}
            />
            <Route path="/signin" element={<Navigate to="/dashboard" />} />
            <Route path="/signup" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SigninForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
