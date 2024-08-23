import "./App.css";
import { create } from "zustand";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Navbar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Landing/Landing";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import * as authService from "../src/services/authService";

type UserState = {
  user: string | null;
};

type UserActions = {
  updateUser: (user: UserState["user"]) => void;
};

export const useUserStore = create<UserState & UserActions>()((set) => ({
  user: authService.getUser(),
  updateUser: (user: UserState["user"]) => set(() => ({ user: user })),
}));

function App() {
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);

  function handleSignout() {
    authService.signout();
    updateUser(null);
  }
  return (
    <>
      <Sidebar user={user} handleSignout={handleSignout} />
      <h1>Hello</h1>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Dashboard user={user} />} />
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
