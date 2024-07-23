import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setTermsAccepted(e.target.checked);
    if (e.target.checked) {
      setError('');
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://0f2a-2402-a00-192-1840-24d9-cb9f-ea0c-e56.ngrok-free.app/user/create', {
       first_name,
        last_name,
        email,
        password},{
          headers:{
          
            "ngrok-skip-browser-warning": "69420",
          },
      });
      console.log("response",response.data)
      
      if (response.data) {
        navigate('/login');
      }
    } catch (err) {
      setError('Signup failed');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError('You must agree to the terms and conditions.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    handleSignUp();
  };

  return (
    <div>
      <form className='main' onSubmit={handleSubmit}>
        <div className='container'>
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          <label htmlFor="first_name">
            <b>First Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
            <input type="text" className="input-2" placeholder="Enter First Name" name="first_name" id="first_name" value={first_name} onChange={(e) => setFirstname(e.target.value)} required />
            <br />
          </label>
          
          <label htmlFor="last_name">
            <b>Last Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
            <input type="text" className="input-2" placeholder="Enter Last Name" name="last_name" id="last_name" value={last_name} onChange={(e) => setLastName(e.target.value)} required />
            <br />
          </label>

          <label htmlFor="email">
            <b>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
            <input type="email" className="input-2" placeholder="Enter Email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <br />
          </label>

          <label htmlFor="password">
            <b>Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
            <input type="password" className="input-2" placeholder="Enter Password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <br />
          </label>

          <label htmlFor="confirmPassword">
            <b>Confirm Password</b>
            <input type="password" className="input-3" placeholder="Repeat Password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </label>
          <hr />
          <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
          <input type="checkbox" name="terms" id="terms" onChange={handleCheckboxChange} /> I Agree to the <a href="#">Terms & Privacy</a>
          <br /><br />

          <button type="submit" className="registerbtn">Register</button>
          {error && <p className="error">{error}</p>}
        </div>
        <div className="container signin">
          <p>Already have an account? <a href="Login">Sign in</a>.</p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
