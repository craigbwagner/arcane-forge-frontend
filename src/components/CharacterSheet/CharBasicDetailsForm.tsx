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
  alignment: string;
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

function CharBasicDetailsForm({
  form,
}: {
  form: UseFormReturn<FormData, any, undefined>;
}) {
  const currentCharacter = useStore((state) => state.currentCharacter);
  return (
    <div className="grid grid-cols-3">
      <h1>{currentCharacter.level}</h1>
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
    </div>
  );
}

export default CharBasicDetailsForm;
