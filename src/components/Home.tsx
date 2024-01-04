import { useEffect, useState } from "react";
import supabase from "../supabaseconfig";
import Covers from "./Covers";
import "./Home.css";
import { testCoversData } from "./TestData";
import { BookPage, BookProps } from "./Interfaces";

export default function Home() {
  const [coversData, setCoversData] = useState<BookPage[]>();
  const [booksData, setBooksData] = useState<BookProps[]>();

  // To-do: create interfaces, plan how to join results to be used for covers and entries

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
    console.log(coversData);
    console.log(booksData);
  }, []);

  return (
    <div className="home">
      <h3>Popular Books</h3>
      <Covers array={testCoversData} limit={4} />
    </div>
  );
}
