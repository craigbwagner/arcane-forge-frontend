import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useStore, { Character } from "../store/store";
import * as characterService from "@/services/characterService";
import { number, string, z } from "zod";
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
import CharBasicDetailsForm from "@/components/CharacterSheet/Forms/CharBasicDetailsForm";
import CharAbilitiesForm from "@/components/CharacterSheet/Forms/CharAbilitiesForm";
import { Tabs } from "flowbite-react";

const characterSchema = z.object({
  name: z.string(),
  race: z.string(),
  sex: z.string(),
  size: z.string(),
  age: z.coerce.number(),
  height: z.string(),
  weight: z.coerce.number(),
  alignment: z.enum([
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
  strength: z.number(),
  dexterity: z.number(),
  constitution: z.number(),
  charisma: z.number(),
  wisdom: z.number(),
  intelligence: z.number(),
  speed: z.coerce.number(),
  maxHP: z.coerce.number(),
  currentHP: z.coerce.number(),
  tempHP: z.coerce.number(),
  hitDiceRemaining: z.coerce.number(),
  hitDiceType: string(),
  hitDiceTotal: z.coerce.number(),
});

export interface FormData {
  name: string;
  race: string;
  sex: string;
  size: string;
  age: number;
  height: string;
  weight: number;
  alignment:
    | "Chaotic Evil"
    | "Chaotic Neutral"
    | "Chaotic Good"
    | "Lawful Evil"
    | "Lawful Neutral"
    | "Lawful Good"
    | "Neutral Good"
    | "Neutral"
    | "Neutral Evil";
  languages: string[];
  initiative: number;
  strength: number;
  dexterity: number;
  constitution: number;
  charisma: number;
  wisdom: number;
  intelligence: number;
  speed: number;
  maxHP: number;
  currentHP: number;
  tempHP: number;
  hitDiceRemaining: number;
  hitDiceType: string;
  hitDiceTotal: number;
}

function EditCharacterPage() {
  const { characterId } = useParams();
  const currentCharacter = useStore((state) => state.currentCharacter);
  const user = useStore((state) => state.user);
  const updateUser = useStore((state) => state.updateUser);
  const updateCharacter = useStore((state) => state.updateCharacter);
  let proficiencyBonus = 2;
  const abilities = [
    {
      name: "STR",
      abilityScore: currentCharacter.strength,
      abilityMod: calculateAbilityMod(currentCharacter.strength),
      proficientSave: false,
      savingThrowMod: 0,
    },
    {
      name: "DEX",
      abilityScore: currentCharacter.dexterity,
      abilityMod: calculateAbilityMod(currentCharacter.dexterity),
      proficientSave: false,
      savingThrowMod: 0,
    },
    {
      name: "CON",
      abilityScore: currentCharacter.constitution,
      abilityMod: calculateAbilityMod(currentCharacter.constitution),
      proficientSave: false,
      savingThrowMod: 0,
    },
    {
      name: "CHA",
      abilityScore: currentCharacter.charisma,
      abilityMod: calculateAbilityMod(currentCharacter.charisma),
      proficientSave: false,
      savingThrowMod: 0,
    },
    {
      name: "WIS",
      abilityScore: currentCharacter.wisdom,
      abilityMod: calculateAbilityMod(currentCharacter.wisdom),
      proficientSave: false,
      savingThrowMod: 0,
    },
    {
      name: "INT",
      abilityScore: currentCharacter.intelligence,
      abilityMod: calculateAbilityMod(currentCharacter.intelligence),
      proficientSave: false,
      savingThrowMod: 0,
    },
  ];

  function calculateAbilityMod(abilityScore: number): number {
    return Math.floor((abilityScore - 10) / 2);
  }

  function setSavingThrowMods() {
    abilities.forEach((ability) => {
      if (currentCharacter.savingThrowProficiencies.includes(ability.name)) {
        ability.proficientSave = true;
      }
    });
  }

  if (!characterId) {
    throw new Error("No character currently selected.");
  }

  useEffect(() => {
    const fetchCharacter = async () => {
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
        updateCharacter(fetchedCharacter);
        setSavingThrowMods();
        console.log(abilities);
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
      strength: 0,
      dexterity: 0,
      constitution: 0,
      charisma: 0,
      wisdom: 0,
      intelligence: 0,
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
      strength: currentCharacter.strength,
      dexterity: currentCharacter.dexterity,
      constitution: currentCharacter.constitution,
      charisma: currentCharacter.charisma,
      wisdom: currentCharacter.wisdom,
      intelligence: currentCharacter.intelligence,
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
          <div className="flex justify-between">
            <h1>Edit Character</h1>
            <div className="flex justify-end">
              <Link to={`/characters/${characterId}`}>
                <Button>Cancel</Button>
              </Link>
              <Button type="submit">Save Character</Button>
            </div>
          </div>
          {/* https://flowbite-react.com/docs/components/tabs */}
          <Tabs aria-label="Tabs with underline" variant="underline">
            <Tabs.Item active title="Description">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Details</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <CharBasicDetailsForm form={form} />
                </CardContent>
              </Card>
            </Tabs.Item>
            <Tabs.Item title="Class"></Tabs.Item>
            <Tabs.Item title="Ability Scores">
              <div className="grid grid-cols-2">
                <div className="grid grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Abilities</CardTitle>
                      <CardDescription>
                        Ability Scores and Saving Throws
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-2">
                      <CharAbilitiesForm form={form} abilities={abilities} />
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
                    {/* <CharCoreStats form={form} /> */}
                  </CardContent>
                </Card>
              </div>
            </Tabs.Item>
            <Tabs.Item title="Skills">
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <CharSkills abilities={abilities} /> */}
                </CardContent>
              </Card>
            </Tabs.Item>
            <Tabs.Item title="Items"></Tabs.Item>
            <Tabs.Item title="Spells"></Tabs.Item>
          </Tabs>
        </form>
      </Form>
    </main>
  );
}

export default EditCharacterPage;
