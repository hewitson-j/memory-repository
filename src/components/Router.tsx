import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Browse from "./Browse";
import Book from "./Book";
import Login from "./Login";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="browse" element={<Browse />} />
      <Route path="book/:itemId" element={<Book />} />
    </Routes>
  );
}
