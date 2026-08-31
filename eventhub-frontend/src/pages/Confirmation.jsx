import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

function Confirmation() {
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem('lastOrder');
        if (saved) {
            setOrderData(JSON.parse(saved));
        }
    }, []);

    return (
        <>
           <Navbar/>
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">Confirmation</h1>

            {orderData && (
                <section className="bg-indigo-500 rounded-2xl shadow-lg p-5 mb-5">
                    <h2 className="text-white text-xl font-semibold">{orderData.order.eventTitle}</h2>
                    <p className="text-white">Buyer: {orderData.order.buyerName}</p>
                    <p className="text-white">Email: {orderData.order.buyerEmail}</p>
                    <p className="text-white">Total Paid: #{orderData.order.totalAmount}</p>

                    <h3 className="text-white text-lg font-semibold mt-4 mb-2">Your Tickets</h3>

                    {orderData.tickets.map((ticket) => (
                        <div key={ticket.id} className="bg-white/15 rounded-lg p-3 mb-3 text-center text-white">
                            <p>{ticket.ticketType} — {ticket.ownerName}</p>
                            <p className="text-sm">Ticket ID: {ticket.id}</p>
                            <div className="flex justify-center mt-2">
                                <QRCodeSVG value={ticket.id} size={128} />
                            </div>
                        </div>
                    ))}

                    <Link to="/mytickets">
                        <button className="w-full bg-indigo-700 text-white py-3 rounded-lg font-semibold mt-3">
                            View My Tickets
                        </button>
                    </Link>
                </section>
               
            )}
        </div>
         </>
    );
}

export default Confirmation;