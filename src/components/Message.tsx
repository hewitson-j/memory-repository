import { Link } from "react-router-dom";
import "./Message.css";

interface ErrorProps {
  title?: string;
  description?: string;
  isAuthenticated?: boolean;
}

export default function Message({
  title = "404 - Not Found",
  description = "Whoops! It looks like you've come to a non-existing page. Please click the button below to return.",
  isAuthenticated,
}: ErrorProps) {
  return (
    <div className="message">
      <h1>{title}</h1>
      <h2>{description}</h2>
      {isAuthenticated ? (
        <Link to={"/home"}>
          <button>Home</button>
        </Link>
      ) : (
        <Link to={"/"}>
          <button>Return to Login</button>
        </Link>
      )}
    </div>
  );
}
