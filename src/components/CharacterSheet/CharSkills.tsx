import useStore, { Character } from "@/store/store";

interface Ability {
  name: string;
  abilityScore: number;
  abilityMod: number;
}
type AbilityScores = Ability[];

function CharSkills({
  abilityScores,
}: {
  abilityScores: AbilityScores;
  proficiencyBonus: number;
}) {
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
        skill.mod = abilityScores[0].abilityMod;
        break;
      case "DEX":
        skill.mod = abilityScores[1].abilityMod;
        break;
      case "CON":
        skill.mod = abilityScores[2].abilityMod;
        break;
      case "CHA":
        skill.mod = abilityScores[3].abilityMod;
        break;
      case "WIS":
        skill.mod = abilityScores[4].abilityMod;
        break;
      case "INT":
        skill.mod = abilityScores[5].abilityMod;
        break;
    }

    if (currentCharacter.skillProficiencies.includes(skill.name)) {
      skill.mod += currentCharacter.proficiencyBonus as number;
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
