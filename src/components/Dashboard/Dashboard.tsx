type Props = {
  user: { username: string | null; _id: string | null };
};

function Dashboard({ user }: Props) {
  return (
    <main className="ml-[17rem]">
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you, and only you, can see a dashboard
        of all of your things.
      </p>
    </main>
  );
}

export default Dashboard;
