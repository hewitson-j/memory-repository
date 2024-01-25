import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabaseconfig";
import "./MobileNavbar.css";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      setIsSigningOut(false);
      return;
    }
    navigate("/");
  };

  return (
    <div className="mobile-navbar">
      <h3>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          ☰
        </button>
      </h3>
      {isOpen ? (
        <ul>
          <li>
            <Link to={"/home"} className="mobile-navbar-links">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/browse"} className="mobile-navbar-links">
              Browse
            </Link>
          </li>
          <li>
            <Link to={"/upload"} className="mobile-navbar-links">
              Upload
            </Link>
          </li>
          <li onClick={handleSignOut}>
            {!isSigningOut ? "Sign Out" : "Signing Out..."}
          </li>
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}
