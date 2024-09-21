import useStore from "@/store/store";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/pages/EditCharacterPage";
import { Button } from "../../ui/button";
import ClassSelector from "./ClassSelector";

function CharClassesForm({
  form,
}: {
  form: UseFormReturn<FormData, any, undefined>;
}) {
  const currentCharacter = useStore((state) => state.currentCharacter);
  return (
    <div>
      {currentCharacter.classes.map((characterClass) => (
        <ClassSelector characterClass={characterClass} form={form} />
      ))}
      <Button>Add Class</Button>
    </div>
  );
}

export default CharClassesForm;
