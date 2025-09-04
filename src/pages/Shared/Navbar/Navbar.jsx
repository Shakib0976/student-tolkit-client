import { AlarmClock, BookOpenText, CalendarDays, DollarSign, House, Menu, Moon, NotebookPen, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const navLinks = [
        { icon: <House size={18} />, name: "Home", path: "/" },
        { icon: <CalendarDays size={18} />, name: "Schedule", path: "/schedule" },
        { icon: <DollarSign size={18} />, name: "Budget", path: "/budget" },
        { icon: <BookOpenText size={18} />, name: "Quiz", path: "/quiz" },
        { icon: <NotebookPen size={18} />, name: "Planner", path: "/planner" },
        { icon: <AlarmClock size={18} />, name: "Focus Timer", path: "/timer" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY < 50) {
                // At the top
                setShow(true);
            } else if (window.scrollY > lastScrollY) {
                // Scrolling down
                setShow(false);
            } else {
                // Scrolling up
                setShow(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div className={`sticky top-0 z-50 pt-5 max-w-7xl mx-auto transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full"}`}>
            <nav className="bg-white text-black px-6 py-3 shadow-md rounded-2xl transition-all duration-300">
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
                    <div className="hidden lg:flex items-center space-x-6 mx-auto">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className="flex items-center px-4 py-2 rounded-full font-bold hover:text-[#9333ea] transition-all duration-200"
                            >
                                {link.icon && <span className="mr-1">{link.icon}</span>}
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right Side Controls */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <button className="p-2 rounded-full hover:bg-gray-200 transition">
                            <Moon size={20} />
                        </button>
                        <Link
                            to="/login"
                            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow-md transition-all duration-200"
                        >
                            Login
                        </Link>
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
                        <div className="flex items-center justify-between px-4 mt-3">
                            <button className="p-2 rounded-full hover:bg-gray-200">
                                <Moon size={20} />
                            </button>
                            <Link
                                to="/login"
                                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow-md transition-all duration-200"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
