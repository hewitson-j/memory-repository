import { useState } from "react";
import supabase from "../supabaseconfig";
import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
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
    <div className="links">
      <Link to={"/home"} title="Home">
        <button>Home</button>
      </Link>
      <Link to={"/browse"} title="Browse Books">
        <button>Browse Books</button>
      </Link>
      <button onClick={handleSignOut}>
        {!isSigningOut ? "Sign Out" : "Signing Out..."}
      </button>
    </div>
  );
}
