import { produce } from "immer";
import { create } from "zustand";
import zustymiddlewarets from "zustymiddlewarets";

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
  currentCharacter: Character;
  updateUser: (
    updatedUser: {
      username: string;
      _id: string;
      characters: Character[];
    } | null,
  ) => void;
  updateCharacter: (updatedCharacter: Character) => void;
  addUserCharacter: (newCharacter: Character) => void;
}

const useStore = create<State>(
  zustymiddlewarets((set) => ({
    user: null,
    currentCharacter: {
      creator: "",
      name: "",
      race: "",
      classes: [],
      level: 1,
      sex: "",
      size: "",
      age: 0,
      height: "",
      weight: 0,
      alignment: "",
      languages: [],
      initiative: 0,
      speed: 0,
      maxHP: 0,
      currentHP: 0,
      tempHP: 0,
      hitDiceRemaining: 0,
      hitDiceType: "",
      hitDiceTotal: 1,
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
      savingThrowProficiencies: [],
      skillProficiencies: [],
      skillExpertise: [],
      abilities: [],
      items: [],
    },
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
  })),
);

declare global {
  interface Window {
    store: typeof useStore;
  }
}

window.store = useStore;
export default useStore;
