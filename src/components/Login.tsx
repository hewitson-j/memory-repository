import { useState } from "react";
import "./Login.css";
import supabase from "../supabaseconfig";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);

  const [inputType, setInputType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (username.trim() === "" || password.trim() === "") {
      alert(
        "Username and password cannot be blank. \n\nPlease type in both username and password."
      );
      return;
    }

    setIsPasswordIncorrect(false);
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });
    if (error) {
      if (error.message.toUpperCase() === "INVALID LOGIN CREDENTIALS") {
        setIsPasswordIncorrect(true);
      }

      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.log(`${data.user.email} signed in.`);
      navigate("home");
    }
  };

  return (
    <div className="login">
      <div className="login-content">
        <div className="login-header">
          <h1>Hewitson Memory Library</h1>
          <h2>
            A repository for Hewitson family photos, albums, and scrapbooks.
          </h2>
        </div>
        {!isPasswordIncorrect ? (
          <></>
        ) : (
          <div className="login-error-notification">
            <h3>Login Error</h3>
            <p>
              Username or password is incorrect. Please try logging in again.
            </p>
            <button
              className="login-buttons"
              onClick={() => {
                setIsPasswordIncorrect(false);
              }}
            >
              Close
            </button>
          </div>
        )}
        <form className="login-form">
          <label className="login-labels" htmlFor="username-field">
            Username:
          </label>
          <input
            type="text"
            form="login-form"
            placeholder={"Email Address"}
            id="username-field"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label className="login-labels" htmlFor="password-field">
            Password:
          </label>
          <div className="password-container">
            <input
              form="login-form"
              type={inputType}
              placeholder={"Password"}
              id="password-field"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              className="login-buttons"
              onClick={(e) => {
                e.preventDefault();
                inputType === "password"
                  ? setInputType("text")
                  : setInputType("password");
              }}
            >
              {inputType === "password" ? "Show Password" : "Hide Password"}
            </button>
          </div>
          <button
            form="login-form"
            className="login-buttons"
            type="submit"
            onClick={handleSignIn}
          >
            {isLoading ? "Signing in..." : "Submit"}
          </button>
        </form>

        <div className="sign-up">
          <h3>Don't have an account or forgot your password?</h3>
          <button
            className="login-buttons"
            onClick={() => {
              navigate("contact");
            }}
          >
            Contact Admin!
          </button>
        </div>
      </div>
    </div>
  );
}
