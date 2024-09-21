import { CharacterClass } from "../../../store/store";
import {
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/pages/EditCharacterPage";

function ClassSelector({
  characterClass,
  form,
  index,
}: {
  characterClass: CharacterClass;
  form: UseFormReturn<FormData, any, undefined>;
  index: number;
}) {
  return (
    <div className="flex">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Class" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Artificer">Artificer</SelectItem>
          <SelectItem value="Barbarian">Barbarian</SelectItem>
          <SelectItem value="Bard">Bard</SelectItem>
          <SelectItem value="Blood Hunter">Blood Hunter</SelectItem>
          <SelectItem value="Cleric">Cleric</SelectItem>
          <SelectItem value="Druid">Druid</SelectItem>
          <SelectItem value="Fighter">Fighter</SelectItem>
          <SelectItem value="Monk">Monk</SelectItem>
          <SelectItem value="Paladin">Paladin</SelectItem>
          <SelectItem value="Ranger">Ranger</SelectItem>
          <SelectItem value="Rogue">Rogue</SelectItem>
          <SelectItem value="Sorcerer">Sorcerer</SelectItem>
          <SelectItem value="Warlock">Warlock</SelectItem>
          <SelectItem value="Wizard">Wizard</SelectItem>
        </SelectContent>
      </Select>
      <Input type="number"></Input>
    </div>
  );
}

export default ClassSelector;
