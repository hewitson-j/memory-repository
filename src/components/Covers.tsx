import Cover from "./Cover";
import "./Covers.css";
import { CoverProps } from "./Interfaces";

interface CoversProps {
  array: CoverProps[];
}

export default function Covers({ array }: CoversProps) {
  return (
    <div className="covers">
      {array.map((entry) => {
        return (
          <Cover
            key={entry.id}
            id={entry.id}
            title={entry.title}
            imageSource={entry.imageSource}
            description={entry.description}
            clicks={entry.clicks}
          />
        );
      })}
    </div>
  );
}
