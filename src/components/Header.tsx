import "./Header.css";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <>
      <div className="header">
        <h1>Memory Library</h1>
        <h2>
          A repository for Hewitson and Roberg family photos and scrapbooks.
        </h2>
      </div>
      <Navbar />
    </>
  );
}
