const BACKEND_URL: string = import.meta.env.VITE_EXPRESS_BACKEND_URL;

async function create(creator: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/characters/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creator }),
    });
    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
}

export { create };
