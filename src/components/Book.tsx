import { useParams } from "react-router-dom";
import "./Book.css";
import { testCoversData } from "./TestData";

export default function Book() {
  const { itemId } = useParams();

  const entry = testCoversData.find(
    (cover) => cover.id === parseInt(itemId ?? "0")
  );

  return (
    <div className="book">
      <h3>{entry?.title}</h3>
      <p>{entry?.description}</p>
      <img
        src={entry?.images?.[0] || entry?.imageSource}
        alt={entry?.title}
        title={entry?.title}
      />
    </div>
  );
}
