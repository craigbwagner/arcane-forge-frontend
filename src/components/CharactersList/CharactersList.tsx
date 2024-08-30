import useStore, { Character } from "@/store/store";
import { Button } from "../ui/button";
import * as charactersService from "../../services/characterService";
import { Form, useNavigate } from "react-router-dom";

function CharactersList() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const addUserCharacter = useStore((state) => state.addUserCharacter);
  const updateCharacter = useStore((state) => state.updateCharacter);
  const currentCharacter = useStore((state) => state.currentCharacter);
  if (!user) {
    throw new Error("No current user.");
  }

  const initializeCharacterValues = {
    creator: user._id,
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
  };
  const characters = user.characters;
  console.log("characters state:", characters);

  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();
    try {
      if (user) {
        const newCharacter: Character = await charactersService.create(
          initializeCharacterValues,
        );
        addUserCharacter(newCharacter);
        updateCharacter(newCharacter);
        console.log(currentCharacter);
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
      {characters ? (
        <ul>
          {characters.map((character) => {
            return <li key={character._id}>{character._id}</li>;
          })}
        </ul>
      ) : (
        <p>No characters created.</p>
      )}
    </main>
  );
}

export default CharactersList;
