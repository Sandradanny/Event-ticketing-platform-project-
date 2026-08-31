import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

function CheckOut() {
    const [ticketSelections, setTicketSelections] = useState({
        general: 0,
        vip: 0
    })

    const [buyerInfo, setBuyerInfo] = useState({
        name: '',
        email: ''
    })

    const [status, setStatus] = useState('idle');
    const [errors, setErrors] = useState({});

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const navigate = useNavigate();

    function increment(ticketType) {
        setTicketSelections(prev => ({
            ...prev,
            [ticketType]: prev[ticketType] + 1
        }));
    }

    function decrement(ticketType) {
        setTicketSelections(prev => ({
            ...prev,
            [ticketType]: Math.max(0, prev[ticketType] - 1)
        }));
    }

    function handleBuyerInfoChange(field, value) {
        setBuyerInfo(prev => ({
            ...prev,
            [field]: value
        }));
    }

    function handlePaymentInfoChange(field, value) {
        setPaymentInfo(prev => ({
            ...prev,
            [field]: value
        }));
    }

    function handleSubmit() {
        const newErrors = {};
        if (!buyerInfo.name) newErrors.name = true;
        if (!buyerInfo.email) newErrors.email = true;
        if (!paymentInfo.cardNumber) newErrors.cardNumber = true;
        if (!paymentInfo.expiry) newErrors.expiry = true;
        if (!paymentInfo.cvv) newErrors.cvv = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setStatus('processing');

        setTimeout(() => {
            const order = {
                id: 'ord_' + Date.now(),
                eventTitle: 'Afrobeats Night',
                buyerName: buyerInfo.name,
                buyerEmail: buyerInfo.email,
                items: [
                    { type: 'General', quantity: ticketSelections.general, unitPrice: generalPrice },
                    { type: 'VIP', quantity: ticketSelections.vip, unitPrice: vipPrice }
                ],
                totalAmount: total,
                createdAt: new Date().toISOString()
            };

            const tickets = [];

            for (let i = 0; i < ticketSelections.general; i++) {
                tickets.push({
                    id: 'tkt_' + Date.now() + '_gen_' + i,
                    eventTitle: 'Afrobeats Night',
                    ticketType: 'General',
                    ownerName: buyerInfo.name,
                    orderId: order.id
                });
            }
            for (let i = 0; i < ticketSelections.vip; i++) {
                tickets.push({
                    id: 'tkt_' + Date.now() + '_vip_' + i,
                    eventTitle: 'Afrobeats Night',
                    ticketType: 'VIP',
                    ownerName: buyerInfo.name,
                    orderId: order.id
                });
            }

            localStorage.setItem('lastOrder', JSON.stringify({ order, tickets }));
            const existingTickets = JSON.parse(localStorage.getItem('allTickets') || '[]');
            const updatedTickets = [...existingTickets, ...tickets];
            localStorage.setItem('allTickets', JSON.stringify(updatedTickets));

            navigate('/confirmation');
        }, 2000);
    }

    const generalPrice = 5000;
    const vipPrice = 15000;
    const total = (ticketSelections.general * generalPrice) + (ticketSelections.vip * vipPrice);

    return (
        <>
           <Navbar/>
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">Checkout</h1>

            <section className="bg-indigo-500 rounded-2xl shadow-lg p-5 mb-5">
                <img
                    src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600"
                    alt="Afrobeats Night"
                    className="w-full rounded-lg mb-3"
                />
                <h2 className="text-white text-xl font-semibold">Afrobeats Night</h2>
                <p className="text-white">Date: September 20, 2026</p>
                <p className="text-white">Venue: Eko Covention Centre</p>
            </section>

            <section className="bg-indigo-500 rounded-2xl shadow-lg p-5 mb-5">
                <h3 className="text-white text-lg font-semibold mb-3">Ticket Type</h3>

                <div className="flex items-center justify-between text-white mb-2">
                    <p>General - #5,000</p>
                    <div className="flex items-center gap-2">
                        <button className="bg-gray-800 w-8 h-8 rounded" onClick={() => decrement('general')}>-</button>
                        <span>{ticketSelections.general}</span>
                        <button className="bg-gray-800 w-8 h-8 rounded" onClick={() => increment('general')}>+</button>
                    </div>
                </div>

                <div className="flex items-center justify-between text-white">
                    <p>VIP - #15,000</p>
                    <div className="flex items-center gap-2">
                        <button className="bg-gray-800 w-8 h-8 rounded" onClick={() => decrement('vip')}>-</button>
                        <span>{ticketSelections.vip}</span>
                        <button className="bg-gray-800 w-8 h-8 rounded" onClick={() => increment('vip')}>+</button>
                    </div>
                </div>
            </section>

            <section className="bg-indigo-500 rounded-2xl shadow-lg p-5 mb-5">
                <h3 className="text-white text-lg font-semibold">Order Summary</h3>
                <p className="text-white">Total: #{total}</p>
            </section>

            <section className="bg-indigo-500 rounded-2xl shadow-lg p-5 mb-5 flex flex-col gap-3">
                <h3 className="text-white text-lg font-semibold">Your Information</h3>

                <input
                    type="text"
                    placeholder="Full name"
                    value={buyerInfo.name}
                    onChange={(e) => handleBuyerInfoChange('name', e.target.value)}
                    className={`p-2 rounded border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={buyerInfo.email}
                    onChange={(e) => handleBuyerInfoChange('email', e.target.value)}
                    className={`p-2 rounded border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
            </section>

            <section className="bg-indigo-500 rounded-2xl shadow-lg p-5 mb-5 flex flex-col gap-3">
                <h3 className="text-white text-lg font-semibold">Payment Details</h3>

                <input
                    type="text"
                    placeholder="Card Number"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => handlePaymentInfoChange('cardNumber', e.target.value)}
                    className={`p-2 rounded border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                />

                <input
                    type="text"
                    placeholder="MM/YY"
                    value={paymentInfo.expiry}
                    onChange={(e) => handlePaymentInfoChange('expiry', e.target.value)}
                    className={`p-2 rounded border ${errors.expiry ? 'border-red-500' : 'border-gray-300'}`}
                />

                <input
                    type="text"
                    placeholder="CVV"
                    value={paymentInfo.cvv}
                    onChange={(e) => handlePaymentInfoChange('cvv', e.target.value)}
                    className={`p-2 rounded border ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                />
            </section>

            <section>
                {status !== 'success' && (
                    <button
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold disabled:bg-indigo-300"
                        onClick={handleSubmit}
                        disabled={status === 'processing'}
                    >
                        {status === 'processing' ? 'Processing...' : 'Make Payment'}
                    </button>
                )}

                {status === 'success' && <p className="text-green-600 text-center font-semibold">Payment Successful!</p>}
            </section>
        </div>
        </>
    );
}

export default CheckOut;