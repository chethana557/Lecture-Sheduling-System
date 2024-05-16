import React, { useState } from "react";
import logolmp2 from "../../assets/pictures/Icons/Forgot.png";
import "./Login.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [selects, setSelects] = useState("Admin");

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const response = await Axios.post(
      "http://localhost:3000/api/students/studentry",
      {
        username: username,
        password: password,
      }
    );
    if (response.data.status) {
      navigate("/resetpassword");
    } else {
      const response = await Axios.post(
        "http://localhost:3000/api/users/entry",
        {
          username: username,
          password: password,
        }
      );
      if (response.data.lecStatus) {
        navigate("/resetpassword");
      } else {
        if (username === "admin" && password === "admin") {
          navigate("/resetpassword");
        } else {
          alert("Invalid username or password");
        }
      }
    }
  };

  return (
    <div className="Login_BG">
      <div className="login-container">
        <form className="login-form">
          <div className="right2">
            <img src={logolmp2} alt="React" className="logo" />
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <h2 align="center">Forgot Password</h2>
            <form className="form-divider"></form>
            {/* 
        <label htmlFor="selects">Select the Type:</label>
        <select value={selects} onChange={(e) => setSelects(e.target.value)}>
          <option value={"Admin"}>Admin</option>
          <option value={"Lecturer"}>Lecturer</option>
          <option value={"Student"}>Student</option>
        </select>
        */}

            <h3>
              <label htmlFor="username">Username:</label>
            </h3>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <h3>
              <label htmlFor="password">Email:</label>
            </h3>
            <input
              type="email"
              placeholder="abc@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p></p>
            <h2 class="buttonL button3" onClick={handleSubmit}>
              Login
            </h2>
            {/* <Link to="/resetPassword">
              <h4>Forgot Password?</h4>
            </Link>
            <h4>
              Don't have Account? <Link to="/signup">Sign Up</Link>
            </h4> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
