import useStore, { Character } from "../store/store";

const BACKEND_URL: string = import.meta.env.VITE_EXPRESS_BACKEND_URL;

async function create(creator: string): Promise<typeof Character> {
  try {
    const res = await fetch(`${BACKEND_URL}/characters/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ creator }),
    });
    const json = await res.json();
    json.creator = creator;
    if (json.err) {
      throw new Error(json.err);
    }
    return json;
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
}

export { create };
