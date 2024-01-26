import { useEffect, useState } from "react";
import supabase from "../supabaseconfig";
import Header from "./Header";
import "./Upload.css";
import { BookProps } from "./Interfaces";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [bookTitles, setBookTitles] = useState<BookProps[]>([]);
  const [bookName, setBookName] = useState("other");
  const [imageName, setImageName] = useState("");
  const [newBookName, setNewBookName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const navigate = useNavigate();

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

  const handleUploadFile = async () => {
    setIsSubmitDisabled(true);
    if (bookName.trim() === "" && newBookName.trim() === "") {
      alert(
        "Please make sure you have a book selected. If you chose other, please ensure you add the name of the new book."
      );
      setIsSubmitDisabled(false);
      return;
    }
    if (file === null) {
      alert("Image file required. Please upload.");
      setIsSubmitDisabled(false);
      return;
    }

    const selectedBook = newBookName === "" ? bookName : newBookName;

    if (file) {
      const { data, error } = await supabase.storage
        .from("image_uploads")
        .upload(`${selectedBook}/${imageName}`, file, {
          contentType: "image/*",
        });
      if (error) {
        console.log(error);
        alert("Something went wrong, please try again later.");
      } else {
        console.log(data);
        navigate("/upload/success");
      }
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
      <form className="upload-form">
        <label htmlFor="upload-image-name">Image Name</label>
        <input
          type="text"
          id="upload-image-name"
          onChange={(e) => {
            setImageName(e.target.value);
          }}
        />
        <label htmlFor="upload-select">Book</label>
        <select
          id="upload-select"
          onChange={(e) => {
            setBookName(e.target.value);
          }}
        >
          {bookTitles.map((book) => {
            return (
              <option key={book.id} value={book.title}>
                {book.title}
              </option>
            );
          })}
          <option value={"other"} selected>
            Other
          </option>
        </select>
        {bookName !== "other" ? (
          <></>
        ) : (
          <>
            <label htmlFor="upload-new-book">New Book Name</label>
            <input
              type="text"
              id="upload-new-book"
              onChange={(e) => {
                setNewBookName(e.target.value);
              }}
            />
          </>
        )}
        <input
          type="file"
          id="upload-file-input"
          accept="image/*"
          onChange={(e) => {
            const uploadedFile = e.target.files?.[0];
            if (uploadedFile) {
              setFile(uploadedFile);
            }
          }}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleUploadFile();
          }}
          disabled={isSubmitDisabled}
          id="upload-form-submit-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
