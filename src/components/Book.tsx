import { useParams } from "react-router-dom";
import "./Book.css";
import { useEffect, useState } from "react";
import supabase from "../supabaseconfig";
import { BookPage, BookProps } from "./Interfaces";

export default function Book() {
  const { itemId } = useParams();

  const [bookPages, setBookPages] = useState<BookPage[]>();
  const [book, setBook] = useState<BookProps[]>();

  const fetchBookPages = async () => {
    const { data, error } = await supabase
      .from("book_page")
      .select("*")
      .eq("book", itemId)
      .order("id", { ascending: true });

    if (error) {
      console.log(error);
    } else {
      setBookPages(data);
    }
  };

  const fetchBook = async () => {
    const { data, error } = await supabase
      .from("book")
      .select("*")
      .eq("id", itemId);

    if (error) {
      console.log(error);
    } else {
      setBook(data);
    }
  };

  useEffect(() => {
    fetchBookPages();
    fetchBook();
  }, []);

  const [prevImage, setPrevImage] = useState(-1);
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(1);

  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [rotate, setRotate] = useState(0);

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
    calculateImageDimensions(bookPages?.[currentImage].image_url || "");
  }, [bookPages, currentImage]);

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
    if (bookPages && currentImage < bookPages.length - 1) {
      setPrevImage(currentImage);
      setCurrentImage(nextImage);
      setNextImage(nextImage + 1);
    }

    setIsPrevDisabled(false);
    if (bookPages && currentImage === bookPages.length - 2) {
      setIsNextDisabled(true);
    }
  };

  return (
    <div className="book">
      <h3>{book?.[0].title || "Loading..."}</h3>
      <p>{book?.[0].description || "Loading..."}</p>
      <div className="image-carousel">
        <button disabled={isPrevDisabled} onClick={handlePrev}>
          Previous
        </button>
        <img
          src={bookPages?.[currentImage].image_url}
          alt={bookPages?.[currentImage].name}
          title={bookPages?.[currentImage].name}
          style={{
            width: imageDimensions.width,
            height: imageDimensions.height,
            transform: `rotate(${rotate}deg)`,
          }}
        />
        <button disabled={isNextDisabled} onClick={handleNext}>
          Next
        </button>
      </div>
      <div className="rotate-buttons">
        <button
          onClick={() => {
            setRotate(rotate - 90);
          }}
        >
          Rotate Left
        </button>
        <button
          onClick={() => {
            setRotate(rotate + 90);
          }}
        >
          Rotate Right
        </button>
      </div>
      <h3>{bookPages?.[currentImage].name}</h3>
    </div>
  );
}
