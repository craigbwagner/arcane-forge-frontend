import "./App.css";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Landing/Landing";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import * as authService from "../src/services/authService";
import { useEffect } from "react";
import useStore from "./store/store";
import CharactersPage from "./components/CharactersPage/CharactersPage";
import CharacterSheet from "./components/CharacterSheet/CharacterSheet";

function App() {
  const user = useStore((state) => state.user);
  const updateUser = useStore((state) => state.updateUser);

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
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/:characterId" element={<CharacterSheet />} />
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </>
      </Routes>
    </>
  );
}

export default App;
