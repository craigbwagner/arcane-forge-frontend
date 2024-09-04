import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useStore, { Character } from "../store/store";
import * as characterService from "@/services/characterService";
import { number, string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CharBasicDetailsForm from "@/components/CharacterSheet/CharBasicDetailsForm";
import CharCoreStats from "@/components/CharacterSheet/CharCoreStats";
import CharSkills from "@/components/CharacterSheet/CharSkills";

const characterSchema = z.object({
  name: z.string(),
  race: z.string(),
  sex: z.string(),
  size: z.string(),
  age: z.coerce.number(),
  height: z.string(),
  weight: z.coerce.number(),
  alignment: z.string(),
  languages: z.string().array(),
  initiative: z.coerce.number(),
  speed: z.coerce.number(),
  maxHP: z.coerce.number(),
  currentHP: z.coerce.number(),
  tempHP: z.coerce.number(),
  hitDiceRemaining: z.coerce.number(),
  hitDiceType: string(),
  hitDiceTotal: z.coerce.number(),
});

function CharacterSheet() {
  const { characterId } = useParams();
  const currentCharacter = useStore((state) => state.currentCharacter);
  const user = useStore((state) => state.user);
  const updateUser = useStore((state) => state.updateUser);
  const updateCharacter = useStore((state) => state.updateCharacter);
  let proficiencyBonus = 2;
  const abilityScores = [
    {
      name: "STR",
      abilityScore: currentCharacter.strength,
      abilityMod: calculateAbilityMod(currentCharacter.strength),
    },
    {
      name: "DEX",
      abilityScore: currentCharacter.dexterity,
      abilityMod: calculateAbilityMod(currentCharacter.dexterity),
    },
    {
      name: "CON",
      abilityScore: currentCharacter.constitution,
      abilityMod: calculateAbilityMod(currentCharacter.constitution),
    },
    {
      name: "CHA",
      abilityScore: currentCharacter.charisma,
      abilityMod: calculateAbilityMod(currentCharacter.charisma),
    },
    {
      name: "WIS",
      abilityScore: currentCharacter.wisdom,
      abilityMod: calculateAbilityMod(currentCharacter.wisdom),
    },
    {
      name: "INT",
      abilityScore: currentCharacter.intelligence,
      abilityMod: calculateAbilityMod(currentCharacter.intelligence),
    },
  ];

  function calculateAbilityMod(abilityScore: number): number {
    return Math.floor((abilityScore - 10) / 2);
  }

  if (!characterId) {
    throw new Error("No character currently selected.");
  }

  useEffect(() => {
    const fetchCharacter = async () => {
      const fetchedCharacter: Character =
        await characterService.getCharacter(characterId);
      if (fetchedCharacter) {
        updateCharacter(fetchedCharacter);
      }
    };
    const setProficiencyBonus = () => {
      if (currentCharacter.level < 5) {
        proficiencyBonus = 2;
      } else if (currentCharacter.level < 9) {
        proficiencyBonus = 3;
      } else if (currentCharacter.level < 13) {
        proficiencyBonus = 4;
      } else if (currentCharacter.level < 17) {
        proficiencyBonus = 5;
      } else {
        proficiencyBonus = 6;
      }
    };
    fetchCharacter();
    setProficiencyBonus();
  }, []);

  const form = useForm<z.infer<typeof characterSchema>>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: "",
      race: "",
      sex: "",
      size: "",
      age: 0,
      height: "",
      weight: 0,
      alignment: "",
      languages: [],
      initiative: 0,
      speed: 0,
      maxHP: 0,
      currentHP: 0,
      tempHP: 0,
      hitDiceRemaining: 0,
      hitDiceType: "",
      hitDiceTotal: 0,
    },
    values: {
      name: currentCharacter.name,
      race: currentCharacter.race,
      sex: currentCharacter.sex,
      size: currentCharacter.size,
      age: currentCharacter.age,
      height: currentCharacter.height,
      weight: currentCharacter.weight,
      alignment: currentCharacter.alignment,
      languages: currentCharacter.languages,
      initiative: currentCharacter.initiative,
      speed: currentCharacter.speed,
      maxHP: currentCharacter.maxHP,
      currentHP: currentCharacter.currentHP,
      tempHP: currentCharacter.tempHP,
      hitDiceRemaining: currentCharacter.hitDiceRemaining,
      hitDiceType: currentCharacter.hitDiceType,
      hitDiceTotal: currentCharacter.hitDiceTotal,
    },
  });

  async function saveCharacter(
    values: z.infer<typeof characterSchema>,
    e: any,
  ) {
    e.preventDefault();
    let tempUser;
    if (user) {
      tempUser = {
        ...user,
      };
      let updatedUserCharacters = tempUser?.characters.filter(
        (character) => character._id !== currentCharacter._id,
      );
      updatedUserCharacters?.unshift({
        ...values,
        _id: currentCharacter._id,
        strength: currentCharacter.strength,
        dexterity: currentCharacter.dexterity,
        intelligence: currentCharacter.intelligence,
        wisdom: currentCharacter.wisdom,
        constitution: currentCharacter.constitution,
        charisma: currentCharacter.charisma,
        level: currentCharacter.level,
        savingThrowProficiencies: currentCharacter.savingThrowProficiencies,
        skillExpertise: currentCharacter.skillExpertise,
        skillProficiencies: currentCharacter.skillProficiencies,
        abilities: currentCharacter.abilities,
        items: currentCharacter.items,
        creator: currentCharacter.creator,
        classes: currentCharacter.classes,
      });
      tempUser.characters = updatedUserCharacters;
      updateUser(tempUser);
    }

    try {
      characterService.saveCharacter({
        ...values,
        _id: characterId,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  return (
    <main className="flex flex-col ml-[17rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(saveCharacter)}>
          <Card>
            <CardHeader>
              <CardTitle>Basic Details</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <CharBasicDetailsForm form={form} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Abilities</CardTitle>
              <CardDescription>Ability Scores and Modifiers</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {abilityScores.map((ability) => {
                return (
                  <div className="flex flex-col text-center rounded-md border-[1px] border-slate-300">
                    <h2>{ability.name}</h2>
                    <h3>
                      {ability.abilityMod > 0
                        ? `+${ability.abilityMod}`
                        : ability.abilityMod}
                    </h3>
                    <h4 className="rounded-md border-[1px] border-slate-200">
                      {ability.abilityScore}
                    </h4>
                  </div>
                );
              })}
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Core Stats</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <CharCoreStats form={form} proficiencyBonus={proficiencyBonus} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <CharSkills
                abilityScores={abilityScores}
                proficiencyBonus={proficiencyBonus}
              />
            </CardContent>
          </Card>
          <Button type="submit">Save Character</Button>
        </form>
      </Form>
    </main>
  );
}

export default CharacterSheet;
