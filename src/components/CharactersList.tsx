import useStore from "../store/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CharactersList() {
  const characters = useStore((state) => state.user?.characters);
  console.log(characters);
  return (
    <main>
      {characters ? (
        <ul>
          {characters.map((character) => {
            return (
              <li key={character._id}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <a href={`/characters/${character._id}`}>
                        {character.name === "" ? (
                          <h2>Unnamed Character</h2>
                        ) : (
                          character.name
                        )}
                      </a>
                    </CardTitle>
                    <CardDescription>
                      Level {character.level} character
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card Content</p>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No characters created.</p>
      )}
    </main>
  );
}

export default CharactersList;
