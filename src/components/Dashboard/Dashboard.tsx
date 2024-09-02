import useStore from "../../store/store";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  if (!user) {
    navigate("/signin");
  }
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
