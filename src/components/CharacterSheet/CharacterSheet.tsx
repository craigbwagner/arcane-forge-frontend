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
  console.log("current character", currentCharacter);

  const form = useForm<z.infer<typeof characterSchema>>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: "",
      race: "",
      classes: [],
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
      hitDiceTotal: 0,
      skillExpertise: [],
    },
  });
  return (
    <main className="ml-[17rem]">
      <h1>Current Character</h1>
    </>
  );
}

export default CharacterSheet;
