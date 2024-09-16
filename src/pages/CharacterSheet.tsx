import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useStore, { Character, Skill } from "../store/store";
import * as characterService from "@/services/characterService";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import { Form } from "../components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CharBasicDetails from "@/components/CharacterSheet/CharBasicDetails";
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
  alignment: z.enum([
    "",
    "Chaotic Evil",
    "Chaotic Neutral",
    "Chaotic Good",
    "Lawful Evil",
    "Lawful Neutral",
    "Lawful Good",
    "Neutral Good",
    "Neutral",
    "Neutral Evil",
  ]),
  languages: z.string().array(),
  initiative: z.coerce.number(),
  speed: z.coerce.number(),
  maxHP: z.coerce.number(),
  currentHP: z.coerce.number(),
  tempHP: z.coerce.number(),
  hitDiceRemaining: z.coerce.number(),
  hitDiceType: z.string(),
  hitDiceTotal: z.coerce.number(),
});

function CharacterSheet() {
  const { characterId } = useParams();
  const currentCharacter = useStore((state) => state.currentCharacter);
  const user = useStore((state) => state.user);
  const updateUser = useStore((state) => state.updateUser);
  const updateCharacter = useStore((state) => state.updateCharacter);
  let proficiencyBonus = 2;

  function calculateAbilityMod(abilityScore: number): number {
    return Math.floor((abilityScore - 10) / 2);
  }

  if (!characterId) {
    throw new Error("No character currently selected.");
  }

  useEffect(() => {
    const fetchCharacter = async () => {
      const updatedSkills: Skill[] = [];
      const fetchedCharacter: Character =
        await characterService.getCharacter(characterId);

      if (fetchedCharacter) {
        if (fetchedCharacter.level < 5) {
          proficiencyBonus = 2;
        } else if (fetchedCharacter.level < 9) {
          proficiencyBonus = 3;
        } else if (fetchedCharacter.level < 13) {
          proficiencyBonus = 4;
        } else if (fetchedCharacter.level < 17) {
          proficiencyBonus = 5;
        } else {
          proficiencyBonus = 6;
        }
        fetchedCharacter.proficiencyBonus = proficiencyBonus;

        fetchedCharacter.abilities.forEach((abilities) => {
          abilities.abilityMod = calculateAbilityMod(abilities.abilityScore);
        });

        fetchedCharacter.skills.forEach((skill) => {
          const currentSkill = { ...skill };
          let modValue = 0;

          switch (skill.ability) {
            case "STR":
              modValue = fetchedCharacter.abilities[0].abilityMod;
              break;
            case "INT":
              modValue = fetchedCharacter.abilities[1].abilityMod;
              break;
            case "DEX":
              modValue = fetchedCharacter.abilities[2].abilityMod;
              break;
            case "WIS":
              modValue = fetchedCharacter.abilities[3].abilityMod;
              break;
            case "CON":
              modValue = fetchedCharacter.abilities[4].abilityMod;
              break;
            case "CHA":
              modValue = fetchedCharacter.abilities[5].abilityMod;
              break;
          }

          if (skill.isProficient) {
            if (skill.hasExpertise) {
              modValue =
                modValue + (currentCharacter.proficiencyBonus as number) * 2;
            } else {
              modValue =
                modValue + (currentCharacter.proficiencyBonus as number);
            }
          }

          currentSkill.skillMod = modValue;
          updatedSkills.push(currentSkill);
        });

        fetchedCharacter.skills = updatedSkills;
        updateCharacter(fetchedCharacter);
      }
    };
    fetchCharacter();
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
      alignment: "Neutral",
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
        level: currentCharacter.level,
        features: currentCharacter.features,
        items: currentCharacter.items,
        creator: currentCharacter.creator,
        classes: currentCharacter.classes,
        skills: currentCharacter.skills,
        abilities: currentCharacter.abilities,
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
          <div className="flex justify-end">
            <Link to={`/characters/edit/${characterId}`}>
              <Button>Edit Character</Button>
            </Link>
            <Button type="submit">Save Character</Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Basic Details</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <CharBasicDetails />
            </CardContent>
          </Card>
          <div className="grid grid-cols-2">
            <div className="grid grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Abilities</CardTitle>
                  <CardDescription>
                    Ability Scores and Modifiers
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                  {currentCharacter.abilities.map((abilityScore) => {
                    return (
                      <div
                        className="flex flex-col text-center rounded-md border-[1px] border-slate-300"
                        key={abilityScore.name}
                      >
                        <h2>{abilityScore.shortName}</h2>
                        <h3>
                          {abilityScore.abilityMod > 0
                            ? `+${abilityScore.abilityMod}`
                            : abilityScore.abilityMod}
                        </h3>
                        <h4 className="rounded-md border-[1px] border-slate-200">
                          {abilityScore.abilityScore}
                        </h4>
                      </div>
                    );
                  })}
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Saving Throws</CardTitle>
                  <CardDescription>Saving Throw Modifiers</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                  {currentCharacter.abilities.map((ability) => {
                    return (
                      <div
                        className="flex justify-between text-center rounded-md border-[1px] border-slate-300"
                        key={ability.name}
                      >
                        <h2>{ability.name}</h2>
                        <h3>
                          {ability.abilityMod > 0
                            ? `+${ability.abilityMod}`
                            : ability.abilityMod}
                        </h3>
                      </div>
                    );
                  })}
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Core Stats</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <CharCoreStats form={form} />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <CharSkills />
            </CardContent>
          </Card>
        </form>
      </Form>
    </main>
  );
}

export default CharacterSheet;
