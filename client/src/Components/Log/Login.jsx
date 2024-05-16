import React, { useState } from "react";
import logolmp2 from "../../assets/pictures/Icons/Login.png";
import "./Login.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [selects, setSelects] = useState("Admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      const response = await Axios.post(
        "http://localhost:3000/api/students/studentry",
        {
          username: username,
          password: password,
        }
      );
      if (response.data.status) {
        navigate("/students");
      } else {
        const response = await Axios.post(
          "http://localhost:3000/api/users/entry",
          {
            username: username,
            password: password,
          }
        );
        if (response.data.lecStatus) {
          navigate("/timetable");
        } else {
          if (username === "admin" && password === "admin") {
            navigate("/Lregister");
          } else {
            setErrorMessage("Invalid username or password");
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="Login_BG">
      <div className="login-container">
        <form className="login-form">
          <div className="left2">
            <img src={logolmp2} alt="React" className="logo" />
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <h2 align="center">Login Portal</h2>
            <form className="form-divider"></form>
            {/* 
        <label htmlFor="selects">Select the Type:</label>
        <select value={selects} onChange={(e) => setSelects(e.target.value)}>
          <option value={"Admin"}>Admin</option>
          <option value={"Lecturer"}>Lecturer</option>
          <option value={"Student"}>Student</option>
        </select>
        */}

            <h3 className="Username">
              <label htmlFor="username">Username:</label>
            </h3>

            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <h3>
              <label htmlFor="password">Password:</label>
            </h3>
            <input
              type="password"
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <p></p>
          <h2 className="buttonL button1" onClick={handleSubmit}>
            Login
          </h2>
          <Link to="/studentry">
            <h4>If you are a Student?</h4>
          </Link>
          {/* <h4>
              Don't have Account? <Link to="/signup">Sign Up</Link>
            </h4> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
