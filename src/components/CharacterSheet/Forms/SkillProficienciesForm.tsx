import useStore from "@/store/store";
import SkillCheckbox from "./ProficiencyCheckbox";

function SkillProficienciesForm() {
  const currentCharacter = useStore((state) => state.currentCharacter);

  return (
    <section className="grid grid-cols-2 gap-4">
      {currentCharacter.skills.map((skill) => (
        <SkillCheckbox
          skill={skill}
          key={`${skill.attributeName}-proficiency`}
        />
      ))}
    </section>
  );
}

export default SkillProficienciesForm;
