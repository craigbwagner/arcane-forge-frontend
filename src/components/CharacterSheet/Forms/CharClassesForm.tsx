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
  const updateCharacter = useStore((state) => state.updateCharacter);

  function handleAddClass() {
    const newClass = { name: "", subclass: "", level: 1 };
    const updatedClasses = [...currentCharacter.classes, newClass];

    updateCharacter({ ...currentCharacter, classes: updatedClasses });
  }
  return (
    <div>
      {currentCharacter.classes.map((characterClass, index) => (
        <ClassSelector
          key={characterClass.name + index}
          characterClass={characterClass}
          form={form}
          index={index}
        />
      ))}
      <Button onClick={handleAddClass}>Add Class</Button>
    </div>
  );
}

export default CharClassesForm;
