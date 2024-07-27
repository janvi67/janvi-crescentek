import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './UserData.css';
import Sidebar from './Sidebar';
import NavBar from './NavBar';

function UsersData() {
   
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    

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
        <NavBar/>
        <Sidebar>
              
            <h1>Users Data</h1><br></br><br></br>
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

export default UsersData;
