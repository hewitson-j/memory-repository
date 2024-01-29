import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Browse from "./Browse";
import Book from "./Book";
import Login from "./Login";
import { useAuth } from "./hooks/useAuth";
import Message from "./Message";
import Contact from "./Contact";
import TermsOfService from "./TermsOfService";
import PrivacyPolicy from "./PrivacyPolicy";
import Upload from "./Upload";

export default function Router() {
  const isAuthenticated = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="contact" element={<Contact />} />
      <Route
        path="home"
        element={isAuthenticated ? <Home /> : <Navigate to={"/denied"} />}
      />
      <Route
        path="browse"
        element={isAuthenticated ? <Browse /> : <Navigate to={"/denied"} />}
      />
      <Route
        path="upload"
        element={isAuthenticated ? <Upload /> : <Navigate to={"/denied"} />}
      />
      <Route
        path="upload/success"
        element={
          isAuthenticated ? (
            <Message
              title="Success!"
              description="Your photo has been received. Our administrators will determine if the photo requirements and display it as soon as possible."
              isAuthenticated={isAuthenticated}
            />
          ) : (
            <Navigate to={"/denied"} />
          )
        }
      />
      <Route
        path="book/:itemId"
        element={isAuthenticated ? <Book /> : <Navigate to={"/denied"} />}
      />
      <Route path="terms-of-service" element={<TermsOfService />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route
        path="denied"
        element={
          <Message
            title="403 - Access Denied"
            description="You are not allowed to access this page. Use the button below to return
        to the login screen and try signing in again."
          />
        }
      />
      <Route path="*" element={<Message isAuthenticated={isAuthenticated} />} />
    </Routes>
  );
}
