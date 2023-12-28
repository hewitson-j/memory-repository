import "./Navbar.css";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="links">
      <Link to={"/"} title="Home">
        <button>Home</button>
      </Link>
      <Link to={"browse"} title="Browse Books">
        <button>Browse Books</button>
      </Link>
      <Link to={"search"} title="Search">
        <button>Search Books</button>
      </Link>
    </div>
  );
}
