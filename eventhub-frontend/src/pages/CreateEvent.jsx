import { useState } from 'react';
import Navbar from '../Navbar';

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
        const newEvent = {
            id: 'evt_' + Date.now(),
            title: eventInfo.title,
            date: eventInfo.date,
            venue: eventInfo.venue,
            description: eventInfo.description,
            ticketTypes: [],
            createdAt: new Date().toISOString()
        };

        const existingEvents = JSON.parse(localStorage.getItem('allEvents') || '[]');
        const updatedEvents = [...existingEvents, newEvent];
        localStorage.setItem('allEvents', JSON.stringify(updatedEvents));

        setStatus('success');
    }

    return (
        <>
          <Navbar/>
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">Create Event</h1>

            <section className="bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-3 border border-gray-200">
                <input
                    type="text"
                    placeholder="Event Title"
                    value={eventInfo.title}
                    onChange={(e) => handleEventInfoChange('title', e.target.value)}
                    className="p-2 rounded border border-gray-300"
                />

                <input
                    type="datetime-local"
                    value={eventInfo.date}
                    onChange={(e) => handleEventInfoChange('date', e.target.value)}
                    className="p-2 rounded border border-gray-300"
                />

                <input
                    type="text"
                    placeholder="Venue"
                    value={eventInfo.venue}
                    onChange={(e) => handleEventInfoChange('venue', e.target.value)}
                    className="p-2 rounded border border-gray-300"
                />

                <textarea
                    placeholder="Description"
                    value={eventInfo.description}
                    onChange={(e) => handleEventInfoChange('description', e.target.value)}
                    className="p-2 rounded border border-gray-300 min-h-24"
                />

                <button
                    onClick={handleCreateEvent}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold"
                >
                    Create Event
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