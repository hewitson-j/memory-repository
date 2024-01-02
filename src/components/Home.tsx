import { useEffect, useState } from "react";
import supabase from "../supabaseconfig";
import Covers from "./Covers";
import "./Home.css";
import { testCoversData } from "./TestData";
import { BookPage } from "./Interfaces";

export default function Home() {
  const [booksData, setBooksData] = useState<BookPage[]>();

  // To-do: create interfaces, plan how to join results to be used for covers and entries

  const fetchBookCoverPages = async () => {
    console.log("Fetching...");
    const { data, error } = await supabase
      .from("book_page")
      .select("*")
      .eq("is_cover", "true");
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setBooksData(data);
    }
    console.log("Fetched.");
  };

  useEffect(() => {
    fetchBookCoverPages();
    console.log(booksData);
  }, []);

  return (
    <div className="home">
      <h3>Popular Books</h3>
      <Covers array={testCoversData} limit={4} />
    </div>
  );
}
