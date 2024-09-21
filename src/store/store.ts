import { produce } from "immer";
import { create } from "zustand";
import zustymiddlewarets from "zustymiddlewarets";

export interface Skill {
  name: string;
  attributeName: string;
  ability: string;
  isProficient: boolean;
  hasExpertise: boolean;
  skillMod: number;
}

interface Abilities {
  name: string;
  shortName: string;
  abilityScore: number;
  isProficientSave: boolean;
  saveMod: number;
  abilityMod: number;
}

interface Feature {}

interface Item {}

interface CharacterClass {
  name: string;
  level: number;
  subclass: string;
}

export interface Character {
  creator: string;
  _id?: string;
  name: string;
  race: string;
  classes: CharacterClass[];
  level: number;
  sex: string;
  size: string;
  age: number;
  height: string;
  weight: number;
  alignment:
    | ""
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
  abilities: Abilities[];
  skills: Skill[];
  features: Feature[];
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
      alignment: "",
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
      abilities: [
        {
          name: "Strength",
          shortName: "STR",
          abilityScore: 10,
          isProficientSave: false,
          saveMod: 0,
          abilityMod: 0,
        },
        {
          name: "Intelligence",
          shortName: "INT",
          abilityScore: 10,
          isProficientSave: false,
          saveMod: 0,
          abilityMod: 0,
        },
        {
          name: "Dexterity",
          shortName: "DEX",
          abilityScore: 10,
          isProficientSave: false,
          saveMod: 0,
          abilityMod: 0,
        },
        {
          name: "Wisdom",
          shortName: "WIS",
          abilityScore: 10,
          isProficientSave: false,
          saveMod: 0,
          abilityMod: 0,
        },
        {
          name: "Constitution",
          shortName: "CON",
          abilityScore: 10,
          isProficientSave: false,
          saveMod: 0,
          abilityMod: 0,
        },
        {
          name: "Charisma",
          shortName: "CHA",
          abilityScore: 10,
          isProficientSave: false,
          saveMod: 0,
          abilityMod: 0,
        },
      ],
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
          attributeName: "investigation",
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
      features: [],
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
