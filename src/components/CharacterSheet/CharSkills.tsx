import useStore from "@/store/store";

interface Ability {
  name: string;
  abilityScore: number;
  abilityMod: number;
}
type AbilityScores = Ability[];

function CharSkills({ abilityScores }: { abilityScores: AbilityScores }) {
  // const currentCharacter = useStore((state) => state.currentCharacter);

  const skills = [
    { name: "Acrobatics", ability: "DEX", mod: 0 },
    { name: "Animal Handling", ability: "WIS", mod: 0 },
    { name: "Arcana", ability: "INT", mod: 0 },
    { name: "Athletics", ability: "STR", mod: 0 },
    { name: "Deception", ability: "CHA", mod: 0 },
    { name: "History", ability: "INT", mod: 0 },
    { name: "Insight", ability: "WIS", mod: 0 },
    { name: "Intimidation", ability: "CHA", mod: 0 },
    { name: "Investigation", ability: "INT", mod: 0 },
    { name: "Medicine", ability: "WIS", mod: 0 },
    { name: "Nature", ability: "INT", mod: 0 },
    { name: "Perception", ability: "WIS", mod: 0 },
    { name: "Performance", ability: "CHA", mod: 0 },
    { name: "Persuasion", ability: "CHA", mod: 0 },
    { name: "Religion", ability: "INT", mod: 0 },
    { name: "Sleight of Hand", ability: "DEX", mod: 0 },
    { name: "Stealth", ability: "DEX", mod: 0 },
    { name: "Survival", ability: "WIS", mod: 0 },
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

    // if (skill.name in currentCharacter.skillProficiencies)
  });
  return (
    <ul>
      {skills.map((skill) => {
        return (
          <li>
            <p>{skill.name}</p>
            <p>{skill.mod}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default CharSkills;
