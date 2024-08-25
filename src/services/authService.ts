const BACKEND_URL: string = import.meta.env.VITE_EXPRESS_BACKEND_URL;

interface User {
  username: string | null;
  _id: string | null;
  password?: string;
  iat?: number;
}

type UserOrNull = User | null;

async function signup(formData: User): Promise<UserOrNull> {
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

async function signin(user: User): Promise<UserOrNull> {
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
      const user: User = JSON.parse(atob(json.token.split(".")[1]));
      console.log(user);
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

function getUser(): User {
  const token = localStorage.getItem("token");
  if (!token) return { username: null, _id: null };
  const user: { username: string; _id: string } = JSON.parse(
    atob(token.split(".")[1]),
  );
  return user;
}

function signout(): void {
  localStorage.removeItem("token");
}

export { signup, signin, getUser, signout };
