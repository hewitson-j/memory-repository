import { FormEvent, useState } from "react";
import "./Contact.css";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationFontColor, setNotificationFontColor] = useState("#991212");
  const [notificationBackgroundColor, setNotificationBackgroundColor] =
    useState("#d18282");
  const [isSuccess, setIsSuccess] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notification, setNotification] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;

    if (name === "" || request === "" || email === "") {
      setNotification("Missing Information");
      setNotificationMessage(
        "Name, Email, and Request Type are mandatory. Please fill out the form completely."
      );
      setIsNotificationOpen(true);
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
        setIsSuccess(true);
        setIsNotificationOpen(true);
        setNotificationBackgroundColor("#78fa85");
        setNotificationFontColor("#17661f");
        setNotification("Success!");
        setNotificationMessage(
          "Email sent successfully! We'll get back to you as soon as possible. You will be redirected to the login screen now."
        );
        setTimeout(() => {
          navigate("/");
        }, 5000);
      })
      .catch((reason) => {
        console.log(reason);
        setIsNotificationOpen(true);
        setNotification("Something went wrong :(");
        setNotificationMessage(
          "Whoops! Something went wrong. Please close this window and try again."
        );
      });
  };

  return (
    <div className="contact">
      <h1>Contact Form</h1>
      <p>
        Use this to get in contact with the site admin to create or recover an
        account.
      </p>
      {isNotificationOpen ? (
        <div
          className="result-message"
          style={{
            color: `${notificationFontColor}`,
            backgroundColor: `${notificationBackgroundColor}`,
            width: "50%",
            margin: "auto",
            marginBottom: "1rem",
            border: `2px solid ${notificationFontColor}`,
            borderRadius: `10px`,
            padding: `1rem`,
          }}
        >
          <h3>{notification}</h3>
          <p>{notificationMessage}</p>
          {isSuccess ? (
            <></>
          ) : (
            <button
              onClick={() => {
                setIsNotificationOpen(false);
              }}
              style={{
                fontFamily:
                  "'Dancing Script', cursive, 'Times New Roman', serif",
                color: "white",
                backgroundColor: `${notificationFontColor}`,
                borderRadius: "10px",
                padding: ".5rem",
                border: "none",
              }}
            >
              Close
            </button>
          )}
        </div>
      ) : (
        <></>
      )}
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
