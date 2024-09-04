import useStore, { Character } from "@/store/store";

interface Ability {
  name: string;
  abilityScore: number;
  abilityMod: number;
  proficientSave: boolean;
  savingThrowMod: number;
}
type Abilities = Ability[];

function CharSkills({ abilities }: { abilities: Abilities }) {
  const currentCharacter = useStore(
    (state) => state.currentCharacter,
  ) as Character;

  const skills = [
    { name: "Acrobatics", ability: "DEX", mod: 0, isProficient: false },
    { name: "Animal Handling", ability: "WIS", mod: 0, isProficient: false },
    { name: "Arcana", ability: "INT", mod: 0, isProficient: false },
    { name: "Athletics", ability: "STR", mod: 0, isProficient: false },
    { name: "Deception", ability: "CHA", mod: 0, isProficient: false },
    { name: "History", ability: "INT", mod: 0, isProficient: false },
    { name: "Insight", ability: "WIS", mod: 0, isProficient: false },
    { name: "Intimidation", ability: "CHA", mod: 0, isProficient: false },
    { name: "Investigation", ability: "INT", mod: 0, isProficient: false },
    { name: "Medicine", ability: "WIS", mod: 0, isProficient: false },
    { name: "Nature", ability: "INT", mod: 0, isProficient: false },
    { name: "Perception", ability: "WIS", mod: 0, isProficient: false },
    { name: "Performance", ability: "CHA", mod: 0, isProficient: false },
    { name: "Persuasion", ability: "CHA", mod: 0, isProficient: false },
    { name: "Religion", ability: "INT", mod: 0, isProficient: false },
    { name: "Sleight of Hand", ability: "DEX", mod: 0, isProficient: false },
    { name: "Stealth", ability: "DEX", mod: 0, isProficient: false },
    { name: "Survival", ability: "WIS", mod: 0, isProficient: false },
  ];
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
      {skills.map((skill) => {
        return (
          <li key={skill.name}>
            <p>{skill.name}</p>
            <p>{skill.mod}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default CharSkills;
