export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #3db7f2, #0b7ec2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Arial',
        padding: '20px'
      }}
    >
      <div>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
          Discover Amazing Events
        </h1>

        <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
          Browse concerts, conferences, festivals and book tickets online.
        </p>

        <button
          style={{
            background: 'white',
            color: '#0b7ec2',
            border: 'none',
            padding: '14px 28px',
            borderRadius: '10px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Explore Events
        </button>
      </div>
    </div>
  )
}