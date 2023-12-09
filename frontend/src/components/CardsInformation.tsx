'use client'
import useUser from "@/hooks/useUser";
import UserService from "@/services/UserService";
import { CardInfomration } from "@/types/User";
import { hasCookie } from "cookies-next";
import Link from "next/link";
import {useRouter} from "next/navigation";
import { useEffect, useState } from "react";

const CardInformation = () => {
    const router = useRouter();
    const [cards, setCards] = useState<CardInfomration[] | []>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!hasCookie('token')) {
                router.push('/');
            } else {
                try {
                    const data = await UserService.getCardInformation();
                    setCards(data);
                } catch (error) {
                    console.error('Error fetching cards:', error);
                }
            }
        };
    
        fetchData();
    }, []);    

    return (
    <div>
      <h1>Your Cards</h1>
      <Link href="/subscriptions/add-card">
        <button style={buttonStyle}>Add Card</button>
      </Link>
      {cards.length > 0 ? (
        <ul style={cardListStyle}>
          {cards.map((card, index) => (
            <li key={index} style={cardItemStyle}>
              <p><strong>Expiration Date:</strong> {card.expMonth}/{card.expYear}</p>
              <p><strong>CVC:</strong> {card.cvc}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cards available.</p>
      )}
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: 'black',
  border: 'none',
  color: 'white',
  padding: '10px 20px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '20px',
};

const cardListStyle = {
  listStyle: 'none',
  padding: 0,
};

const cardItemStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  margin: '8px 0',
  padding: '10px',
  // Add more styles as needed
};

export default CardInformation;