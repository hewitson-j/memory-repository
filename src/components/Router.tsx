import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Browse from "./Browse";
import Book from "./Book";
import Login from "./Login";
import { useAuth } from "./hooks/useAuth";

export default function Router() {
  const isAuthenticated = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="home"
        element={isAuthenticated ? <Home /> : <Navigate to={"/"} />}
      />
      <Route
        path="browse"
        element={isAuthenticated ? <Browse /> : <Navigate to={"/"} />}
      />
      <Route
        path="book/:itemId"
        element={isAuthenticated ? <Book /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
}
