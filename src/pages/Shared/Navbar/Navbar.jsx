import { AlarmClock, BookOpenText, CalendarDays, DollarSign, House, Menu, Moon, NotebookPen, Sun, X } from 'lucide-react';
import React, { useState, useEffect, useContext } from 'react';
import { signOut } from 'firebase/auth';
import { Link, NavLink } from 'react-router';
import { ThemeContext } from '../../../Context/ThemeContext';
import { AuthContext } from '../../../Context/AuthContext';
import { auth } from '../../../Firebase/Firebase.config';
import Swal from 'sweetalert2';

const Navbar = () => {
    // modal open state
    const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    // toggle theme and user context
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user, setUser } = useContext(AuthContext);


//  handle logout
    const logoutUser = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth)
                    .then(() => {
                        console.log("User signed out");
                        localStorage.removeItem('devtalksToken');
                        setUser(null); // Clear user from context
                    })
                    .catch((error) => {
                        console.log("Logout error:", error.message);
                    });
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }
  

    // all navigation links
    const navLinks = [
        { icon: <House size={18} />, name: "Home", path: "/" },
        { icon: <CalendarDays size={18} />, name: "Schedule", path: "/schedule" },
        { icon: <DollarSign size={18} />, name: "Budget", path: "/budget" },
        { icon: <BookOpenText size={18} />, name: "Quiz", path: "/quiz" },
        { icon: <NotebookPen size={18} />, name: "Planner", path: "/planner" },
        { icon: <AlarmClock size={18} />, name: "Focus Timer", path: "/timer" },
    ];

    // handle scroll function

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY < 50) {
                setShow(true);
            } else if (window.scrollY > lastScrollY) {
                setShow(false);
            } else {
                setShow(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div className={`sticky px-5 lg:px-1 top-0 z-50 pt-5 max-w-7xl mx-auto transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full"}`}>
            <nav className="bg-white dark:bg-gray-800 dark:text-gray-200 text-black px-6 py-3 shadow-md rounded-2xl transition-all duration-300">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-1">
                        <img
                            src="https://i.ibb.co/k61dyNH8/Screenshot-2025-09-02-131938-removebg-preview.png"
                            alt="Logo"
                            className="md:h-16 h-10 w-auto"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center space-x-2 mx-auto">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className="flex items-center px-2 py-2 rounded-full font-bold hover:text-[#9333ea] transition-all duration-200"
                            >
                                {link.icon && <span className="mr-1">{link.icon}</span>}
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right Side Controls */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {/* theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                       {/* user img and logout button */}
                        {user ? (
                            <div className="flex items-center space-x-3">
                                {user.photoURL && (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName || "User"}
                                        className="h-10 w-10 rounded-full object-cover border"
                                    />
                                )}
                                <button
                                    onClick={logoutUser}
                                    className=" px-4 py-2 bg-gray-100 hover:bg-gray-200 border-gray-200 rounded-xl border-2 transition-all duration-200"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow-md transition-all duration-200"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {isOpen && (
                    <div className="lg:hidden mt-3 space-y-3 px-3 pb-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="flex items-center px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-200"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.icon && <span className="mr-2">{link.icon}</span>}
                                {link.name}
                            </Link>
                        ))}

                        {/* theme toggle + login/logout */}
                        <div className="flex items-center justify-between px-4 mt-3">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                            >
                                {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            {user ? (
                                <div className="flex items-center space-x-2">
                                    {user.photoURL && (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || "User"}
                                            className="h-8 w-8 rounded-full object-cover border"
                                        />
                                    )}
                                    <span className="text-sm font-semibold">{user.displayName || "User"}</span>
                                    <button
                                        onClick={() => {
                                            logoutUser();
                                            setIsOpen(false);
                                        }}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-md transition-all duration-200"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow-md transition-all duration-200"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
