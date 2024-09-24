import useStore from "@/store/store";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/pages/EditCharacterPage";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ClassSelector from "./ClassSelector";

function CharClassesForm({
  form,
}: {
  form: UseFormReturn<FormData, any, undefined>;
}) {
  const currentCharacter = useStore((state) => state.currentCharacter);
  const updateCharacter = useStore((state) => state.updateCharacter);
  const [newClass, setNewClass] = useState("Class");
  const [newSubclass, setNewSubclass] = useState("");
  const [newLevel, setNewLevel] = useState(1);

  function handleAddClass() {
    const addedClass = {
      name: newClass,
      subclass: newSubclass,
      level: newLevel,
    };
    const updatedClasses = [...currentCharacter.classes, addedClass];

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
        <label htmlFor="level">Level</label>
        <Input type="number" name="level" value={newLevel}></Input>
        <label htmlFor="subclass">Subclass</label>
        <Input name="subclass"></Input>
        <Button onClick={handleAddClass}>Add Class</Button>
      </div>
    </div>
  );
}

export default CharClassesForm;
