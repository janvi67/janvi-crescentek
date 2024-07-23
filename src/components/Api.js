import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Api() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('login');
        localStorage.removeItem('token');
        navigate('/Login');
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.post('http://0f2a-2402-a00-192-1840-24d9-cb9f-ea0c-e56.ngrok-free.app/user/login', {
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                        
                    }
                  
                });
                console.log("api data",response.data)
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
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
            <h1>API Data</h1>
            <pre>{JSON.stringify(data, 2)}</pre>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Api;
