import "./App.css";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Landing/Landing";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import * as authService from "../src/services/authService";
import { useEffect } from "react";
import useUser from "./store/user";

function App() {
  const username = useUser((state) => state.username);
  const userId = useUser((state) => state._id);
  const updateUser = useUser((state) => state.updateUser);

  const user = { username, _id: userId };

  useEffect(() => {
    updateUser(authService.getUser());
  }, []);

  function handleSignout() {
    authService.signout();
    updateUser({ username: null, _id: null });
  }
  return (
    <>
      <Sidebar user={user} handleSignout={handleSignout} />
      <h1>Hello</h1>
      <Routes>
        {user.username ? (
          <>
            <Route path="/dashboard" element={<Dashboard user={user} />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route
              path="/signin"
              element={<SigninForm updateUser={updateUser} />}
            />
            <Route
              path="/signup"
              element={<SignupForm updateUser={updateUser} />}
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
