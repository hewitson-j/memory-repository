import { useState } from "react";
import "./Login.css";
import supabase from "../supabaseconfig";
import { useNavigate } from "react-router-dom";
import LoginError from "./LoginError";
import Copyright from "./Copyright";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);
  const [areCredentialsBlank, setAreCredentialsBlank] = useState(false);

  const [inputType, setInputType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (username.trim() === "" || password.trim() === "") {
      setAreCredentialsBlank(true);
      return;
    }

    setAreCredentialsBlank(false);
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

  const handleCloseNotification = () => {
    setAreCredentialsBlank(false);
    setIsPasswordIncorrect(false);
  };

  return (
    <>
      <div className="login">
        <div className="login-content">
          <div className="login-header">
            <h1>Hewitson Memory Library</h1>
            <h2>
              A repository for Hewitson family photos, albums, and scrapbooks.
            </h2>
          </div>
          <LoginError
            title="Username or Password Incorrect"
            description="Username or password are incorrect. Please close this notification and try again."
            isOpen={!isPasswordIncorrect}
            handleClose={handleCloseNotification}
          />
          <LoginError
            title="Credentials Blank"
            description="Username and Password cannot be blank. Please fill out both fields and try again."
            isOpen={!areCredentialsBlank}
            handleClose={handleCloseNotification}
          />
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
          <Copyright />
        </div>
      </div>
    </>
  );
}
