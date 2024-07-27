import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import { clearAuthData } from './Auth';

function NavBar({ setSearchQuery }) {
    const navigate = useNavigate();
    const [first_name, setFirstname] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/details`, {
                    headers: {
                        'Authorization': `${token}`,
                        "ngrok-skip-browser-warning": "69420",
                    }
                });

                if (response.status === 200) {
                    const userData = response.data.data; // Assuming `data` holds the user information
                    if (userData && userData.first_name) {
                        setFirstname(userData.first_name);
                    } else {
                        console.error('First name not found in response', response.data);
                    }
                } else {
                    console.error('Failed to fetch username, status:', response.status);
                }
            } catch (error) {
                console.error('Failed to fetch username', error);
            }
        };

        fetchUsername();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('login');
        localStorage.removeItem('token');
        clearAuthData();
        navigate('/Login');
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <nav className="navbar">
            <div className="container-1">
                
                    <div className="welcome-message">
                        Welcome {first_name}
                    </div>
                  
                  
                    <div className="logout-container">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={handleSearchChange}
                        />
                        <button className="logout" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
