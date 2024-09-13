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

  currentCharacter.skills.forEach((skill) => {
    let skillMod: SkillMod = { skillName: skill.name, modValue: 0 };
    switch (skill.ability) {
      case "STR":
        skillMod.modValue = abilities[0].abilityMod;
        break;
      case "DEX":
        skillMod.modValue = abilities[1].abilityMod;
        break;
      case "CON":
        skillMod.modValue = abilities[2].abilityMod;
        break;
      case "CHA":
        skillMod.modValue = abilities[3].abilityMod;
        break;
      case "WIS":
        skillMod.modValue = abilities[4].abilityMod;
        break;
      case "INT":
        skillMod.modValue = abilities[5].abilityMod;
        break;
    }

    if (skill.isProficient) {
      if (skill.hasExpertise) {
        skillMod.modValue += (currentCharacter.proficiencyBonus as number) * 2;
        skillMods.push(skillMod);
      } else {
        skillMod.modValue += currentCharacter.proficiencyBonus as number;
        skillMods.push(skillMod);
      }
    }
  });

  return (
    <ul>
      <li className="flex justify-between">
        <p>Skill Name</p>
        <div className="flex w-60 justify-evenly">
          <p>PROF.</p>
          <p>ABIL</p>
          <p>MOD</p>
        </div>
      </li>
      {currentCharacter.skills.map((skill) => {
        return (
          <li key={skill.name} className="flex justify-between">
            <p>{skill.name}</p>
            <div className="flex w-60 justify-evenly">
              <p>{skill.isProficient === true ? "true" : "false"}</p>
              <p>{skill.ability}</p>
              <p>{skill.skillMod}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CharSkills;
