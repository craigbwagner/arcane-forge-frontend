import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/pages/EditCharacterPage";
import {
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

function CharAbilitiesForm({
  form,
}: {
  form: UseFormReturn<FormData, any, undefined>;
}) {
  return (
    <div className="grid grid-cols-2">
      <FormField
        control={form.control}
        name="strength"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Strength</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="intelligence"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Intelligence</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="dexterity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dexterity</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="wisdom"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Wisdom</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="constitution"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Constitution</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="charisma"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Charisma</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default CharAbilitiesForm;
