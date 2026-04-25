import { useState } from "react";
import axios from "axios";
import ContactInfo from "./ContactInfo";
import "./App.css";

function App() {
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/contact", {
      phone: newPhone,
      email: newEmail
    })
    .then(response => {
      console.log("Contact added:", response.data);
      setNewPhone("");
      setNewEmail("");
      // Refresh list in ContactInfo by window.location.reload or use shared state/context
      window.location.reload();
    })
    .catch(error => {
      console.error("Error adding contact:", error);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + Spring Boot Fullstack App (Improved)</h1>
        <ContactInfo />
        <form onSubmit={handleSubmit}>
          <h3>Add New Contact</h3>
          <input
            type="tel"
            placeholder="Phone"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
          <button type="submit">Add Contact</button>
        </form>
      </header>
    </div>
  );
}

export default App;
