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

function CharCoreStats({ form }: { form: UseFormReturn }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div>
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
      </div>
      <div>
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
      </div>
      <div>
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
      </div>
    </div>
  );
}

export default CharCoreStats;
