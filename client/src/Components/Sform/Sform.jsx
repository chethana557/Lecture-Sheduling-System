import React from "react";
import { Button, Form } from "react-bootstrap";
import './Sform.css'

function Sform() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    console.log("Email:", email);
    console.log("Password:", password);
    // Handle form submission logic here
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
   <div className="container2">
   <Form style={{ width: "20%", margin: "auto", marginTop: "150px", padding:" 120px 20px", backgroundColor:"yellow"}} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <p>Student Login</p>
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} className="mb-2" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} className="mb-2" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
     
        
      </Form.Group>

      <Button variant="primary" type="submit" className="mb-3">
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default Sform;