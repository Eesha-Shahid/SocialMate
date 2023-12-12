import React, { useState } from 'react';
import useUser from '@/hooks/useUser';
import UserService from '@/services/UserService';
import { authStyle } from '@/styles/authStyle';

const PlanInformation = () => {
  const { user, setUser } = useUser();
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState("");

  const handleSubscribeClick = async () => {
    try {
      const data = await UserService.subscribe();
      setUser(data);
    } catch (error) {
      console.error('Subscription failed:', (error as Error).message);
    }
  };

  const handleConfirmSwitch = async () => {
    try {
      const data = await UserService.cancelSubscription();
      setUser(data);
      setShowOverlay(false);
    } catch (error) {
      console.error('Cancellation failed:', (error as Error).message);
      setShowOverlay(false);
    }
  };

  const handleOverlay = (message: string) => {
    // Show overlay and confirm the action
    setShowOverlay(true);
    setOverlayMessage(message);
  };

  const handleCancelSwitch = () => {
    // User canceled the action, hide the overlay
    setShowOverlay(false);
  };

  return (
    <div>
      <h1>Current Plan</h1>
      {user?.userType === 'Standard' ? (
        <div>
          <p>Your current plan: Standard</p>
          {user?.cards.length > 0 ? (
            <>
              <button style={buttonStyle} onClick={() => {handleOverlay("This will make a payment from your default card. Are you sure you want to purchase our premium package?");}}>Purchase Premium</button>
            </>
          ) : (
            <p style={{ color: 'red' }}>Please add a card to subscribe to Premium.</p>
          )}
        </div>
      ) : (
        <div>
          <button style={buttonStyle} onClick={() => {handleOverlay("Your current subscription is non-refundable. Are you sure you want to switch to Standard?");}}>Switch to Standard</button>
        </div>
      )}
      <br />

      {/* Confirmation Overlay */}
      {showOverlay && (
        <div style={authStyle.overlay}>
          <div style={authStyle.overlayContent}>
            <p>{overlayMessage}</p>
            {user?.userType === 'Standard'?
            <button style={authStyle.importantContentButton} onClick={handleSubscribeClick}>Subscribe</button>:
            <button style={authStyle.importantContentButton} onClick={handleConfirmSwitch}>Switch</button>
            }
            <button style={authStyle.overlayContentButton} onClick={handleCancelSwitch}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '5px 10px',
  borderRadius: '5px',
  marginRight: '1rem',
  fontSize: '1rem',
  cursor: 'pointer',
};

export default PlanInformation;
