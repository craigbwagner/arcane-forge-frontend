import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

interface State {
  user: { username: string; _id: string } | null;
  updateUser: (user: { username: string; _id: string } | null) => void;
}

const useStore = create<State>()(
  immer((set) => ({
    user: { username: "", _id: "" },
    updateUser: (user) => set(() => user),
  })),
);

export default useStore;
