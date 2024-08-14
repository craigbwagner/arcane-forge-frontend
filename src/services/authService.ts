const BACKEND_URL: string = import.meta.env.VITE_EXPRESS_BACKEND_URL;
interface User {
  username: string | null;
}

async function signup(formData) {
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
      const user: User = JSON.parse(atob(json.token.split(".")[1]));
      return user;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function signin(user: User) {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const json = await res.json();

    if (json.err) {
      throw new Error(json.err);
    }

    if (json.token) {
      localStorage.setItem("token", json.token);
      const user = JSON.parse(atob(json.token.split(".")[1]));
      return user;
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

function getUser(): string | null {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const user: User["username"] = JSON.parse(atob(token.split(".")[1]));
  return user;
}

function signout(): void {
  localStorage.removeItem("token");
}

export { signup, signin, getUser, signout };
