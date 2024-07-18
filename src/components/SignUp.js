import React from 'react'
import './SignUp.css'

function SignUp() {
  return (
   <div>
    <form className='main'>
        <div className='container'>
        <h1>Register</h1>
    <p>Please fill in this form to create an account.</p>
    <hr/>

    <label for="email"><b>Email</b></label>
    <input type="text"  className="input-2" placeholder="Enter Email" name="email" id="email" required/><br></br>

    <label for="psw"><b>Password&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>
    <input type="password" className="input-2" placeholder="Enter Password" name="psw" id="psw" required/><br></br>

    <label for="psw-repeat"><b>Repeat Password</b></label>
    <input type="password" className="input-3" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required/>
    <hr/>
    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

    <button type="submit" className="registerbtn">Register</button>
       </div>
       <div className="container signin">
    <p>Already have an account?? <a href="#">Sign in</a>.</p>
  </div>
       </form>
  </div>
  )
}

export default SignUp