import { useParams } from 'react-router-dom';

const events = [
  {
    id: '1',
    title: 'Northern Regional Thanksgiving',
    date: '31 August 2026',
    location: 'RCCG House of Grace, Isolo, Lagos',
    price: 'Free',
    description:
      'Join us for the Northern Regional Thanksgiving, a special gathering to celebrate and give thanks for God’s faithfulness in a Northern way.',
  },
  {
    id: '2',
    title: 'Tech & Innovation Conference 2026',
    date: '12 September 2026',
    location: 'Lagos, Nigeria',
    price: '₦5,000',
    description:
      'A conference bringing together innovators, developers, entrepreneurs and technology enthusiasts to connect, learn and share ideas.',
  },
  {
    id: '3',
    title: 'Afrobeats Live Experience',
    date: '19 September 2026',
    location: 'Eko Convention Centre, Lagos',
    price: '₦15,000',
    description:
      'Experience an exciting live Afrobeats event featuring music, entertainment and an unforgettable atmosphere.',
  },
];

export default function EventDetail() {
  const { id } = useParams();

  const event = events.find((event) => event.id === id);

  if (!event) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Event Not Found</h1>
        <p>Sorry, we couldn't find this event.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '50px',
        background: '#f5f7fb',
        fontFamily: 'Arial',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        }}
      >
        <h1 style={{ marginBottom: '20px' }}>{event.title}</h1>

        <p>
          📅 <strong>Date:</strong> {event.date}
        </p>

        <p>
          📍 <strong>Location:</strong> {event.location}
        </p>

        <p>
          💰 <strong>Price:</strong> {event.price}
        </p>

        <hr style={{ margin: '25px 0' }} />

        <h2>About this event</h2>

        <p style={{ lineHeight: '1.7' }}>{event.description}</p>

        <button
          style={{
            marginTop: '25px',
            padding: '12px 24px',
            background: '#e099cc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Attend Event
        </button>
      </div>
    </div>
  );
}