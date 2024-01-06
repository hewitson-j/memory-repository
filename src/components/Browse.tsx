import { useEffect, useState } from "react";
import "./Browse.css";
import Covers from "./Covers";
import { BookPage, BookProps, CoverProps } from "./Interfaces";
import supabase from "../supabaseconfig";
import Header from "./Header";

export default function Browse() {
  const [coversData, setCoversData] = useState<BookPage[]>();
  const [booksData, setBooksData] = useState<BookProps[]>();
  const [combinedData, setCombinedData] = useState<CoverProps[]>();

  const [isLoading, setIsLoading] = useState(true);

  const fetchBookCoverPages = async () => {
    console.log("Fetching book cover pages...");
    const { data, error } = await supabase
      .from("book_page")
      .select("*")
      .eq("is_cover", "true");
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setCoversData(data);
    }
    console.log("Fetched.");
  };

  const fetchBooks = async () => {
    console.log("Fetching books...");
    const { data, error } = await supabase.from("book").select("*");
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setBooksData(data);
    }
    console.log("Fetched.");
  };

  useEffect(() => {
    fetchBookCoverPages();
    fetchBooks();
  }, []);

  useEffect(() => {
    const combined = booksData?.map((book) => {
      const cover = coversData?.find((cover) => cover.book === book.id);
      return {
        id: book.id,
        title: book.title,
        description: book.description,
        imageSource: cover?.image_url,
      };
    });
    setCombinedData(combined);
  }, [booksData, coversData]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  return (
    <>
      <Header />
      <div className="browse">
        {isLoading ? (
          <p>Loading all books...</p>
        ) : (
          <>
            <h3>Browse Books</h3>
            <div className="browse-body">
              <Covers array={combinedData || []} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
