import { useState } from "react";
import { Link } from "react-router-dom";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mobile-navbar">
      <p>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          ☰
        </button>
      </p>
      {isOpen ? (
        <ul>
          <li>
            <Link to={"/home"}>Home</Link>
          </li>
          <li>
            <Link to={"/browse"}>Browse</Link>
          </li>
          <li>
            <Link to={"/upload"}>Upload</Link>
          </li>
          <li>
            <Link to={"/home"}>Sign Out</Link>
          </li>
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}
