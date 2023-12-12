import { Flair } from '@/types/RedditUser';
import React from 'react';

interface FlairProps {
    flairs: Flair[] | null | 0;
    onSelectFlair: (flair: Flair) => void;
}

const FlairsComponent: React.FC<FlairProps> = ({ flairs, onSelectFlair }) => {

  // Function to determine if a color is light based on its hex value
  const isLightColor = (hexColor: string): boolean => {
    const threshold = 130; 
    const hex = hexColor.replace(/^#/, '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < threshold;
  };  
  
  const handleFlairSelection = (selectedFlair: Flair) => {
    onSelectFlair(selectedFlair);
  };

  return (
    <div>
      {flairs && (
        <div>
          <p>Available Flairs</p>
          <select style={dropdownStyle} onChange={(e) => handleFlairSelection(flairs[Number(e.target.value)])}>
            <option value="" disabled selected>Choose a Flair</option>
            {flairs.map((flair, index) => (
              <option 
                key={flair.id} 
                value={index} 
                style={
                  flair.background_color? 
                  {
                    backgroundColor: flair.background_color,
                    color: flair.text_color == 'dark' ? 'black' : 'white',
                    backgroundImage: flair.emojiUrl ? `url(${flair.emojiUrl})` : 'none',
                  }: {}
                }>
                {flair.text}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

const dropdownStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '16px',
  cursor: 'pointer',
};

export default FlairsComponent;
