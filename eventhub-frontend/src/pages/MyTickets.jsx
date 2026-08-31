import { useState, useEffect } from 'react';
import Navbar from '../Navbar';

function MyTickets() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('allTickets');
        if (saved) {
            setTickets(JSON.parse(saved));
        }
    }, []);

    return (
        <>
          <Navbar/>
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">My Tickets</h1>

            {tickets.length === 0 && (
                <p className="text-center text-gray-500">You haven't purchased any tickets yet.</p>
            )}

            {tickets.map((ticket) => (
                <div key={ticket.id} className="bg-indigo-500 rounded-2xl shadow-lg p-5 mb-4 text-center text-white">
                    <p>{ticket.eventTitle} - {ticket.ticketType}</p>
                    <p className="text-sm">Ticket ID: {ticket.id}</p>
                </div>
            ))}
        </div>
        </>
    );
}

export default MyTickets;