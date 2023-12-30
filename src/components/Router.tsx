import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Browse from "./Browse";
import Book from "./Book";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="browse" element={<Browse />} />
      <Route path="book/:itemId" element={<Book />} />
    </Routes>
  );
}
