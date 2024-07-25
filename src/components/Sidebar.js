import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar
} from "react-icons/fa";
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
            path: "/UserData",
            name: "User Data",
            icon: <FaUserAlt />
        },
        {
            path: "/EmployeeList",
            name: "Employee Data",
            icon: <FaRegChartBar />
        }
    ];

    return (
        <div className="containerr">
            <div style={{ width: isOpen ? "240px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</h1>
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
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
