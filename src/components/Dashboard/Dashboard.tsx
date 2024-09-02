import useStore from "../../store/store";

function Dashboard() {
  const user = useStore((state) => state.user);

  return (
    <main className="ml-[17rem]">
      <h1>Welcome, {user?.username}</h1>
      <p>
        This is the dashboard page where you, and only you, can see a dashboard
        of all of your things.
      </p>
    </main>
  );
}

export default Dashboard;
