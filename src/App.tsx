import "./App.css";
import { create } from "zustand";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Landing/Landing";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import * as authService from "../src/services/authService";

interface UserState {
  user: string | null;
}

interface UserActions {
  updateUser: (user: UserState["user"]) => void;
}

const useStore = create<UserState & UserActions>()((set) => ({
  user: authService.getUser(),
  updateUser: (user: UserState["user"]) => set(() => ({ user: user })),
}));

function App() {
  const user = useStore((state) => state.user);
  const updateUser = useStore((state) => state.updateUser);

  function handleSignout() {
    authService.signout();
    updateUser(null);
  }
  return (
    <>
      <h1>Hello</h1>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Navbar user={user} handleSignout={handleSignout} />
          </>
        ) : (
          <Route path="/" element={<Landing />} />
        )}

        <Route
          path="/signup"
          element={<SignupForm updateUser={updateUser} />}
        />
        <Route
          path="/signin"
          element={<SigninForm updateUser={updateUser} />}
        />
      </Routes>
    </>
  );
}

export default App;
