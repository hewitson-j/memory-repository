import Cover from "./Cover";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <h3>Popular Books</h3>
      <div className="home-covers">
        <Cover />
        <Cover />
        <Cover />
        <Cover />
      </div>
    </div>
  );
}
