import useStore, { Skill } from "@/store/store";
import { Checkbox } from "../../ui/checkbox";

function SkillCheckbox({ skill }: { skill: Skill }) {
  const currentCharacter = useStore((state) => state.currentCharacter);

  function checkHandler() {
    const currentSkills: Skill[] = [...currentCharacter.skills];
    const index = currentSkills.indexOf(skill);
    if (skill.isProficient === true) {
      currentSkills[index] = { ...skill, isProficient: false };
      updateSkills(currentSkills);
    } else {
      currentSkills[index] = { ...skill, isProficient: true };
      updateSkills(currentSkills);
    }
  }

  return (
    <div className="flex space-x-2 items-top">
      <Checkbox
        id={skill.attributeName}
        value={skill.attributeName}
        onClick={checkHandler}
        checked={skill.isProficient}
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
