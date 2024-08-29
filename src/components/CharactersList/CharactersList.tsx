import useStore from "@/store/store";

function CharactersList() {
  const characters = useStore((state) => state.user.characters);
  return (
    <>
      <h1>My Characters</h1>
      {characters.map((character) => {
        <li>character</li>;
      })}
    </>
  );
}

export default CharactersList;
