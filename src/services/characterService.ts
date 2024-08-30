import { Character } from "../store/store";

const BACKEND_URL: string = import.meta.env.VITE_EXPRESS_BACKEND_URL;

async function create(characterData: Character): Promise<Character> {
  try {
    const res = await fetch(`${BACKEND_URL}/characters/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(characterData),
    });
    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }
    return json;
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
}

async function getCharacter(characterId: string): Promise<Character> {
  try {
    const res = await fetch(`${BACKEND_URL}/characters/${characterId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }
    return json as Character;
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
}

async function saveCharacter(characterData: any) {
  try {
    const res = await fetch(`${BACKEND_URL}/characters/${characterData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(characterData),
    });
    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }
    return json;
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
}

export { create, getCharacter, saveCharacter };
