import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import useStore from "@/store/store";

interface FormData {
  name: string;
  race: string;
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
  initiative: number;
  speed: number;
  maxHP: number;
  currentHP: number;
  tempHP: number;
  hitDiceRemaining: number;
  hitDiceType: string;
  hitDiceTotal: number;
}

function CharCoreStats({
  form,
}: {
  form: UseFormReturn<FormData, any, undefined>;
}) {
  const currentCharacter = useStore((state) => state.currentCharacter);
  return (
    <div className="grid grid-cols-3 gap-2">
      <div>
        <div>
          <h1>Proficiency Bonus</h1>
          <h2>{currentCharacter.proficiencyBonus}</h2>
        </div>
        <div>
          <h1>AC</h1>
          <h2>some ac</h2>
        </div>
        <div>
          <h1>Initiative</h1>
          <h2>
            {currentCharacter.abilities[2].abilityMod > 0
              ? `+${currentCharacter.abilities[2].abilityMod}`
              : currentCharacter.abilities[2].abilityMod}
          </h2>
        </div>
        <div>
          <h1>Speed</h1>
          <h2>{currentCharacter.speed}</h2>
        </div>
      </div>
      <div>
        <div>
          <h1>Max HP</h1>
          <h2>{currentCharacter.maxHP}</h2>
        </div>
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
      </div>
      <div>
        <div>
          <h1>Max # of Hit Die</h1>
          <h2>{currentCharacter.hitDiceTotal}</h2>
        </div>
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
        <div>
          <h1>Hit Dice Type</h1>
          <h2>{currentCharacter.hitDiceType}</h2>
        </div>
      </div>
    </div>
  );
}

export default CharCoreStats;
