import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useStore, { Character, Skill } from "../store/store";
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
import SkillProficienciesForm from "@/components/CharacterSheet/Forms/SkillProficienciesForm";
import { Tabs, CustomFlowbiteTheme, Flowbite } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {
  tabs: {
    base: "flex flex-col gap-2",
    tablist: {
      base: "flex text-center",
      variant: {
        default: "flex-wrap border-b border-gray-200 dark:border-gray-700",
        underline:
          "-mb-px flex-wrap border-b border-gray-200 dark:border-gray-700",
        pills:
          "flex-wrap space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400",
        fullWidth:
          "grid w-full grid-flow-col divide-x divide-gray-200 rounded-none text-sm font-medium shadow dark:divide-gray-700 dark:text-gray-400",
      },
      tabitem: {
        base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
        variant: {
          default: {
            base: "rounded-t-lg",
            active: {
              on: "bg-gray-100 text-cyan-600 dark:bg-gray-800 dark:text-cyan-500",
              off: "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300",
            },
          },
          underline: {
            base: "rounded-t-lg",
            active: {
              on: "active rounded-t-lg border-b-2 border-cyan-600 text-cyan-600 dark:border-cyan-500 dark:text-cyan-500",
              off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
            },
          },
          pills: {
            base: "",
            active: {
              on: "rounded-lg bg-cyan-600 text-white",
              off: "rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white",
            },
          },
          fullWidth: {
            base: "ml-0 flex w-full rounded-none first:ml-0",
            active: {
              on: "active rounded-none bg-gray-100 p-4 text-gray-900 dark:bg-gray-700 dark:text-white",
              off: "rounded-none bg-white hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white",
            },
          },
        },
        icon: "mr-2 h-5 w-5",
      },
    },
    tabpanel: "py-3",
  },
};

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
  hitDiceType: string(),
  hitDiceTotal: z.coerce.number(),
  strength: z.coerce.number(),
  intelligence: z.coerce.number(),
  dexterity: z.coerce.number(),
  wisdom: z.coerce.number(),
  constitution: z.coerce.number(),
  charisma: z.coerce.number(),
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
    | ""
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
  speed: number;
  maxHP: number;
  currentHP: number;
  tempHP: number;
  hitDiceRemaining: number;
  hitDiceType: string;
  hitDiceTotal: number;
  strength: number;
  intelligence: number;
  dexterity: number;
  wisdom: number;
  constitution: number;
  charisma: number;
}

function EditCharacterPage() {
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

        fetchedCharacter.abilities.forEach((ability) => {
          ability.abilityMod = calculateAbilityMod(ability.abilityScore);
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
      strength: 10,
      dexterity: 10,
      intelligence: 10,
      wisdom: 10,
      constitution: 10,
      charisma: 10,
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
      strength: currentCharacter.abilities[0].abilityScore,
      intelligence: currentCharacter.abilities[1].abilityScore,
      dexterity: currentCharacter.abilities[2].abilityScore,
      wisdom: currentCharacter.abilities[3].abilityScore,
      constitution: currentCharacter.abilities[4].abilityScore,
      charisma: currentCharacter.abilities[5].abilityScore,
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
        skills: currentCharacter.skills,
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
                <Button>Character Sheet</Button>
              </Link>
              <Button type="submit">Save Character</Button>
            </div>
          </div>
          {/* https://flowbite-react.com/docs/components/tabs */}
          <Flowbite theme={{ theme: customTheme }}>
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
              <Tabs.Item title="Class">
                <Card>
                  <CardHeader>
                    <CardTitle>Classes</CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CharClassesForm form={form} />
                  </CardContent>
                </Card>
              </Tabs.Item>
              <Tabs.Item title="Abilities">
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
                        <CharAbilitiesForm form={form} />
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
                    <SkillProficienciesForm />
                  </CardContent>
                </Card>
              </Tabs.Item>
              <Tabs.Item title="Items"></Tabs.Item>
              <Tabs.Item title="Spells"></Tabs.Item>
            </Tabs>
          </Flowbite>
        </form>
      </Form>
    </main>
  );
}

export default EditCharacterPage;
