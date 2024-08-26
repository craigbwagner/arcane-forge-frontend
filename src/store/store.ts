import { produce } from "immer";
import { create } from "zustand";

interface State {
  readonly user: { username: string; _id: string } | null;
  readonly updateUser: (
    updatedUser: { username: string; _id: string } | null,
  ) => void;
}

const useStore = create<State>()((set) => ({
  user: { username: "", _id: "" },
  updateUser: (updatedUser) =>
    set(
      produce((draft) => {
        draft.user = updatedUser;
      }),
    ),
}));

export default useStore;
