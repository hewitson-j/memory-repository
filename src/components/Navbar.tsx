import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <div className="links">
      <Link to={"/home"} title="Home">
        <button>Home</button>
      </Link>
      <Link to={"/browse"} title="Browse Books">
        <button>Browse Books</button>
      </Link>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
