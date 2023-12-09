import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ textAlign: 'center' }}>
      <h1>Welcome to SocialMate!</h1>
      <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
          <Link href="/login">
            <button style={{ width: '100%', backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Log in
            </button>
          </Link><br />
          <Link href="/register">
            <button
              type="submit"
              style={{ width: '100%', backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
