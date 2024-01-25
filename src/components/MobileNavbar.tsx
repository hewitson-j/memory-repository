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
