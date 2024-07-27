import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {
    FaTh,
    FaBars,
    FaUsers,
    FaRegChartBar
} from "react-icons/fa";
import { PiUserListFill } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const menuItem = [
        {
            path: "/",
            name: "Home",
            icon: <FaTh />
        },
        {
            path: "/UsersData",
            name: "Users Data",
            icon: <FaUsers />
        },
        {
            path: "/EmployeesList",
            name: "Employee Data",
            icon: <PiUserListFill />
        }
    ];

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
                  
                    const userData = response.data.data; 
                    if (userData && userData.first_name) {
                        setFirstname(userData.first_name);
                       
                    } else {
                        console.error('First name not found in response', userData);
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

    return (
        <div className="">
            <div style={{ width: isOpen ? "240px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">{first_name}</h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeClassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main >{children}</main>
        </div>
    );
};

export default Sidebar;
