import Cover, { CoverProps } from "./Cover";
import "./Covers.css";

interface CoversProps {
  array: CoverProps[];
  limit?: number;
}

export default function Covers({ array, limit }: CoversProps) {
  if (limit && array.length > limit) {
    array = array.slice(0, limit);
  }

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
          />
        );
      })}
    </div>
  );
}
