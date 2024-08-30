import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useStore, { Character } from "../../store/store";
import * as characterService from "@/services/characterService";
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
  sex: z.string(),
  size: z.string(),
  age: z.coerce.number(),
  height: z.string(),
  weight: z.coerce.number(),
  alignment: z.string(),
  languages: z.string().array(),
  initiative: z.coerce.number(),
  speed: z.coerce.number(),
  maxHP: z.coerce.number(),
  currentHP: z.coerce.number(),
  tempHP: z.coerce.number(),
  hitDiceRemaining: z.coerce.number(),
  hitDiceType: string(),
  hitDiceTotal: z.coerce.number(),
});

function CharacterSheet() {
  const { characterId } = useParams();
  const currentCharacter = useStore((state) => state.currentCharacter);
  const updateCharacter = useStore((state) => state.updateCharacter);

  if (!characterId) {
    throw new Error("No character currently selected.");
  }

  useEffect(() => {
    const fetchCharacter = async () => {
      const fetchedCharacter: Character =
        await characterService.getCharacter(characterId);
      if (fetchedCharacter) {
        updateCharacter(fetchedCharacter);
      }
    };
    fetchCharacter();
  }, []);

  const form = useForm<z.infer<typeof characterSchema>>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: "",
      race: "",
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
    },
    values: {
      name: currentCharacter.name,
      race: currentCharacter.race,
      sex: currentCharacter.sex,
      size: currentCharacter.size,
      age: currentCharacter.age,
      height: currentCharacter.height,
      weight: currentCharacter.weight,
      alignment: currentCharacter.alignment,
      languages: currentCharacter.languages,
      initiative: currentCharacter.initiative,
      speed: currentCharacter.speed,
      maxHP: currentCharacter.maxHP,
      currentHP: currentCharacter.currentHP,
      tempHP: currentCharacter.tempHP,
      hitDiceRemaining: currentCharacter.hitDiceRemaining,
      hitDiceType: currentCharacter.hitDiceType,
      hitDiceTotal: currentCharacter.hitDiceTotal,
    },
  });

  async function saveCharacter(
    values: z.infer<typeof characterSchema>,
    e: any,
  ) {
    e.preventDefault();
    try {
      characterService.saveCharacter({
        ...values,
        _id: characterId,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  return (
    <main className="ml-[17rem]">
      <h1>Current Character</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(saveCharacter)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="race"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Race</FormLabel>
                <FormControl>
                  <Input placeholder="Race" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sex</FormLabel>
                <FormControl>
                  <Input placeholder="Sex" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input placeholder="Size" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input placeholder="Age" type="number" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input placeholder="Height" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input placeholder="Weight" type="number" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="alignment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alignment</FormLabel>
                <FormControl>
                  <Input placeholder="Alignment" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Languages</FormLabel>
                <FormControl>
                  <Input placeholder="Languages" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="initiative"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initiative</FormLabel>
                <FormControl>
                  <Input placeholder="Initiative" type="number" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="speed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Speed</FormLabel>
                <FormControl>
                  <Input placeholder="Speed" type="number" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxHP"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max HP</FormLabel>
                <FormControl>
                  <Input placeholder="Max HP" type="number" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentHP"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current HP</FormLabel>
                <FormControl>
                  <Input placeholder="Current HP" type="number" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tempHP"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temp HP</FormLabel>
                <FormControl>
                  <Input placeholder="Temp HP" type="number" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hitDiceRemaining"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remaining Hit Die</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Remaining Hit Die"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hitDiceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hit Dice Type</FormLabel>
                <FormControl>
                  <Input placeholder="Hit Dice Type" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hitDiceTotal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max # of Hit Die</FormLabel>
                <FormControl>
                  <Input placeholder="Total Hit Die" type="number" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save Character</Button>
        </form>
      </Form>
    </main>
  );
}

export default CharacterSheet;
