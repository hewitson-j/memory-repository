import "./Navbar.css";

import { Link } from "react-router-dom";

export default function Links() {
  return (
    <div className="links">
      <Link to={"/"} title="Home">
        <button>Home</button>
      </Link>
    </div>
  );
}
