import { produce } from "immer";
import { create } from "zustand";

interface Ability {}

interface Item {}

interface Class {}

interface State {
  readonly user: { username: string; _id: string } | null;
  readonly character: {
    creator: string;
    name?: string;
    race?: string;
    classes?: Class[];
    level?: number;
    sex?: string;
    size?: string;
    age?: number;
    height?: string;
    weight?: number;
    alignment?: string;
    languages?: string[];
    initiative?: number;
    initiativeMods?: number;
    speed?: number;
    maxHP?: number;
    currentHP?: number;
    tempHP?: number;
    hitDiceRemaining?: number;
    hitDiceType?: string;
    hitDiceTotal?: number;
    strength?: number;
    dexterity?: number;
    constitution?: number;
    intelligence?: number;
    wisdom?: number;
    charisma?: number;
    savingThrowProficiencies?: string[];
    skillProficiencies?: string[];
    skillExpertise?: string[];
    abilities?: Ability[];
    items?: Item[];
  };
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
  character: {},
}));

export default useStore;
