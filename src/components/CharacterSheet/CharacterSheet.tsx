import useStore from "../../store/store";

function CharacterSheet() {
  const currentCharacter = useStore((state) => state.currentCharacter);
  return (
    <>
      <h1>Current Character</h1>
    </>
  );
}

export default CharacterSheet;
