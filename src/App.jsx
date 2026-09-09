// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrowseEvents from "./pages/BrowseEvents";
import EditEvent from "./pages/EditEvent";
import CreateEvent from "./pages/CreateEvent";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyTickets from "./pages/MyTickets";
import ETicket from "./pages/ETicket";
import ScanTicket from "./pages/ScanTicket";
import AboutUs from "./pages/AboutUs";
import TicketCheckout from "./pages/TicketCheckout";
import NotFound from "./pages/NotFound";
import Loading from "./pages/Loading";
import QRScanner from "./components/QRScanner";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";

export default function App() {
  return (
    <div>
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<BrowseEvents />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/edit-event/:eventId" element={<EditEvent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/e-ticket/:id" element={<ETicket />} />
          <Route path="/scan-ticket" element={<ScanTicket />} />
          <Route path="/scan-ticket/:id" element={<ScanTicket />} />
          <Route path="/booking/:eventId" element={<BookingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/:bookingId" element={<PaymentPage />} />
          
          <Route path="/checkout/:eventId" element={<TicketCheckout />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/scan" element={<QRScanner />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}