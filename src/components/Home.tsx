import { useEffect, useState } from "react";
import supabase from "../supabaseconfig";
import Covers from "./Covers";
import "./Home.css";
import { BookPage, BookProps, CoverProps } from "./Interfaces";

export default function Home() {
  const [coversData, setCoversData] = useState<BookPage[]>();
  const [booksData, setBooksData] = useState<BookProps[]>();
  const [combinedData, setCombinedData] = useState<CoverProps[]>();

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

  return (
    <div className="home">
      <h3>Popular Books</h3>
      <Covers array={combinedData || []} limit={4} />
    </div>
  );
}
