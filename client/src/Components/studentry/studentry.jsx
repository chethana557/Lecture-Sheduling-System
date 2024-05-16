import React, { useState } from "react";
import "./studentryy.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const StudEntry= () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    e.preventDefault();
    Axios.post("http://localhost:3000/api/students/studentry", {
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/lregister");
        }
      })
      .catch((err) => {
        alert("Please enter valid credentials");
        console.log(err);
      });
  };

  return (
    <div  className="sign-up-container">
      <form
        style={{ background: "#FFFGGG" }}
        className="sign-up-form"
        onSubmit={handleSubmit}
      >
        <h2>Login</h2>

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

         <Link to="/timetablee"><button type="submit">Login</button></Link>
        <p>
          Don't have account? <Link to="/studentryreg">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default StudEntry;
