import "./Header.css";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <>
      <div className="header">
        <h1>Hewitson Memory Library</h1>
        <h2>A repository for Hewitson family photos and scrapbooks.</h2>
      </div>
      <Navbar />
    </>
  );
}
