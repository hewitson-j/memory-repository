import Covers from "./Covers";
import "./Home.css";
import { testCoversData } from "./TestData";

export default function Home() {
  return (
    <div className="home">
      <h3>Popular Books</h3>
      <Covers array={testCoversData} limit={4} />
    </div>
  );
}
