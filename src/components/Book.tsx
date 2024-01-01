import { useParams } from "react-router-dom";
import "./Book.css";
import { testCoversData } from "./TestData";
import { useState } from "react";

export default function Book() {
  const { itemId } = useParams();

  const entry = testCoversData.find(
    (cover) => cover.id === parseInt(itemId ?? "0")
  );

  const [prevImage, setPrevImage] = useState(-1);
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(1);

  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const handlePrev = () => {
    if (currentImage > 0) {
      setNextImage(currentImage);
      setCurrentImage(prevImage);
      setPrevImage(prevImage - 1);
    }

    setIsNextDisabled(false);
    if (prevImage === 0) {
      setIsPrevDisabled(true);
    }
    console.log(currentImage);
    console.log(prevImage);
    console.log(nextImage);
  };

  const handleNext = () => {
    if (entry?.images && currentImage < entry.images.length - 1) {
      setPrevImage(currentImage);
      setCurrentImage(nextImage);
      setNextImage(nextImage + 1);
    }

    setIsPrevDisabled(false);
    if (entry?.images?.length && currentImage === entry?.images?.length - 2) {
      setIsNextDisabled(true);
    }
    console.log(currentImage);
    console.log(prevImage);
    console.log(nextImage);
  };

  return (
    <div className="book">
      <h3>{entry?.title}</h3>
      <p>{entry?.description}</p>
      <div className="image-carousel">
        <button disabled={isPrevDisabled} onClick={handlePrev}>
          Previous
        </button>
        <img
          src={entry?.images?.[currentImage] || entry?.imageSource}
          alt={entry?.title}
          title={entry?.title}
        />
        <button disabled={isNextDisabled} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}
