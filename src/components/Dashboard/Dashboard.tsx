interface Props {
  user: string | null;
}

function Dashboard({ user }: Props) {
  return (
    <main>
      <h1>Welcome, {user}</h1>
      <p>
        This is the dashboard page where you, and only you, can see a dashboard
        of all of your things.
      </p>
    </main>
  );
}

export default Dashboard;
