import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { authStyle } from '../styles/authStyle';
import illustration from '../assets/images/illustration.png'

export default function Home() {
  return (
    <main style={authStyle.container}>
      <div style={authStyle.illustrationContainer}>
        <Image src={illustration} alt="Illustration" style={authStyle.illustration} />
      </div>

      <div style={authStyle.contentContainer}>
        <h1 style={authStyle.heading}>Welcome to SocialMate!</h1>

        <div style={authStyle.buttonContainer}>
          <Link href="/login">
            <button style={authStyle.button}>Log in</button>
          </Link>

          <Link href="/register">
            <button type="submit" style={authStyle.button}>
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
