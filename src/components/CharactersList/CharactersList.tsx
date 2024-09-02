import useStore from "../../store/store";

function CharactersList() {
  const characters = useStore((state) => state.user?.characters);
  return <div>CharactersList</div>;
}

export default CharactersList;
