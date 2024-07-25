import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import './AddEmployee.css'; // Import the CSS file

function AddEmployee({ onCancel }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [company, setCompany] = useState("");

    const navigate = useNavigate();

    const handleCreateEmployee = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/employee/create`, {
                name,
                email,
                phone,
                website,
                company
            },
            {
                headers: {
                    Authorization: `${token}`
                }
            });
            console.log("response", response.data);

            if (response.data) {
                toast.success("Employee creation successful", { autoClose: 2000, position: "top-center" });
                setTimeout(() => {
                    navigate("/EmployeeList"); 
                }, 2000); 
            }
        } catch (err) {
            toast.error("Employee creation failed", { autoClose: 2000, position: "top-center" });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateEmployee(); 
    };

    return (
        <div className="add-employee-container">
            <ToastContainer />
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit} className="add-employee-form">
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
                    <button type="submit" className="btn-submit">Submit</button>
                    <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AddEmployee;
