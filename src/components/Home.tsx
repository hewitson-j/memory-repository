import { useEffect, useState } from "react";
import supabase from "../supabaseconfig";
import Covers from "./Covers";
import "./Home.css";
import { BookPage, BookProps, CoverProps } from "./Interfaces";
import Header from "./Header";
import Copyright from "./Copyright";

export default function Home() {
  const [coversData, setCoversData] = useState<BookPage[]>();
  const [booksData, setBooksData] = useState<BookProps[]>();
  const [combinedData, setCombinedData] = useState<CoverProps[]>();

  const [isLoading, setIsLoading] = useState(true);

  const fetchBookImageUrl = async (imagePathName: string) => {
    const { data, error } = await supabase.storage
      .from("images")
      .download(imagePathName);

    if (error) {
      console.log("Error: " + error);
      return null;
    }
    return URL.createObjectURL(data);
  };

  const fetchBookCoverPages = async () => {
    console.log("Fetching book cover pages...");
    const { data, error } = await supabase
      .from("book_page")
      .select("*")
      .eq("is_cover", "true");
    if (error) {
      console.error("Error fetching data:", error);
    }

    if (data) {
      const coversWithImages = await Promise.all(
        data.map(async (page) => {
          const imageUrl = await fetchBookImageUrl(`covers/` + page.image_name);
          return { ...page, image_url: imageUrl };
        })
      );

      setCoversData(coversWithImages);
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
      <div className="home">
        <h2>Welcome!</h2>
        <p>
          Here you can take a look at some of our popular memory books and photo
          albums.
        </p>
        {isLoading ? (
          <h3 className="loading-notifications">Loading popular books...</h3>
        ) : (
          <>
            <h3>Popular Books</h3>
            <Covers array={combinedData || []} limit={4} />
          </>
        )}
      </div>
      <Copyright width={50} />
    </>
  );
}
