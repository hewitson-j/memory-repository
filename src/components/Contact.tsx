import { FormEvent, useState } from "react";
import "./Contact.css";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;

    if (name === "" || request === "" || email === "") {
      alert("Name, Email, and Request Type are mandatory. Please fill out.");
      return;
    }

    emailjs
      .sendForm(
        "service_usm4a2p",
        "template_vx1w7ka",
        formElement,
        "MzC34H6jATWVbmly-"
      )
      .then((result) => {
        console.log(result);
        alert("Success!");
        navigate("/");
      });
  };

  return (
    <div className="contact">
      <h1>Contact Form</h1>
      <p>
        Use this to get in contact with the site admin to create or recover an
        account.
      </p>
      <form id="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="contact-name">Full Name</label>
        <input
          type="text"
          id="contact-name"
          name="name"
          placeholder="Name (required)"
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <label htmlFor="contact-email">Email</label>
        <input
          type="text"
          id="contact-email"
          name="email"
          placeholder="Email (required)"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <label htmlFor="request-select">Request Type:</label>
        <select
          onChange={(e) => {
            setRequest(e.target.value);
          }}
          name="request"
          id="request-select"
          required
          defaultValue={"default"}
        >
          <option value={"default"} disabled hidden>
            {`Select option (required)`}
          </option>
          <option value={"New Account"}>New Account</option>
          <option value={"Recover Account"}>Recover Account</option>
          <option value="Add Photos/New Album">Add Photos/New Album</option>
        </select>
        <label htmlFor="form-text">Message:</label>
        <textarea
          id="form-text"
          placeholder="Message (optional)"
          name="message"
        />
        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}