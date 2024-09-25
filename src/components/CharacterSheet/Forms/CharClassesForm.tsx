import useStore from "@/store/store";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CharClassesForm() {
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

    const updatedCharLevel = currentCharacter.level + newLevel;

    updateCharacter({
      ...currentCharacter,
      classes: updatedClasses,
      level: updatedCharLevel,
    });
  }

  function handleDeleteClass(e: any) {
    const updatedClasses = [...currentCharacter.classes];
    const updatedCharLevel =
      currentCharacter.level - updatedClasses[e.target.value].level;
    updatedClasses.splice(e.target.value, 1);

    updateCharacter({
      ...currentCharacter,
      classes: updatedClasses,
      level: updatedCharLevel,
    });
  }

  return (
    <div>
      <ul>
        {currentCharacter.classes.map((characterClass, index) => (
          <li key={characterClass.name + index}>
            <h3>
              {characterClass.subclass} {characterClass.name}
            </h3>
            <p>Level {characterClass.level}</p>
            <Button onClick={handleDeleteClass} value={index}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
      <div className="flex">
        <Select value={newClass} onValueChange={(e) => setNewClass(e)}>
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
        <Input
          type="number"
          name="level"
          value={newLevel}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewLevel(Number(e.target.value))
          }
        ></Input>
        <label htmlFor="subclass">Subclass</label>
        <Input
          name="subclass"
          value={newSubclass}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewSubclass(e.target.value)
          }
        ></Input>
        <Button onClick={handleAddClass}>Add Class</Button>
      </div>
    </div>
  );
}

export default CharClassesForm;
