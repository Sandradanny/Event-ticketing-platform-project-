import Navbar from '../Navbar';
import { Calendar, MapPin, Ticket, CreditCard, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CheckOut() {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const [eventInfo, setEventInfo] = useState(null);
    const [ticketTypes, setTicketTypes] = useState([]);
    const [ticketSelections, setTicketSelections] = useState({}); // { [ticketTypeId]: count }

    const [buyerInfo, setBuyerInfo] = useState({
        name: '',
        email: ''
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const [status, setStatus] = useState('idle');
    const [errors, setErrors] = useState({});

    // Fetch Event Details & Real Ticket Types from Backend
    useEffect(() => {
        if (!eventId) return;

        // 1. Fetch Event Info
        fetch(`https://eventmanagerapi-1.onrender.com/api/Events/${eventId}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to load event');
                return res.json();
            })
            .then(data => setEventInfo(data))
            .catch(err => console.error('Error fetching event:', err));

        // 2. Fetch Ticket Types for this Event
        fetch(`https://eventmanagerapi-1.onrender.com/api/TicketType/event/${eventId}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to load ticket types');
                return res.json();
            })
            .then(data => {
                setTicketTypes(data);
                // Initialize selection state for each ticket type
                const initialSelections = {};
                data.forEach(ticket => {
                    const id = ticket.ticketTypeId || ticket.id;
                    initialSelections[id] = 0;
                });
                setTicketSelections(initialSelections);
            })
            .catch(err => console.error('Error fetching ticket types:', err));
    }, [eventId]);

    function increment(ticketTypeId) {
        setTicketSelections(prev => ({
            ...prev,
            [ticketTypeId]: (prev[ticketTypeId] || 0) + 1
        }));
    }

    function decrement(ticketTypeId) {
        setTicketSelections(prev => ({
            ...prev,
            [ticketTypeId]: Math.max(0, (prev[ticketTypeId] || 0) - 1)
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

    // Calculate total dynamic amount
    const total = ticketTypes.reduce((acc, ticket) => {
        const id = ticket.ticketTypeId || ticket.id;
        const count = ticketSelections[id] || 0;
        return acc + count * (ticket.price || 0);
    }, 0);

    async function handleSubmit() {
        const newErrors = {};
        if (!buyerInfo.name.trim()) newErrors.name = true;
        if (!buyerInfo.email.trim()) newErrors.email = true;
        if (!paymentInfo.cardNumber.trim()) newErrors.cardNumber = true;
        if (!paymentInfo.expiry.trim()) newErrors.expiry = true;
        if (!paymentInfo.cvv.trim()) newErrors.cvv = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Format items array expected by backend: [{ ticketTypeId, quantity }]
        const items = Object.entries(ticketSelections)
            .filter(([_, quantity]) => quantity > 0)
            .map(([ticketTypeId, quantity]) => ({
                ticketTypeId,
                quantity
            }));

        if (items.length === 0) {
            alert('Please select at least one ticket before proceeding.');
            return;
        }

        setErrors({});
        setStatus('processing');

        const bookingPayload = {
            eventId: eventId,
            items: items
        };

        try {
            // Step 1: Reserve the tickets in backend
            const reserveRes = await fetch('https://eventmanagerapi-1.onrender.com/api/Booking/reserve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingPayload)
            });

            if (!reserveRes.ok) {
                const errorData = await reserveRes.text();
                throw new Error(errorData || 'Failed to reserve booking');
            }

            const bookingData = await reserveRes.json();
            const bookingId = bookingData.id || bookingData.bookingId;

            // Step 2: Confirm payment record if bookingId is returned
            if (bookingId) {
                await fetch(`https://eventmanagerapi-1.onrender.com/api/Booking/${bookingId}/payment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        bookingId: bookingId,
                        paymentMethod: 'Card',
                        transactionReference: 'txn_' + Date.now()
                    })
                });
            }

            // Save order confirmation details locally for reference
            localStorage.setItem('lastOrder', JSON.stringify({
                booking: bookingData,
                buyerInfo,
                totalAmount: total,
                eventName: eventInfo?.eventName
            }));

            setStatus('success');
            navigate('/confirmation');
        } catch (err) {
            console.error('Checkout error:', err);
            alert('Failed to complete checkout. Please check the details and try again.');
            setStatus('idle');
        }
    }

    return (
        <>
            <Navbar />
            <div className="max-w-xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-[#00bfff] text-center mb-6">Checkout</h1>

                {/* Event Summary */}
                <section className="bg-[#00bfff] rounded-2xl shadow-lg p-5 mb-5">
                    <img
                        src={eventInfo?.imageUrl || "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600"}
                        alt={eventInfo?.eventName || "Event banner"}
                        className="w-full rounded-lg mb-3 object-cover h-48"
                    />
                    <h2 className="text-white text-xl font-semibold">{eventInfo?.eventName || 'Loading event...'}</h2>
                    <p className="text-white flex items-center gap-2 mt-1">
                        <Calendar size={16} /> Date: {eventInfo?.eventDate ? new Date(eventInfo.eventDate).toLocaleDateString() : 'N/A'}
                    </p>
                    <p className="text-white flex items-center gap-2 mt-1">
                        <MapPin size={16} /> Venue: {eventInfo?.eventvenue || 'N/A'}
                    </p>
                </section>

                {/* Dynamic Ticket Types */}
                <section className="bg-[#00bfff] rounded-2xl shadow-lg p-5 mb-5">
                    <h3 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
                        <Ticket size={20} /> Ticket Types
                    </h3>

                    {ticketTypes.length === 0 ? (
                        <p className="text-white text-sm">Loading ticket options...</p>
                    ) : (
                        ticketTypes.map((ticket) => {
                            const id = ticket.ticketTypeId || ticket.id;
                            const count = ticketSelections[id] || 0;

                            return (
                                <div key={id} className="flex items-center justify-between text-white mb-3 last:mb-0">
                                    <div>
                                        <p className="font-medium">{ticket.ticketTypeName || ticket.name}</p>
                                        <p className="text-sm opacity-90">₦{(ticket.price || 0).toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            className="bg-gray-800 text-white w-8 h-8 rounded flex items-center justify-center font-bold active:scale-95"
                                            onClick={() => decrement(id)}
                                        >
                                            -
                                        </button>
                                        <span className="w-6 text-center">{count}</span>
                                        <button
                                            type="button"
                                            className="bg-gray-800 text-white w-8 h-8 rounded flex items-center justify-center font-bold active:scale-95"
                                            onClick={() => increment(id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </section>

                {/* Order Summary */}
                <section className="bg-[#00bfff] rounded-2xl shadow-lg p-5 mb-5">
                    <h3 className="text-white text-lg font-semibold">Order Summary</h3>
                    <p className="text-white font-medium text-lg mt-1">Total: ₦{total.toLocaleString()}</p>
                </section>

                {/* Buyer Information */}
                <section className="bg-[#00bfff] rounded-2xl shadow-lg p-5 mb-5 flex flex-col gap-3">
                    <h3 className="text-white text-lg font-semibold">Your Information</h3>

                    <input
                        type="text"
                        placeholder="Full name"
                        value={buyerInfo.name}
                        onChange={(e) => handleBuyerInfoChange('name', e.target.value)}
                        className={`p-2 rounded border bg-white ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={buyerInfo.email}
                        onChange={(e) => handleBuyerInfoChange('email', e.target.value)}
                        className={`p-2 rounded border bg-white ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                </section>

                {/* Payment Information */}
                <section className="bg-[#00bfff] rounded-2xl shadow-lg p-5 mb-5 flex flex-col gap-3">
                    <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                        <CreditCard size={20} /> Payment Details
                    </h3>

                    <input
                        type="text"
                        placeholder="Card Number"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => handlePaymentInfoChange('cardNumber', e.target.value)}
                        className={`p-2 rounded border bg-white ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                    />

                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="MM/YY"
                            value={paymentInfo.expiry}
                            onChange={(e) => handlePaymentInfoChange('expiry', e.target.value)}
                            className={`p-2 rounded border bg-white ${errors.expiry ? 'border-red-500' : 'border-gray-300'}`}
                        />

                        <input
                            type="password"
                            placeholder="CVV"
                            maxLength={4}
                            value={paymentInfo.cvv}
                            onChange={(e) => handlePaymentInfoChange('cvv', e.target.value)}
                            className={`p-2 rounded border bg-white ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                        />
                    </div>
                </section>

                {/* Submit Action */}
                <section>
                    {status !== 'success' && (
                        <button
                            className="w-full bg-[#00bfff] text-white py-3 rounded-lg font-semibold disabled:opacity-60 flex items-center justify-center gap-2 hover:opacity-95 transition"
                            onClick={handleSubmit}
                            disabled={status === 'processing'}
                        >
                            {status === 'processing' ? (
                                'Processing...'
                            ) : (
                                <>
                                    <Lock size={18} /> Make Payment
                                </>
                            )}
                        </button>
                    )}

                    {status === 'success' && (
                        <p className="text-green-600 text-center font-semibold mt-2">Payment Successful!</p>
                    )}
                </section>
            </div>
        </>
    );
}

export default CheckOut;