import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <div>
        <div className="login-header">
          <h1>Memory Library</h1>
          <h2>
            A repository for Hewitson and Roberg family photos and scrapbooks.
          </h2>
        </div>
        <label className="login-labels" htmlFor="username-field">
          Username:
        </label>
        <input
          type="text"
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
          type="password"
          placeholder={"Password"}
          id="password-field"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={() => {
            console.log(username, password);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
