import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { setAuthData, getAuthData, clearAuthData } from "./Auth";  // Adjust the import path as needed

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const authData = getAuthData();
    if (authData.email) {
      setEmail(authData.email);
      setRememberMe(true);
    }
  }, []);

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {
        email,
        password,
      });
      console.log("Login success:", response.data);

      if (response.data) {
        const token = response.data.data.token;
        setAuthData(token, email, rememberMe);

        toast.success("Login Successful", { autoClose: 2000, position: "top-center" });
        setTimeout(() => {
          navigate("/UserData");
        }, 4000);
      } else {
        toast.error("Login failed", { autoClose: 2000 });
      }
    } catch (error) {
      setError("Login failed");
      toast.error("Login failed", { autoClose: 2000, position: "top-center" });
      console.error("Login error:", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      <ToastContainer />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <label htmlFor="uname">
            <b>Email</b>
            <input
              type="email"
              placeholder="Enter Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="psw">
            <b>Password</b>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <center>
            <button type="submit" className="login-button">
              Login
            </button>
          </center>
          <br />

          {error && <p className="error">{error}</p>}
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleCheckboxChange}
              name="remember"
            />{" "}
            Remember me
          </label>
          <div className="login-footer">
            <button type="button" className="cancelbtn" onClick={handleCancel}>
              Cancel
            </button>
            <span className="psw">
              Forgot <a href="#">password?</a>
            </span>
          </div>
          <div>
            <br />
            <br />
            <center>
              Don't have an account?&nbsp;&nbsp;<a href="/Register">Register here</a>
            </center>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
