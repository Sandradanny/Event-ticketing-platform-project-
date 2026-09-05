import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import { CheckCircle, User, Mail, Wallet, Ticket } from 'lucide-react';

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
            <h1 className="text-3xl font-bold text-[#00bfff] text-center mb-6">Confirmation</h1>

            {orderData && (
                <section className="bg-[#00bfff] rounded-2xl shadow-lg p-5 mb-5">
                    <h2 className="text-white text-xl font-semibold flex items-center gap-2">
                        <CheckCircle size={22} /> {orderData.order.eventTitle}
                    </h2>
                    <p className="text-white flex items-center gap-2">
                        <User size={16} /> Buyer: {orderData.order.buyerName}
                    </p>
                    <p className="text-white flex items-center gap-2">
                        <Mail size={16} /> Email: {orderData.order.buyerEmail}
                    </p>
                    <p className="text-white flex items-center gap-2">
                        <Wallet size={16} /> Total Paid: #{orderData.order.totalAmount}
                    </p>

                    <h3 className="text-white text-lg font-semibold mt-4 mb-2 flex items-center gap-2">
                        <Ticket size={20} /> Your Tickets
                    </h3>

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
                        <button className="w-full bg-[#0099cc] text-white py-3 rounded-lg font-semibold mt-3">
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