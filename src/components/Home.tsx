import Cover from "./Cover";
import "./Home.css";
import { testCoversData } from "./TestData";

export default function Home() {
  return (
    <div className="home">
      <h3>Popular Books</h3>
      <div className="home-covers">
        {testCoversData.map((entry) => {
          return (
            <Cover
              id={entry.id}
              title={entry.title}
              description={entry.description}
              imageSource={entry.imageSource}
            />
          );
        })}
      </div>
    </div>
  );
}
