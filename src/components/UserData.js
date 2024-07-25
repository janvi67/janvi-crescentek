import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearAuthData } from './Auth';
import './UserData.css';
import Sidebar from './Sidebar';

function UserData() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('login');
        localStorage.removeItem('token');
        clearAuthData();
        navigate('/Login');
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/list`, {
                    headers: {
                       
                        'Authorization': `${token}`,
                        "ngrok-skip-browser-warning": "69420",
                    }
                });
            

                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                setData(response.data.data.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        
        <div>
        <Sidebar>
              <div className="logout-container">
                <button className="logout" onClick={handleLogout}>Logout</button>
            </div>
            <h1>User Data</h1><br></br><br></br>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((user)=>(
                        <tr key={user.id}>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </Sidebar>
        </div>
    );
}

export default UserData;
