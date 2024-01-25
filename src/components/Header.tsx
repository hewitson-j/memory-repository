import { useEffect, useState } from "react";
import "./Header.css";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";

export default function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 445);

  useEffect(() => {
    const handleScreenResize = () => {
      setIsMobile(window.innerWidth <= 445);
    };

    window.addEventListener("resize", handleScreenResize);

    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  return (
    <>
      <div className="header">
        <h1>Hewitson Memory Library</h1>
        <h2>A repository for Hewitson family photos and scrapbooks.</h2>
      </div>
      {!isMobile ? <Navbar /> : <MobileNavbar />}
    </>
  );
}
