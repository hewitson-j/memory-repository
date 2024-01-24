import { useEffect, useState } from "react";
import supabase from "../supabaseconfig";
import Header from "./Header";
import "./Upload.css";
import { BookProps } from "./Interfaces";

export default function Upload() {
  const [bookTitles, setBookTitles] = useState<BookProps[]>([]);

  const fetchBooks = async () => {
    const { data, error } = await supabase.from("book").select("*");
    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      setBookTitles(data);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="upload">
      <Header />
      <h3>Upload Photo</h3>
      <p>
        Use this form to upload photos you would like to be included in one of
        the albums.
      </p>
      <form>
        <select>
          {bookTitles.map((book) => {
            return (
              <option key={book.id} value={book.title}>
                {book.title}
              </option>
            );
          })}
          <option value={"other"}>Other</option>
        </select>
        <input type="file" />
      </form>
    </div>
  );
}
