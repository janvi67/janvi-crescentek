import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearAuthData } from './Auth';
import './UserData.css';
import './EmployeesList.css';
import { ToastContainer, toast } from 'react-toastify';
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import Pagination from './Pagination';

function EmployeesList() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const [searchQuery, setSearchQuery] = useState('');

    const handleCreate = () => {
        navigate("/AddEmployee");
    };

    const handleEdit = (id) => {
        navigate(`/EditEmployee/${id}`);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/employee/delete/${id}`, {
                headers: {
                    'Authorization': `${token}`,
                    "ngrok-skip-browser-warning": "69420",
                }
            });

            if (response.status === 200) {
                setData(data.filter(user => user._id !== id));
                toast.success("Employee deleted successfully.", { autoClose: 2000, position: "top-center" });
            } else {
                throw new Error('Failed to delete employee');
            }
        } catch (error) {
            setError(error);
            toast.error("Failed to delete employee.", { autoClose: 2000, position: "top-center" });
        }
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const token = localStorage.getItem('token');
    //         if (!token) {
    //             setError('No token found');
    //             setLoading(false);
    //             return;
    //         }

    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_API_URL}/employee/list`, {
    //                 headers: {
    //                     'Authorization': `${token}`,
    //                     "ngrok-skip-browser-warning": "69420",
    //                 }
    //             });

    //             if (response.status !== 200) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             setData(response.data.data.data);
    //         } catch (error) {
    //             setError(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/employee/list`, {
                    headers: {
                        'Authorization': `${token}`,
                        "ngrok-skip-browser-warning": "69420",
                    },
                    params: {
                        page: searchQuery != ''?1:currentPage,
                        limit: itemsPerPage,
                        search: searchQuery
                    }
                });

                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                setData(response.data.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, itemsPerPage, searchQuery]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

   
    const nPages = Math.ceil(data.total / itemsPerPage);

    return (
        <div>
            <NavBar setSearchQuery={setSearchQuery} />
            <Sidebar>
                <ToastContainer />
                <h1>Employees Data</h1><br></br>
                <div className="btnCreate-container">
                    <button className="btn-create" onClick={handleCreate}>Add</button>
                </div><br></br>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone-No</th>
                            <th>Website</th>
                            <th>Company</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.website}</td>
                                <td>{user.company}</td>
                                <td>
                                    <button className='btn btn-edit' onClick={() => handleEdit(user._id)}>
                                        <AiFillEdit />
                                    </button>
                                    <button className='btn btn-delete' onClick={() => handleDelete(user._id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </Sidebar>
        </div>
    );
}

export default EmployeesList;
