import React, { useState } from "react";
import './EntryReg.css';
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const EntryReg = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert("Please fill all the fields");
      return;
    }
    Axios.post("http://localhost:3000/api/users/entryreg", {
      username,
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/users");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sign-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Lecturer Register Form</h2>
        <label htmlFor="username">Lecturer name:</label>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          autoComplete="off"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />

       <button type="submit">Register</button>
        <p>
         
        </p>
      </form>
      
    </div>
  );
};

export default EntryReg;
