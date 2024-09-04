import useStore from "@/store/store";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  name: string;
  race: string;
  sex: string;
  size: string;
  age: number;
  height: string;
  weight: number;
  alignment:
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

function CharBasicDetailsForm({
  form,
}: {
  form: UseFormReturn<FormData, any, undefined>;
}) {
  const currentCharacter = useStore((state) => state.currentCharacter);
  return (
    <div className="grid grid-cols-3">
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
            <FormLabel>Gender</FormLabel>
            <FormControl>
              <Input placeholder="Gender" {...field} />
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
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Alignment</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Alignment" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Chaotic Evil">Chaotic Evil</SelectItem>
                  <SelectItem value="Chaotic Neutral">
                    Chaotic Neutral
                  </SelectItem>
                  <SelectItem value="Chaotic Good">Chaotic Good</SelectItem>
                  <SelectItem value="Lawful Evil">Lawful Evil</SelectItem>
                  <SelectItem value="Lawful Neutral">Lawful Neutral</SelectItem>
                  <SelectItem value="Lawful Good">Lawful Good</SelectItem>
                  <SelectItem value="Neutral Evil">Neutral Evil</SelectItem>
                  <SelectItem value="Neutral">Neutral</SelectItem>
                  <SelectItem value="Neutral Good">Neutral Good</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}

export default CharBasicDetailsForm;
