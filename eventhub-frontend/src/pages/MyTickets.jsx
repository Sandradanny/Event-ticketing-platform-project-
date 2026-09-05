import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Ticket, TicketX } from 'lucide-react';
import { getAuthToken } from '../utils/auth';

function MyTickets() {
    const [tickets, setTickets] = useState([]);
      useEffect(() => {
    const token = getAuthToken();

    fetch('https://eventmanagerapi-1.onrender.com/api/Booking/my-bookings', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
       })
        .then(res => res.json())
        .then(data => {
            console.log('My bookings:', data);
            setTickets(data);
        })
        .catch(err => console.error('Failed to load tickets:', err));
       }, []);

    return (
        <>
            <Navbar />
            <div className="max-w-xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-[#00bfff] text-center mb-6 flex items-center justify-center gap-2">
                    <Ticket size={28} /> My Tickets
                </h1>

                {tickets.length === 0 && (
                    <p className="text-center text-gray-500 flex items-center justify-center gap-2">
                        <TicketX size={20} /> You haven't purchased any tickets yet.
                    </p>
                )}

                {tickets.map((ticket) => (
                    <div key={ticket.id} className="bg-[#00bfff] rounded-2xl shadow-lg p-5 mb-4 text-center text-white">
                        <p className="flex items-center justify-center gap-2">
                            <Ticket size={18} /> {ticket.eventTitle} - {ticket.ticketType}
                        </p>
                        <p className="text-sm">Ticket ID: {ticket.id}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default MyTickets;