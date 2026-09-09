import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Search, X, Menu, Ticket, User, LogOut } from 'lucide-react'

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Events', path: '/events' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'About Us', path: '/about' },
        { name: 'My Tickets', path: '/my-tickets' },  
    ]
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

   
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsLoggedIn(true)
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setIsLoggedIn(false)
        window.location.href = '/'
    }

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
            isScrolled 
                ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" 
                : "bg-indigo-600 text-white py-4 md:py-6"
        }`}>
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                <Ticket className={`h-6 w-6 ${isScrolled ? "text-indigo-600" : "text-white"}`} />
                <h1 className={`text-xl font-bold ${isScrolled ? "text-indigo-600" : "text-white"}`}>
                    Event<span className="font-light">hub</span>
                </h1>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <Link 
                        key={i} 
                        to={link.path}
                        className={`group flex flex-col gap-0.5 transition-colors ${
                            location.pathname === link.path 
                                ? (isScrolled ? "text-indigo-600" : "text-white font-semibold") 
                                : (isScrolled ? "text-gray-700" : "text-white/90")
                        }`}
                    >
                        {link.name}
                        <div className={`${isScrolled ? "bg-indigo-600" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                            location.pathname === link.path ? "w-full" : ""
                        }`} />
                    </Link>
                ))}
            </div>

            {/* Desktop Right - Auth */}
            <div className="hidden md:flex items-center gap-4">
                
                
                {isLoggedIn ? (
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <User className={`h-5 w-5 ${isScrolled ? "text-gray-700" : "text-white"}`} />
                            <span className={`text-sm ${isScrolled ? "text-gray-700" : "text-white"}`}>
                                {JSON.parse(localStorage.getItem('user') || '{"firstName":"User"}').firstName || 'User'}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-500 ${
                                isScrolled 
                                    ? "text-red-600 hover:text-red-700" 
                                    : "text-white hover:text-red-200"
                            }`}
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="text-sm">Logout</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link 
                            to="/login"
                            className={`px-6 py-2.5 rounded-full transition-all duration-500 ${
                                isScrolled 
                                    ? "text-white bg-indigo-600 hover:bg-indigo-700" 
                                    : "bg-white text-indigo-600 hover:bg-gray-100"
                            }`}
                        >
                            Login
                        </Link>
                        <Link 
                            to="/signup"
                            className={`px-6 py-2.5 rounded-full transition-all duration-500 border ${
                                isScrolled 
                                    ? "border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white" 
                                    : "border-white text-white hover:bg-white hover:text-indigo-600"
                            }`}
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
                <Menu 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className={`h-6 w-6 cursor-pointer transition-colors ${
                        isScrolled ? "text-gray-700" : "text-white"
                    }`} 
                />
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}>
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-6 w-6" />
                </button>

                {navLinks.map((link, i) => (
                    <Link 
                        key={i} 
                        to={link.path} 
                        onClick={() => setIsMenuOpen(false)}
                        className={location.pathname === link.path ? "text-indigo-600" : ""}
                    >
                        {link.name}
                    </Link>
                ))}

                {isLoggedIn ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <User className="h-5 w-5" />
                            <span>
                                {JSON.parse(localStorage.getItem('user') || '{"firstName":"User"}').firstName || 'User'}
                            </span>
                        </div>
                        <button
                            onClick={() => {
                                handleLogout()
                                setIsMenuOpen(false)
                            }}
                            className="flex items-center gap-2 bg-red-500 text-white px-8 py-2.5 rounded-full hover:bg-red-600 transition-all"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3">
                        <Link 
                            to="/login"
                            onClick={() => setIsMenuOpen(false)}
                            className="bg-indigo-600 text-white px-8 py-2.5 rounded-full transition-all duration-500 hover:bg-indigo-700 w-full text-center"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/signup"
                            onClick={() => setIsMenuOpen(false)}
                            className="border border-indigo-600 text-indigo-600 px-8 py-2.5 rounded-full hover:bg-indigo-600 hover:text-white transition-all w-full text-center"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar