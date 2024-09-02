import useStore, { Character } from "@/store/store";
import { Button } from "../ui/button";
import * as charactersService from "../../services/characterService";
import { useNavigate } from "react-router-dom";
import CharactersList from "../CharactersList/CharactersList";

function CharactersPage() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const addUserCharacter = useStore((state) => state.addUserCharacter);
  const updateCharacter = useStore((state) => state.updateCharacter);

  const initializeCharacterValues = {
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

  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();
    try {
      if (user) {
        const newCharacter: Character = await charactersService.create(
          initializeCharacterValues,
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
