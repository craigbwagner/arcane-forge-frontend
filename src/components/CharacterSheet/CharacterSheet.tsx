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
    },
  });

  async function saveCharacter(
    values: z.infer<typeof characterSchema>,
    e: any,
  ) {
    e.preventDefault();
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
            name="classes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Classes</FormLabel>
                <FormControl>
                  <Input placeholder="Classes" {...field} />
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
                  <Input placeholder="Age" {...field} />
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
                  <Input placeholder="Weight" {...field} />
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
                  <Input placeholder="Initiative" {...field} />
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
                  <Input placeholder="Speed" {...field} />
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
                  <Input placeholder="Max HP" {...field} />
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
                  <Input placeholder="Current HP" {...field} />
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
                  <Input placeholder="Temp HP" {...field} />
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
                  <Input placeholder="Remaining Hit Die" {...field} />
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
                  <Input placeholder="Total Hit Die" {...field} />
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
