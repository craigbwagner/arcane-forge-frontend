import { produce } from "immer";
import { create } from "zustand";
import zustymiddlewarets from "zustymiddlewarets";

interface Skill {
  name: string;
  attributeName: string;
  ability: string;
  isProficient: boolean;
  hasExpertise: boolean;
  skillMod: number;
}

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
  alignment:
    | "Chaotic Evil"
    | "Chaotic Neutral"
    | "Chaotic Good"
    | "Lawful Evil"
    | "Lawful Neutral"
    | "Lawful Good"
    | "Neutral Good"
    | "Neutral"
    | "Neutral Evil";
  languages: string[];
  proficiencyBonus?: number;
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
  skills: Skill[];
  abilities: Ability[];
  items: Item[];
  updatedAt?: Date;
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
      alignment: "Neutral",
      languages: [],
      proficiencyBonus: 2,
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
      skills: [
        {
          name: "Acrobatics",
          attributeName: "acrobatics",
          ability: "DEX",
          isProficient: false,
          hasExpertise: false,
          skillMod: 0,
        },
        {
          name: "Animal Handling",
          attributeName: "animal-handling",
          ability: "WIS",
          isProficient: false,
          hasExpertise: false,
          skillMod: 0,
        },
        {
          name: "Arcana",
          attributeName: "arcana",
          ability: "INT",
          isProficient: false,
          hasExpertise: false,
          skillMod: 0,
        },
        {
          name: "Athletics",
          attributeName: "athletics",
          ability: "STR",
          isProficient: false,
          hasExpertise: false,
          skillMod: 0,
        },
        {
          name: "Deception",
          attributeName: "deception",
          ability: "CHA",
          isProficient: false,
          hasExpertise: false,
          skillMod: 0,
        },
        {
          name: "History",
          attributeName: "history",
          ability: "INT",
          isProficient: false,
          hasExpertise: false,
          skillMod: 0,
        },
        {
          name: "Insight",
          attributeName: "insight",
          ability: "WIS",
          isProficient: false,
          hasExpertise: false,
          skillMod: 0,
        },
        {
          name: "Intimidation",
          attributeName: "intimidation",
          ability: "CHA",
          isProficient: false,
          hasExpertise: false,
          skillMod: 0,
        },
        {
          name: "Investigation",
          attributeName: "intimidation",
          ability: "INT",
          isProficient: false,
          hasExpertise: false,
          skillMod: 0,
        },
        {
          name: "Medicine",
          attributeName: "medicine",
          ability: "WIS",
          isProficient: false,
          hasExpertise: false,
          skillMod: 0,
        },
        {
          name: "Nature",
          attributeName: "nature",
          ability: "INT",
          isProficient: false,
          hasExpertise: false,
          skillMod: 0,
        },
        {
          name: "Perception",
          attributeName: "perception",
          ability: "WIS",
          isProficient: false,
          hasExpertise: false,
          skillMod: 0,
        },
        {
          name: "Performance",
          attributeName: "performance",
          ability: "CHA",
          isProficient: false,
          hasExpertise: false,
          skillMod: 0,
        },
        {
          name: "Persuasion",
          attributeName: "persuasion",
          ability: "CHA",
          isProficient: false,
          hasExpertise: false,
          skillMod: 0,
        },
        {
          name: "Religion",
          attributeName: "religion",
          ability: "INT",
          isProficient: false,
          hasExpertise: false,
          skillMod: 0,
        },
        {
          name: "Sleight of Hand",
          attributeName: "sleight-of-hand",
          ability: "DEX",
          isProficient: false,
          hasExpertise: false,
          skillMod: 0,
        },
        {
          name: "Stealth",
          attributeName: "stealth",
          ability: "DEX",
          isProficient: false,
          hasExpertise: false,
          skillMod: 0,
        },
        {
          name: "Survival",
          attributeName: "survival",
          ability: "WIS",
          isProficient: false,
          hasExpertise: false,
          skillMod: 0,
        },
      ],
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
