import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Contacts.css";

function ContactCard({ user, onNextUserClick, onPreviousUserClick }) {

  
  return (
    <div className="card">
      <h1>{user.name}</h1>
      <p>
        Email: <span>{user.email}</span>
      </p>
      <p>
        Phone: <span>{user.phone}</span>
      </p>
      <p>
        Company: <span>{user.company.name}</span>
      </p>
      <p>
        Website: <span>{user.website}</span>
      </p>
      <section>
        <h3>
          <span>{user.address.street} </span>, <span>{user.address.suite}</span>
        </h3>
        <h4>
          {user.address.city}, {user.address.zipcode}
        </h4>
      </section>
      <div>
      <button id = "previous" onClick={onPreviousUserClick}>&lt;</button>

        <button onClick={onNextUserClick}>&gt;</button>
        
      </div>
    </div>
  );
}

function Contacts() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      setCurrentUser(users[0]);
    }
  }, [users]);

  const handlePrevUserClick = () => {
    const currentIndex = users.findIndex((user) => user.id === currentUser.id);
    const prevIndex = (currentIndex - 1 + users.length) % users.length;
    setCurrentUser(users[prevIndex]);
  };

  const handleNextUserClick = () => {
    const currentIndex = users.findIndex((user) => user.id === currentUser.id);
    const nextIndex = (currentIndex + 1) % users.length;
    setCurrentUser(users[nextIndex]);
  };

  return (
    <div className="card-container">
      {currentUser && (
        <ContactCard
          key={currentUser.id}
          user={currentUser}
          onNextUserClick={handleNextUserClick}
          onPreviousUserClick={handlePrevUserClick}
        />
      )}
    </div>
  );
}

export default Contacts;
