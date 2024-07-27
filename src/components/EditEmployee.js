import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import './EditEmployee.css';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [company, setCompany] = useState("");

    useEffect(() => {
        const fetchEmployee = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("Token not found. Please login again.", { autoClose: 2000, position: "top-center" });
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/employee/get-details/${id}`, {
                    headers: {
                        'Authorization': `${token}`,
                        "ngrok-skip-browser-warning": "69420",
                    }
                });

                if (response.status === 200) {
                    const employee = response.data.data;
                    setName(employee.name);
                    setEmail(employee.email);
                    setPhone(employee.phone);
                    setWebsite(employee.website);
                    setCompany(employee.company);
                }
            } catch (error) {
                toast.error("Failed to fetch employee details.", { autoClose: 2000, position: "top-center" });
            }
        };

        fetchEmployee();
    }, [id]);

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Token not found. Please login again.", { autoClose: 2000, position: "top-center" });
            return;
        }

        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/employee/update/${id}`, {
                name,
                email,
                phone,
                website,
                company
            }, {
                headers: {
                    'Authorization': `${token}`,
                    "ngrok-skip-browser-warning": "69420",
                },
            });

            if (response.status === 200) {
                toast.success("Employee updated successfully.", { autoClose: 2000, position: "top-center" });
                setTimeout(() => {
                    navigate("/EmployeesList");
                }, 2000);
            }
        } catch (error) {
            toast.error("Failed to update employee.", { autoClose: 2000, position: "top-center" });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate();
    };

    return (
        <div className="edit-employee-container">
        <NavBar/>
        <Sidebar>
            <ToastContainer />
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit} className="edit-employee-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Website:</label>
                    <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Company:</label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-submitt">Update</button>
                    <button type="button" className="btn-cancel" onClick={() => navigate("/EmployeeList")}>Cancel</button>
                </div>
            </form>
            </Sidebar>
        </div>
    );
}

export default EditEmployee;
