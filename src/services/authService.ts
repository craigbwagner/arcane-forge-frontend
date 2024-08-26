const BACKEND_URL: string = import.meta.env.VITE_EXPRESS_BACKEND_URL;

async function signup(formData: { username: string; password: string }) {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }
    if (json.token) {
      localStorage.setItem("token", json.token);
      const user: { username: string; _id: string; iat?: number } = JSON.parse(
        atob(json.token.split(".")[1]),
      );
      if (user) {
        delete user.iat;
        return user;
      } else {
        return null;
      }
    } else {
      throw new Error("No token in response");
    }
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
}

async function signin(formData: { username: string; password: string }) {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }

    if (json.token) {
      localStorage.setItem("token", json.token);
      const user: { username: string; _id: string; iat?: number } = JSON.parse(
        atob(json.token.split(".")[1]),
      );
      if (user) {
        delete user.iat;
        return user;
      } else {
        return null;
      }
    } else {
      throw new Error("No token in response");
    }
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
}

function getUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const user: { username: string; _id: string } = JSON.parse(
    atob(token.split(".")[1]),
  );
  return user;
}

function signout(): void {
  localStorage.removeItem("token");
}

export { signup, signin, getUser, signout };
