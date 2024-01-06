import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          <input
            form="login-form"
            type="password"
            placeholder={"Password"}
            id="password-field"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            form="login-form"
            className="login-buttons"
            type="submit"
            onClick={() => {
              console.log(username, password);
            }}
          >
            Submit
          </button>
        </form>
        <div className="sign-up">
          <h3>Don't have an account?</h3>
          <button className="login-buttons">Sign up!</button>
        </div>
      </div>
    </div>
  );
}
