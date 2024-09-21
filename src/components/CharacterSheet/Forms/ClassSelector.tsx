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
}: {
  characterClass: CharacterClass;
  form: UseFormReturn<FormData, any, undefined>;
}) {
  return <div>ClassSelector</div>;
}

export default ClassSelector;
