import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(' http://0f2a-2402-a00-192-1840-24d9-cb9f-ea0c-e56.ngrok-free.app/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {

                localStorage.setItem('token', data.token);
                localStorage.setItem('login', 'true');
                console.log('Token received:', data.token);  
                navigate('/Api');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Login failed');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('login')) {
            navigate('/Api');
        }
    }, [navigate]);

    return (
        <div>
          
            {/* <input
                type="email"
                placeholder="Username"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
            /><br />
            <input
                type="password"
                placeholder="Password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
            /><br />
            <button >Login</button>
            {error && <p>{error}</p>} */}
            <div className="login-container">
            <form className="login-form" >
                <h1>Login</h1>
                <label htmlFor="uname"><b>Username</b>
                <input
                    type="email"
                    placeholder="Enter Username"
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
                    required
                /></label>
                <label htmlFor="psw"><b>Password</b>
                <input
                    type="password"
                    placeholder="Enter Password"
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)}
                    required
                /></label>
                <button type="submit" className='login-button'>Login</button>
              
                <label>
                    <input type="checkbox" name="remember" /> Remember me
                </label>
                <div className="login-footer">
                    <button type="button" className="cancelbtn">Cancel</button>
                    <span className="psw">Forgot <a href="#">password?</a></span>
                </div>
            </form>
        </div>
            
        </div>
    );
}

export default Login;
