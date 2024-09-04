import useStore from "@/store/store";

function CharBasicDetailsForm() {
  const currentCharacter = useStore((state) => state.currentCharacter);
  return (
    <div className="grid grid-cols-3">
      <div>
        <h1>Level</h1>
        <h2>{currentCharacter.level}</h2>
      </div>
      <div>
        <h1>Name</h1>
        <h2>{currentCharacter.name}</h2>
      </div>
      <div>
        <h1>Race</h1>
        <h2>{currentCharacter.race}</h2>
      </div>
      <div>
        <h1>Sex</h1>
        <h2>{currentCharacter.sex}</h2>
      </div>
      <div>
        <h1>Size</h1>
        <h2>{currentCharacter.size}</h2>
      </div>
      <div>
        <h1>Age</h1>
        <h2>{currentCharacter.age}</h2>
      </div>
      <div>
        <h1>Height</h1>
        <h2>{currentCharacter.height}</h2>
      </div>
      <div>
        <h1>Weight</h1>
        <h2>{currentCharacter.weight}</h2>
      </div>
      <div>
        <h1>Alignment</h1>
        <h2>{currentCharacter.alignment}</h2>
      </div>
    </div>
  );
}

export default CharBasicDetailsForm;
