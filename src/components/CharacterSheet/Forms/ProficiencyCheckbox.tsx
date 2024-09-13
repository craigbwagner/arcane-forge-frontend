import useStore from "@/store/store";
import { Checkbox } from "../../ui/checkbox";
import { useState } from "react";

interface Skill {
  name: string;
  attributeName: string;
  isProficient: boolean;
  hasExpertise: boolean;
}

function SkillCheckbox({ skill }: { skill: Skill }) {
  const currentCharacter = useStore((state) => state.currentCharacter);
  const [isChecked, setIsChecked] = useState(skill.isProficient);

  function checkHandler(e: any): void {
    console.log(e);

    setIsChecked(!isChecked);

    if (isChecked === true) {
      currentCharacter.skillProficiencies.push(e.target.value);
    } else {
      currentCharacter.skillProficiencies.filter(
        (item) => item === e.target.value,
      );
    }

    console.log(currentCharacter.skillProficiencies);
  }

  return (
    <div className="flex space-x-2 items-top">
      <Checkbox
        id={skill.attributeName}
        value={skill.attributeName}
        onClick={checkHandler}
        checked={isChecked}
      />
      <label
        htmlFor={skill.attributeName}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {skill.name}
      </label>
    </div>
  );
}

export default SkillCheckbox;
