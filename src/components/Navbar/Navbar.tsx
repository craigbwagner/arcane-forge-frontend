import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface Props {
  user: {
    username: string; //might need to add more here
  };
  handleSignout: MouseEventHandler; //is this correct?
}

const NavBar = ({ user, handleSignout }: Props) => {
  return (
    <>
      {user ? (
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="" onClick={handleSignout}>
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavBar;
