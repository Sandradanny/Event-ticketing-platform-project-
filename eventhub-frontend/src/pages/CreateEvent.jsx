import { useState } from 'react';
import Navbar from '../Navbar';
import { CalendarPlus, MapPin, FileText, Type, CheckCircle } from 'lucide-react';
import { getAuthToken } from '../utils/auth';


function CreateEvent() {
    const [eventInfo, setEventInfo] = useState({
        title: '',
        date: '',
        venue: '',
        description: ''
    });

    const [status, setStatus] = useState('idle');

    function handleEventInfoChange(field, value) {
        setEventInfo(prev => ({
            ...prev,
            [field]: value
        }));
    }

    function handleCreateEvent() {
        const myToken = getAuthToken();
        


        fetch('https://eventmanagerapi-1.onrender.com/api/TicketType', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + myToken
            },
            body: JSON.stringify({
                eventId: '3f69c1a0-fbaa-4428-b439-592be541e00a',
                ticketTypeName: 'General',
                description: 'General admission',
                price: 5000,
                quantity: 100
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log('Success:', data);
                setStatus('success');
            })
            .catch(err => {
                console.error('Error:', err);
            });
    }

    return (
        <>
            <Navbar />
            <div className="max-w-xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-[#00bfff] text-center mb-6 flex items-center justify-center gap-2">
                    <CalendarPlus size={28} /> Create Event
                </h1>

                <section className="bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-3 border border-gray-200">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <Type size={16} /> Event Title
                    </label>
                    <input
                        type="text"
                        placeholder="Event Title"
                        value={eventInfo.title}
                        onChange={(e) => handleEventInfoChange('title', e.target.value)}
                        className="p-2 rounded border border-gray-300"
                    />

                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <CalendarPlus size={16} /> Date & Time
                    </label>
                    <input
                        type="datetime-local"
                        value={eventInfo.date}
                        onChange={(e) => handleEventInfoChange('date', e.target.value)}
                        className="p-2 rounded border border-gray-300"
                    />

                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <MapPin size={16} /> Venue
                    </label>
                    <input
                        type="text"
                        placeholder="Venue"
                        value={eventInfo.venue}
                        onChange={(e) => handleEventInfoChange('venue', e.target.value)}
                        className="p-2 rounded border border-gray-300"
                    />

                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <FileText size={16} /> Description
                    </label>
                    <textarea
                        placeholder="Description"
                        value={eventInfo.description}
                        onChange={(e) => handleEventInfoChange('description', e.target.value)}
                        className="p-2 rounded border border-gray-300 min-h-24"
                    />

                    <button
                        onClick={handleCreateEvent}
                        className="w-full bg-[#00bfff] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                        <CheckCircle size={18} /> Create Event
                    </button>

                    {status === 'success' && (
                        <p className="text-green-600 text-center font-semibold">Event created successfully!</p>
                    )}
                </section>
            </div>
        </>
    );
}

export default CreateEvent;