import "./Browse.css";
import Covers from "./Covers";
import { testCoversData } from "./TestData";

export default function Browse() {
  return (
    <div className="browse">
      <h3>Browse Books</h3>
      <div className="browse-body">
        <Covers array={testCoversData} />
      </div>
    </div>
  );
}
