import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

interface UserState {
  username: string | null;
  _id: string | null;
}

interface UserAction {
  updateUser: (user: UserState) => void;
}

const useUserStore = create<UserState & UserAction>()(
  immer((set) => ({
    username: null,
    _id: null,
    updateUser: ({ username, _id }) => set(() => ({ username, _id })),
  })),
);

export default useUserStore;
