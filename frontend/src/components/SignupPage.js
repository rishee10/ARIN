import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", { email, password });
      alert("Signup successful! Please log in.");
      navigate("/");
    } catch (err) {
      alert("Signup failed.");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/>
        <button type="submit">Signup</button>
      </form>
      <p onClick={() => navigate("/")}>Already have an account? Log in</p>
    </div>
  );
}

export default SignupPage;
