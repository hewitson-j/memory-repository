import "./LoginError.css";

interface LoginErrorProps {
  title: string;
  description: string;
  isOpen: boolean;
  handleClose: () => void;
}

export default function LoginError({
  title,
  description,
  isOpen,
  handleClose,
}: LoginErrorProps) {
  return (
    <>
      {isOpen ? (
        <></>
      ) : (
        <div className="login-error">
          <h3>{title || "Login Error"}</h3>
          <p>
            {description ||
              "An error occurred. Close this notification and try again."}
          </p>
          <button className="login-buttons" onClick={handleClose}>
            Close
          </button>
        </div>
      )}
    </>
  );
}
