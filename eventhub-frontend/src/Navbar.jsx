import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">EventHub</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/event/1">Details</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
         <Link to="/checkout">Checkout</Link>
        <Link to="/mytickets">My Tickets</Link>
        <Link to="/createevent">Create Event</Link>
      </div>
    </nav>
  );
}