import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Browse from "./Browse";
import Book from "./Book";
import Login from "./Login";
import { useAuth } from "./hooks/useAuth";
import Error from "./Error";
import Contact from "./Contact";

export default function Router() {
  const isAuthenticated = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="contact" element={<Contact />} />
      <Route
        path="home"
        element={isAuthenticated ? <Home /> : <Navigate to={"denied"} />}
      />
      <Route
        path="browse"
        element={isAuthenticated ? <Browse /> : <Navigate to={"denied"} />}
      />
      <Route
        path="book/:itemId"
        element={isAuthenticated ? <Book /> : <Navigate to={"denied"} />}
      />
      <Route
        path="denied"
        element={
          <Error
            title="403 - Access Denied"
            description="You are not allowed to access this page. Use the button below to return
        to the login screen and try signing in again."
          />
        }
      />
      <Route path="*" element={<Error isAuthenticated={isAuthenticated} />} />
    </Routes>
  );
}
