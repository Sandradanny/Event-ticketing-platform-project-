import React, { useState } from 'react';
import { 
  CalendarDays, CheckCircle, XCircle, Plus, ChevronRight,
  Calendar, MapPin, Users
} from 'lucide-react';
import './CreateEvent.css';



const CreateEvent = () => {
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    category: 'conference',
    date: '',
    time: '',
    venue: '',
    address: '',
    capacity: '',
    image: null,
    ticketTypes: [
      { name: 'Regular', price: '', quantity: '' },
      { name: 'VIP', price: '', quantity: '' },
      { name: 'VVIP', price: '', quantity: '' },
      { name: 'Table for four', price: '', quantity: '' },
    ],
    status: 'draft'
  });
  const [created, setCreated] = useState(false);

  const updateField = (field, value) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const updateTicketType = (index, field, value) => {
    const updated = [...eventData.ticketTypes];
    updated[index][field] = value;
    setEventData(prev => ({ ...prev, ticketTypes: updated }));
  };

  const addTicketType = () => {
    setEventData(prev => ({
      ...prev,
      ticketTypes: [...prev.ticketTypes, { name: 'New Ticket Type', price: '', quantity: '' }]
    }));
  };

  const removeTicketType = (index) => {
    const updated = eventData.ticketTypes.filter((_, i) => i !== index);
    setEventData(prev => ({ ...prev, ticketTypes: updated }));
  };

  const handleCreate = () => {
    setCreated(true);
    setTimeout(() => setCreated(false), 3000);
  };

  const steps = [
    { id: 1, title: 'Basic Info' },
    { id: 2, title: 'Location & Time' },
    { id: 3, title: 'Tickets' },
    { id: 4, title: 'Review' },
  ];

  return (
    <div className="create-event">
      <div className="page-header">
        <h2><CalendarDays size={24} /> Create New Event <span className="us-tag">US-007</span></h2>
        <p>Set up your event details, venue, and ticket types</p>
      </div>

      <div className="stepper">
        {steps.map((s, i) => (
          <div key={s.id} className={`step ${step === s.id ? 'active' : ''} ${step > s.id ? 'completed' : ''}`}>
            <div className="step-number">{step > s.id ? <CheckCircle size={16} /> : s.id}</div>
            <div className="step-title">{s.title}</div>
            {i < steps.length - 1 && <div className="step-connector" />}
          </div>
        ))}
      </div>

      <div className="form-card">
        {step === 1 && (
          <div className="form-step">
            <h3>Event Basics</h3>
            <div className="form-grid">
              <div className="form-group full">
                <label>Event Name </label>
                <input
                  type="text"
                  placeholder="e.g., Tech Conference 2026"
                  value={eventData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                />
              </div>
              <div className="form-group full">
                <label>Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe your event..."
                  value={eventData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={eventData.category} onChange={(e) => updateField('category', e.target.value)}>
                  <option value="conference">Conference</option>
                  <option value="concert">Concert</option>
                  <option value="sports">Sports</option>
                  <option value="workshop">Workshop</option>
                  <option value="networking">Networking</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Total Capacity</label>
                <input
                  type="number"
                  placeholder="e.g., 500"
                  value={eventData.capacity}
                  onChange={(e) => updateField('capacity', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h3>Location & Schedule</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Event Date *</label>
                <input type="date" value={eventData.date} onChange={(e) => updateField('date', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Start Time *</label>
                <input type="time" value={eventData.time} onChange={(e) => updateField('time', e.target.value)} />
              </div>
              <div className="form-group full">
                <label>Venue Name *</label>
                <input type="text" placeholder="e.g., Convention Center Hall A" value={eventData.venue} onChange={(e) => updateField('venue', e.target.value)} />
              </div>
              <div className="form-group full">
                <label>Address</label>
                <input type="text" placeholder="Full address" value={eventData.address} onChange={(e) => updateField('address', e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h3>Ticket Types</h3>
            <div className="ticket-types-list">
              {eventData.ticketTypes.map((ticket, index) => (
                <div key={index} className="ticket-type-row">
                  <div className="ticket-input">
                    <label>Type Name</label>
                    <input type="text" value={ticket.name} 
                    onChange={(e) => updateTicketType(index, 'name', e.target.value)} />
                  </div>
                  <div className="ticket-input">
                    <label>Price ($)</label>
                    <input type="number" placeholder="0.00" 
                    value={ticket.price} onChange={(e) => updateTicketType(index, 'price', e.target.value)} />
                  </div>
                  <div className="ticket-input">
                    <label>Quantity</label>
                    <input type="number" placeholder="0" 
                    value={ticket.quantity} onChange={(e) => updateTicketType(index, 'quantity', e.target.value)} />
                  </div>
                  <button className="remove-btn" 
                  onClick={() => removeTicketType(index)}><XCircle size={18} /></button>
                </div>
              ))}
              <button className="add-ticket-btn" onClick={addTicketType}>
                <Plus size={16} /> Add Ticket Type
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="form-step review">
            <h3>Review Event</h3>
            <div className="review-card">
              <div className="review-header">
                <div className="review-title">{eventData.name || 'Untitled Event'}</div>
                <span className={`status-badge ${eventData.status}`}>{eventData.status}</span>
              </div>
              <div className="review-details">
                <div className="review-item"><Calendar size={16} /> {eventData.date || 'Not set'} at {eventData.time || 'Not set'}</div>
                <div className="review-item"><MapPin size={16} /> {eventData.venue || 'No venue'} {eventData.address && `- ${eventData.address}`}</div>
                <div className="review-item"><Users size={16} /> Capacity: {eventData.capacity || 'Not set'}</div>
              </div>
              <div className="review-tickets">
                <h4>Ticket Types</h4>
                {eventData.ticketTypes.map((t, i) => (
                  <div key={i} className="review-ticket-row">
                    <span>{t.name}</span>
                    <span>${t.price || '0'} × {t.quantity || '0'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="form-actions">
          {step > 1 && <button className="btn-secondary" onClick={() => setStep(step - 1)}>Back</button>}
          {step < 4 ? (
            <button className="btn-primary" onClick={() => setStep(step + 1)}>Next <ChevronRight size={16} /></button>
          ) : (
            <button className="btn-success" onClick={handleCreate}>
              {created ? <><CheckCircle size={16} /> Created!</> : <><CheckCircle size={16} /> Publish Event</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;