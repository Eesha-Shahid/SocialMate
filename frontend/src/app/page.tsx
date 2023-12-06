import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Welcome to SocialMate!</h1>
      <Link href="/login"><button>Get Started</button></Link>
      <Link href="/register"><button>Register</button></Link>
    </main>
  );
}
