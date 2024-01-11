import { Link } from "react-router-dom";
import "./Copyright.css";

interface CopyrightProps {
  width?: number;
}

export default function Copyright({ width }: CopyrightProps) {
  return (
    <div className="copyright" style={{ width: `${width || "100"}%` }}>
      <hr />
      <p>Copyright © Jacob Hewitson 2023</p>
      <p>
        <Link to={"/terms-of-service"}>
          Terms of Service {`(Last Updated 1/11/2024)`}
        </Link>{" "}
        ||{" "}
        <Link to={"/privacy-policy"}>
          Privacy Policy {`(Last Updated 1/11/2024)`}
        </Link>
      </p>
    </div>
  );
}
