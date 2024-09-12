import useStore, { Character } from "@/store/store";

interface Ability {
  name: string;
  abilityScore: number;
  abilityMod: number;
  proficientSave: boolean;
  savingThrowMod: number;
}
type Abilities = Ability[];

export const skills = [
  {
    name: "Acrobatics",
    attributeName: "acrobatics",
    ability: "DEX",
    mod: 0,
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Animal Handling",
    attributeName: "animal-handling",
    ability: "WIS",
    mod: 0,
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Arcana",
    attributeName: "arcana",
    ability: "INT",
    mod: 0,
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Athletics",
    attributeName: "athletics",
    ability: "STR",
    mod: 0,
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Deception",
    attributeName: "deception",
    ability: "CHA",
    mod: 0,
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "History",
    attributeName: "history",
    ability: "INT",
    mod: 0,
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Insight",
    attributeName: "insight",
    ability: "WIS",
    mod: 0,
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Intimidation",
    attributeName: "intimidation",
    ability: "CHA",
    mod: 0,
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Investigation",
    attributeName: "intimidation",
    ability: "INT",
    mod: 0,
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Medicine",
    attributeName: "medicine",
    ability: "WIS",
    mod: 0,
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Nature",
    attributeName: "nature",
    ability: "INT",
    mod: 0,
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Perception",
    attributeName: "perception",
    ability: "WIS",
    mod: 0,
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Performance",
    attributeName: "performance",
    ability: "CHA",
    mod: 0,
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Persuasion",
    attributeName: "persuasion",
    ability: "CHA",
    mod: 0,
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Religion",
    attributeName: "religion",
    ability: "INT",
    mod: 0,
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Sleight of Hand",
    attributeName: "sleight-of-hand",
    ability: "DEX",
    mod: 0,
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Stealth",
    attributeName: "stealth",
    ability: "DEX",
    mod: 0,
    isProficient: false,
    hasExpertise: false,
  },
  {
    name: "Survival",
    attributeName: "survival",
    ability: "WIS",
    mod: 0,
    isProficient: false,
    hasExpertise: false,
  },
];

function CharSkills({ abilities }: { abilities: Abilities }) {
  const currentCharacter = useStore(
    (state) => state.currentCharacter,
  ) as Character;

  skills.forEach((skill) => {
    switch (skill.ability) {
      case "STR":
        skill.mod = abilities[0].abilityMod;
        break;
      case "DEX":
        skill.mod = abilities[1].abilityMod;
        break;
      case "CON":
        skill.mod = abilities[2].abilityMod;
        break;
      case "CHA":
        skill.mod = abilities[3].abilityMod;
        break;
      case "WIS":
        skill.mod = abilities[4].abilityMod;
        break;
      case "INT":
        skill.mod = abilities[5].abilityMod;
        break;
    }

    if (currentCharacter.skillProficiencies.includes(skill.name)) {
      if (currentCharacter.skillExpertise.includes(skill.name)) {
        skill.mod += (currentCharacter.proficiencyBonus as number) * 2;
      } else {
        skill.mod += currentCharacter.proficiencyBonus as number;
      }
      skill.isProficient = true;
    }
  });

  return (
    <ul>
      <li className="flex justify-between">
        <p>Skill Name</p>
        <div className="flex w-60 justify-evenly">
          <p>PROF.</p>
          <p>MOD</p>
          <p></p>
        </div>
      </li>
      {skills.map((skill) => {
        return (
          <li key={skill.name} className="flex justify-between">
            <p>{skill.name}</p>
            <div className="flex w-60 justify-evenly">
              <p>{skill.isProficient === true ? "true" : "false"}</p>
              <p>{skill.ability}</p>
              <p>{skill.mod}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CharSkills;
