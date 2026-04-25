import axios from "axios";
import { useEffect, useState } from "react";

function ContactInfo() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/contacts")
      .then(response => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching contacts:", error);
        setError("Failed to load contacts");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading contacts...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h2>Contact List</h2>
      {contacts.map((contact, index) => (
        <div key={contact.phone || index}>
          <p>Phone: {contact.phone}</p>
          <p>Email: {contact.email}</p>
        </div>
      ))}
    </div>
  );
}

export default ContactInfo;
