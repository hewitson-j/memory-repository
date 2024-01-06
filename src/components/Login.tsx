import { useState } from "react";
import "./Login.css";
import supabase from "../supabaseconfig";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });
    if (error) {
      alert("Error: " + error);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alert(`Welcome ${data.user.email}!`);
      navigate("home");
    }
  };

  return (
    <div className="login">
      <div className="login-content">
        <div className="login-header">
          <h1>Memory Library</h1>
          <h2>
            A repository for Hewitson and Roberg family photos and scrapbooks.
          </h2>
        </div>
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
          <h3>Don't have an account?</h3>
          <button
            className="login-buttons"
            onClick={() => {
              window.location.href = "mailto:jacob.a.hewitson@gmail.com";
            }}
          >
            Sign up!
          </button>
        </div>
      </div>
    </div>
  );
}
