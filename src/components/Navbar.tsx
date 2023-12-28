import "./Navbar.css";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="links">
      <Link to={"/"} title="Home">
        <button>Home</button>
      </Link>
    </div>
  );
}
