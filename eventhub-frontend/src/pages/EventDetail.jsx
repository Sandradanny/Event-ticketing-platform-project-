export default function EventDetail() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>Event Detail Page</h1>

      <img
        src="https://www.nairaland.com/attachments/10777606_images20191224t074623_691_jpeg_jpeg97078c120ab3249e69545e9cf84a764f"
        alt="Lagos Music Festival"
        style={{ width: '100%', maxWidth: '600px', borderRadius: '12px' }}
      />

      <h2>Lagos Music Festival</h2>
      <p><strong>Date:</strong> 20 Aug 2026</p>
      <p><strong>Location:</strong> Lagos, Nigeria</p>
      <p><strong>Price:</strong> ₦5,000</p>

      <p>
        Experience an unforgettable night of music, entertainment,
        networking, and live performances from top artists.
      </p>

      <button
        style={{
          background: '#3db7f2',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Book Ticket
      </button>
    </div>
  )
}