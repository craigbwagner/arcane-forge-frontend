import { produce } from "immer";
import { create } from "zustand";

interface Ability {}

interface Item {}

interface Class {}

export interface Character {
  creator: string;
  _id?: string;
  name: string;
  race: string;
  classes: Class[];
  level: number;
  sex: string;
  size: string;
  age: number;
  height: string;
  weight: number;
  alignment: string;
  languages: string[];
  initiative: number;
  initiativeMods?: number;
  speed: number;
  maxHP: number;
  currentHP: number;
  tempHP: number;
  hitDiceRemaining: number;
  hitDiceType: string;
  hitDiceTotal: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  savingThrowProficiencies: string[];
  skillProficiencies: string[];
  skillExpertise: string[];
  abilities: Ability[];
  items: Item[];
}

interface State {
  user: {
    username: string;
    _id: string;
    characters: Character[];
  } | null;
  currentCharacter: Character | null;
  updateUser: (updatedUser: { username: string; _id: string } | null) => void;
  updateCharacter: (updatedCharacter: Character | null) => void;
  addUserCharacter: (newCharacter: Character) => void;
}

const useStore = create<State>()((set) => ({
  user: { username: "", _id: "", characters: [] },
  currentCharacter: null,
  updateUser: (updatedUser) =>
    set(
      produce((draft) => {
        draft.user = updatedUser;
      }),
    ),
  updateCharacter: (updatedCharacter) =>
    set(
      produce((draft: State) => {
        draft.currentCharacter = updatedCharacter;
      }),
    ),
  addUserCharacter: (newCharacter) =>
    set(
      produce((draft: State) => {
        if (draft.user) draft.user.characters.push(newCharacter);
      }),
    ),
}));

export default useStore;
