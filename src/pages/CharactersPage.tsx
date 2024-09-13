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
      },
      {
        name: "Animal Handling",
        attributeName: "animal-handling",
        ability: "WIS",
        isProficient: false,
        hasExpertise: false,
      },
      {
        name: "Arcana",
        attributeName: "arcana",
        ability: "INT",
        isProficient: false,
        hasExpertise: false,
      },
      {
        name: "Athletics",
        attributeName: "athletics",
        ability: "STR",
        isProficient: false,
        hasExpertise: false,
      },
      {
        name: "Deception",
        attributeName: "deception",
        ability: "CHA",
        isProficient: false,
        hasExpertise: false,
      },
      {
        name: "History",
        attributeName: "history",
        ability: "INT",
        isProficient: false,
        hasExpertise: false,
      },
      {
        name: "Insight",
        attributeName: "insight",
        ability: "WIS",
        isProficient: false,
        hasExpertise: false,
      },
      {
        name: "Intimidation",
        attributeName: "intimidation",
        ability: "CHA",
        isProficient: false,
        hasExpertise: false,
      },
      {
        name: "Investigation",
        attributeName: "investigation",
        ability: "INT",
        isProficient: false,
        hasExpertise: false,
      },
      {
        name: "Medicine",
        attributeName: "medicine",
        ability: "WIS",
        isProficient: false,
        hasExpertise: false,
      },
      {
        name: "Nature",
        attributeName: "nature",
        ability: "INT",
        isProficient: false,
        hasExpertise: false,
      },
      {
        name: "Perception",
        attributeName: "perception",
        ability: "WIS",
        isProficient: false,
        hasExpertise: false,
      },
      {
        name: "Performance",
        attributeName: "performance",
        ability: "CHA",
        isProficient: false,
        hasExpertise: false,
      },
      {
        name: "Persuasion",
        attributeName: "persuasion",
        ability: "CHA",
        isProficient: false,
        hasExpertise: false,
      },
      {
        name: "Religion",
        attributeName: "religion",
        ability: "INT",
        isProficient: false,
        hasExpertise: false,
      },
      {
        name: "Sleight of Hand",
        attributeName: "sleight-of-hand",
        ability: "DEX",
        isProficient: false,
        hasExpertise: false,
      },
      {
        name: "Stealth",
        attributeName: "stealth",
        ability: "DEX",
        isProficient: false,
        hasExpertise: false,
      },
      {
        name: "Survival",
        attributeName: "survival",
        ability: "WIS",
        isProficient: false,
        hasExpertise: false,
      },
    ],
    abilities: [],
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
