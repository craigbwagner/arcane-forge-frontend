import useStore from "../../store/store";
import { number, string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const characterSchema = z.object({
  name: z.string(),
  race: z.string(),
  classes: z.string().array(),
  sex: string(),
  size: string(),
  age: number(),
  height: string(),
  weight: number(),
  alignment: string(),
  languages: string().array(),
  initiative: number(),
  speed: number(),
  maxHP: number(),
  currentHP: number(),
  tempHP: number(),
  hitDiceRemaining: number(),
  hitDiceType: string(),
  hitDiceTotal: number(),
  skillExpertise: string().array(),
});

function CharacterSheet() {
  const currentCharacter = useStore((state) => state.currentCharacter);
  return (
    <>
      <h1>Current Character</h1>
    </>
  );
}

export default CharacterSheet;
