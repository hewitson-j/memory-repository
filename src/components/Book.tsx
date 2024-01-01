import { useParams } from "react-router-dom";
import "./Book.css";
import { testCoversData } from "./TestData";
import { useEffect, useState } from "react";

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

  const isButtonDisabled = !entry?.images;

  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const calculateImageDimensions = (src: string) => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      let maxWidth = 600;
      let maxHeight = 600;

      if (window.innerWidth <= 650) {
        maxHeight = 450;
        maxWidth = 450;
      }

      if (window.innerWidth <= 450) {
        maxHeight = 250;
        maxWidth = 250;
      }

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        width = maxWidth;
        height = width / aspectRatio;
      }
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }

      setImageDimensions({ width, height });
    };
  };

  useEffect(() => {
    calculateImageDimensions(entry?.images?.[currentImage] || "");
  }, [entry?.images, currentImage]);

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
  };

  return (
    <div className="book">
      <h3>{entry?.title}</h3>
      <p>{entry?.description}</p>
      <div className="image-carousel">
        <button
          disabled={isPrevDisabled || isButtonDisabled}
          onClick={handlePrev}
        >
          Previous
        </button>
        <img
          src={entry?.images?.[currentImage] || entry?.imageSource}
          alt={entry?.title}
          title={entry?.title}
          style={{
            width: imageDimensions.width,
            height: imageDimensions.height,
          }}
        />
        <button
          disabled={isNextDisabled || isButtonDisabled}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
