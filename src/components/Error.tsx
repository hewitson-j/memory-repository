import { Link } from "react-router-dom";
import "./Error.css";

interface ErrorProps {
  title?: string;
  description?: string;
}

export default function Error({
  title = "404 - Not Found",
  description = "Whoops! It looks like you've come to a non-existing page. Please click the button to return to login.",
}: ErrorProps) {
  return (
    <div className="error">
      <h1>{title}</h1>
      <h2>{description}</h2>
      <Link to={"/"}>
        <button>Return to Login</button>
      </Link>
    </div>
  );
}
