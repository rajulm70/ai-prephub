import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Header = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate(); // useNavigate hook for manual navigation

    const handleLogout = (e) => {
        e.preventDefault(); // Prevent default navigation
        if (window.confirm("Are you sure you want to logout?")) {
            setAuth({
                ...auth,
                user: null,
                token: "",
            });
            localStorage.removeItem("auth");
            toast.success("Logout Successfully");
            navigate("/login"); // Only navigate after successful logout
        }
        // If the user clicks "Cancel," do nothing, and they stay on the same page
    };

    return (
        <>
            {/* Internal CSS for the Header */}
            <style>
                {`
                    .sticky-header {
                        position: sticky;
                        top: 0;
                        z-index: 1000;
                        width: 100%;
                        box-shadow: 0 3px 18px -1px gray; /* Optional: adds shadow for better visibility */
                    }

                    .navbar {
                        background: linear-gradient(45deg, #ae63b3, #b2f78f);
                        // font-weight: 600 !important;
                    }

                    .navbar-brand {
                        color: black;
                        font-weight: 600 ;
                        display: flex;
                        align-items: center;
                    }

                    .navbar-toggler-icon {
                        background-color: white;
                    }

                    .nav-link {
                        color: black !important;
                    }

                    .dropdown-menu {
                        background-color: #3f1f45;
                    }

                    .dropdown-item {
                        color: white;
                    }

                    .dropdown-item:hover {
                        background-color: #a4e7d1;
                    }

                    .icon-user {
                        margin-right: 5px;
                    }
                        /* Change text color of the menu items to black */
                    .navbar-nav .nav-link {
                        color: black !important;
                    }
        }
                `}
            </style>

            <nav className="navbar navbar-expand-lg sticky-header">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img
                            src='https://png.pngtree.com/png-vector/20240208/ourmid/pngtree-artificial-intelligence-brain-graphic-element-png-image_11720064.png'
                            alt="logo"
                            style={{ width: '30px', height: '30px', marginRight: '8px' }}
                        />
                        AI-Mocker
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" aria-current="page">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/category" className="nav-link">Category</NavLink>
                            </li>
                            {!auth?.user ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link">
                                            Register
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link">
                                            Login
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item dropdown">
                                        <navlink className="nav-link dropdown-toggle"
                                            href="#"
                                            id="navbarDropdown"
                                            role="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false">
                                            <i className="fa-solid fa-user-tie icon-user"></i>
                                            {auth?.user?.name}
                                        </navlink>
                                        <div className="dropdown-menu dropdownStyle" aria-labelledby="navbarDropdown">
                                            <li>
                                                <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                                                    }`} className="dropdown-item dropdownStyle1">Dashboard</NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    onClick={handleLogout}
                                                    to="/login"
                                                    className="dropdown-item dropdownStyle1"
                                                >
                                                    Logout
                                                </NavLink>
                                            </li>

                                        </div>
                                    </li>
                                </>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
