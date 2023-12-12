import { CSSProperties } from 'react';

class AuthStyle {
  container: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  illustrationContainer: CSSProperties = {
    flex: '1',
    textAlign: 'center',
    marginRight: '-650px', 
  };

  illustration: CSSProperties = {
    width: '600px',
    height: '600px',
    margin: 'auto', 
  };

  contentContainer: CSSProperties = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  heading: CSSProperties = {
    fontSize: '2rem',
    marginBottom: '24px',
    margin: 0,
  };

  buttonContainer: CSSProperties = {
    maxWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    margin: 'auto',
  };

  button: CSSProperties = {
    width: '413px',
    height: '61px',
    background: 'linear-gradient(91deg, #8B00CC 0%, #FD5B00 103.08%)',
    color: 'var(--White, #FFF)',
    padding: '10px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    marginBottom: '1.5rem',
    boxShadow: '10px 10px 30px 0px rgba(255, 255, 255, 0.25) inset, 0px 10px 30px 0px rgba(150, 13, 192, 0.40), -10px -10px 30px 0px rgba(110, 16, 94, 0.25) inset',
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '132%',
  };

  forgotPasswordLink: CSSProperties = {
    marginBottom: '1.5rem',
    alignItems: 'flex-start'
  };

  inputContainer: CSSProperties = {
    width: '413px',
    marginBottom: '1.5rem',
  };

  inputField: CSSProperties = {
    width: '93%',
    height: '40px',
    flexShrink: 0,
    borderRadius: '20px',
    border: '1px solid #8B00CC',
    background: 'var(--White, #FFF)',
    boxShadow: '0px 10px 20px 0px rgba(150, 13, 192, 0.15)',
    padding: '10px',
    fontSize: '16px',
  };

  signUpLink: CSSProperties = {
    marginTop: '1.5rem',
  };

  overlay: CSSProperties = {
    position: 'fixed', // Fixed was missing quotes
    top: 0,
    left: 0,
    width: '100%', // Quotes were missing
    height: '100%', // Quotes were missing
    background: 'rgba(0, 0, 0, 0.5)', // Quotes were missing
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Semicolon was removed
  };

  overlayContent: CSSProperties = {
    background: '#fff', // Quotes were missing
    padding: '20px', // Quotes were missing
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
  };

  overlayContentP: CSSProperties = {
    marginBottom: '10px',
  };

  overlayContentButton: CSSProperties = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginRight: '1rem'
  };

  importantContentButton: CSSProperties = {
    background: 'red',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '1rem',
    transition: 'background 0.3s ease', // Quotes were missing
  };

  overlayContentButtonHover: CSSProperties = {
    background: '#2980b9',
  };
}

export const authStyle = new AuthStyle();
