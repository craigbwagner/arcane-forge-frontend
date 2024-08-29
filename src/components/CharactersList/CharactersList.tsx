import useStore from "@/store/store";
import { Button } from "../ui/button";
import * as charactersService from "../../services/characterService";
import { Form, useNavigate } from "react-router-dom";

function CharactersList() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const addUserCharacter = useStore((state) => state.addUserCharacter);
  if (!user) {
    throw new Error("No current user.");
  }
  const characters = user.characters;

  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();
    try {
      const newCharacter = await charactersService.create(user._id);
      addUserCharacter(newCharacter);
      console.log(user);

      navigate(`/characters/${newCharacter._id}`);
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
    </main>
  );
}

export default CharactersList;
