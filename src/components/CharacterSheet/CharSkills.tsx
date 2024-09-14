import useStore, { Character } from "@/store/store";

function CharSkills() {
  const currentCharacter = useStore(
    (state) => state.currentCharacter,
  ) as Character;

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
