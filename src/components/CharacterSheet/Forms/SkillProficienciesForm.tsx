import useStore from "@/store/store";
import SkillCheckbox from "./ProficiencyCheckbox";

export const skills = [
  {
    name: "Acrobatics",
    attributeName: "acrobatics",
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Animal Handling",
    attributeName: "animal-handling",
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Arcana",
    attributeName: "arcana",
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Athletics",
    attributeName: "athletics",
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Deception",
    attributeName: "deception",
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "History",
    attributeName: "history",
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Insight",
    attributeName: "insight",
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Intimidation",
    attributeName: "intimidation",
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Investigation",
    attributeName: "investigation",
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Medicine",
    attributeName: "medicine",
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Nature",
    attributeName: "nature",
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Perception",
    attributeName: "perception",
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Performance",
    attributeName: "performance",
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Persuasion",
    attributeName: "persuasion",
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Religion",
    attributeName: "religion",
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Sleight of Hand",
    attributeName: "sleight-of-hand",
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Stealth",
    attributeName: "stealth",
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Survival",
    attributeName: "survival",
    isProficient: false,
    hasExpertise: false,
  },
];

function SkillProficienciesForm() {
  const currentCharacter = useStore((state) => state.currentCharacter);

  skills.forEach((skill) => {
    if (currentCharacter.skillProficiencies.includes(skill.attributeName)) {
      if (currentCharacter.skillExpertise.includes(skill.attributeName)) {
        skill.hasExpertise = true;
      }
      skill.isProficient = true;
    }
  });

  return (
    <section className="grid grid-cols-2 gap-4">
      {skills.map((skill) => (
        <SkillCheckbox
          skill={skill}
          key={`${skill.attributeName}-proficiency`}
        />
      ))}
      {/* <div className="flex space-x-2 items-top">
        <Checkbox id="acrobatics" value="acrobatics" onClick={checkHandler} />
        <label
          htmlFor="acrobatics"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Acrobatics
        </label>
      </div>
      <div className="flex space-x-2 items-top">
        <Checkbox id="animal-handling" />
        <label
          htmlFor="animal-handling"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Animal Handling
        </label>
      </div>
      <div className="flex space-x-2 items-top">
        <Checkbox id="arcana" />
        <label
          htmlFor="arcana"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Arcana
        </label>
      </div>
      <div className="flex space-x-2 items-top">
        <Checkbox id="athletics" />
        <label
          htmlFor="athletics"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Athletics
        </label>
      </div>
      <div className="flex space-x-2 items-top">
        <Checkbox id="deception" />
        <label
          htmlFor="deception"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Deception
        </label>
      </div>
      <div className="flex space-x-2 items-top">
        <Checkbox id="history" />
        <label
          htmlFor="history"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          History
        </label>
      </div>
      <div className="flex space-x-2 items-top">
        <Checkbox id="insight" />
        <label
          htmlFor="insight"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Insight
        </label>
      </div>
      <div className="flex space-x-2 items-top">
        <Checkbox id="intimidation" />
        <label
          htmlFor="intimidation"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Intimidation
        </label>
      </div>
      <div className="flex space-x-2 items-top">
        <Checkbox id="investigation" />
        <label
          htmlFor="investigation"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Investigation
        </label>
      </div>
      <div className="flex space-x-2 items-top">
        <Checkbox id="medicine" />
        <label
          htmlFor="medicine"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Medicine
        </label>
      </div>
      <div className="flex space-x-2 items-top">
        <Checkbox id="nature" />
        <label
          htmlFor="nature"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Nature
        </label>
      </div>
      <div className="flex space-x-2 items-top">
        <Checkbox id="perception" />
        <label
          htmlFor="perception"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Perception
        </label>
      </div>
      <div className="flex space-x-2 items-top">
        <Checkbox id="performance" />
        <label
          htmlFor="performance"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Performance
        </label>
      </div>
      <div className="flex space-x-2 items-top">
        <Checkbox id="persuasion" />
        <label
          htmlFor="persuasion"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Persuasion
        </label>
      </div>
      <div className="flex space-x-2 items-top">
        <Checkbox id="religion" />
        <label
          htmlFor="religion"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Religion
        </label>
      </div>
      <div className="flex space-x-2 items-top">
        <Checkbox id="sleight-of-hand" />
        <label
          htmlFor="sleight-of-hand"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Sleight of Hand
        </label>
      </div>
      <div className="flex space-x-2 items-top">
        <Checkbox id="stealth" />
        <label
          htmlFor="stealth"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Stealth
        </label>
      </div>
      <div className="flex space-x-2 items-top">
        <Checkbox id="survival" />
        <label
          htmlFor="survival"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Survival
        </label>
      </div> */}
    </section>
  );
}

export default SkillProficienciesForm;
