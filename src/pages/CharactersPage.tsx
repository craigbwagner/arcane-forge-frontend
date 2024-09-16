import useStore, { Character } from "@/store/store";
import { Button } from "../components/ui/button";
import * as charactersService from "../services/characterService";
import { useNavigate } from "react-router-dom";
import CharactersList from "../components/CharactersList";

function CharactersPage() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const addUserCharacter = useStore((state) => state.addUserCharacter);
  const updateCharacter = useStore((state) => state.updateCharacter);

  const initialCharacterValues = {
    creator: user?._id ?? "",
    name: "",
    race: "",
    classes: [],
    level: 1,
    sex: "",
    size: "",
    age: 0,
    height: "",
    weight: 0,
    alignment: "" as const,
    languages: [],
    initiative: 0,
    speed: 0,
    maxHP: 0,
    currentHP: 0,
    tempHP: 0,
    hitDiceRemaining: 0,
    hitDiceType: "",
    hitDiceTotal: 1,
    savingThrowProficiencies: [],
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
  };

  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();
    try {
      if (user) {
        const newCharacter: Character = await charactersService.create(
          initialCharacterValues,
        );
        addUserCharacter(newCharacter);
        updateCharacter(newCharacter);
        navigate(`/characters/${newCharacter._id}`);
      }
    } catch (err: unknown) {
      console.log(err);
    }
  }

  return (
    <main className="ml-[17rem]">
      <h1>My Characters</h1>
      <form onSubmit={handleSubmit}>
        <Button type="submit">Add Character</Button>
      </form>
      <CharactersList />
    </main>
  );
}

export default CharactersPage;
