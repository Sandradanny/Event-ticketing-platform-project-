export default function SearchResults() {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '40px',
        fontFamily: 'Arial'
      }}
    >
      <div>
        <h1 style={{ color: '#0099cc', marginBottom: '16px', fontSize: '2.5rem' }}>
          Upcoming Events
        </h1>

        <p style={{ color: '#555', fontSize: '1.1rem', maxWidth: '500px' }}>
          New events will be published here soon. Stay tuned for concerts,
          conferences, workshops and cultural experiences.
        </p>

        <button
          style={{
            marginTop: '24px',
            background: '#0099cc',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Notify Me
        </button>
      </div>
    </div>
  )
}