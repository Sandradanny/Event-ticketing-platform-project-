export default function EventDetail() {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'Arial',
        padding: '40px'
      }}
    >
      <div>
        <h1 style={{ color: '#0099cc', marginBottom: '16px' }}>
          Event Details
        </h1>

        <p style={{ color: '#555', maxWidth: '500px' }}>
          Detailed information for selected events will be displayed here soon (STAY TUNE, YOU HEAR).
        </p>
      </div>
    </div>
  )
}