'use client'
import React, { useEffect, useState } from 'react';
import Sidebar from "@/components/Sidebar";
import UserService from "@/services/UserService";
import { PaymentInformation } from '@/types/User';

const History = () => {
  // State to store payment history
  const [payments, setPayments] = useState<PaymentInformation[] | []>([]);

  // Fetch payment history on component mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const paymentHistory = await UserService.getPaymentInformation();
        setPayments(paymentHistory);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      }
    };

    fetchHistory();
  }, []);

  // Render payment history as cards
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ padding: '10rem', paddingTop: '4rem', width: '100%'}}>
        <h1>Your Billing History</h1>
        <div style={cardContainerStyle}>
          {payments.length > 0 ? (
            payments.map((payment, index) => (
              <div key={index} style={cardStyle}>
                <p><strong>Card:</strong> {payment.card}</p>
                <p><strong>Amount:</strong> {payment.amount.toString()}</p>
                <p><strong>Currency:</strong> {payment.currency}</p>
                <p><strong>Payment Method:</strong> {payment.payment_method}</p>
                <p><strong>Date:</strong> {new Date(payment.createdAt).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No payment history available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles for the card container and individual cards
const cardContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '1rem',
};

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '1rem',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

export default History;
