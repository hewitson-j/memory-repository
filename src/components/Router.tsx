import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Browse from "./Browse";
import Search from "./Search";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="browse" element={<Browse />} />
      <Route path="search" element={<Search />} />
    </Routes>
  );
}
