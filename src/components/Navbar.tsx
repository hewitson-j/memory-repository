import "./Navbar.css";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="links">
      <Link to={"/home"} title="Home">
        <button>Home</button>
      </Link>
      <Link to={"/browse"} title="Browse Books">
        <button>Browse Books</button>
      </Link>
    </div>
  );
}
