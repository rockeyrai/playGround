'use client';
import React, { useState } from 'react';
import { AiOutlineLike } from "react-icons/ai";
import styles from './page.css';



function Facebook() {
  const [visible, setVisible] = useState('hidden');
  const [timer, setTimer] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [emojiLabel, setEmojiLabel] = useState(null); 
  const delay = 500;

  const handleMouseEnter = () => {
    if (timer) {
      clearTimeout(timer);
    }
    const id = setTimeout(() => {
      setVisible('block');
    }, delay);
    
    setTimer(id);
  
  };

  const handleMouseLeave = () => {
    
    if (timer) {
      clearTimeout(timer);
    }
    const id = setTimeout(() => {
      setVisible('hidden');
    }, delay);
    setTimer(id);
  };

  const selectEmoji = (emoji, label) => {
    if (selectedEmoji === emoji) {
      setSelectedEmoji(null);
      setEmojiLabel(null);
    } else {
      setSelectedEmoji(emoji);
      setEmojiLabel(label);
    }
    setVisible('hidden');
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center bg-[#19191b]">
      <div className="h-auto my-2 w-80 flex flex-col justify-center items-center rounded bg-[#252426]">
        <div className="h-72 w-80 my-2 mt-5 bg-red-700">
          <img src="DSCN1806.jpg" alt="rockey" className="w-full h-full object-cover" />
        </div>
        <div className='w-[100%] h-[20%] relative'>
          <div className="dropup">
            <button
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => { setSelectedEmoji(null); setEmojiLabel(null); }} // Reset emoji and label on click
              className="drop-btn"
            >
              {selectedEmoji ? <span>{selectedEmoji}</span> : <AiOutlineLike className="h-5 w-5" />}
              {selectedEmoji ? ` ${emojiLabel}` : ' Like'}
            </button>
          </div>

            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`content absolute flex text-white ${visible}`}
            >
              <button onClick={() => selectEmoji('👍', 'Like')}>👍</button>
              <button onClick={() => selectEmoji('🖤', 'Love')}>🖤</button>
              <button onClick={() => selectEmoji('😆', 'Haha')}>😆</button>
              <button onClick={() => selectEmoji('😲', 'Wow')}>😲</button>
              <button onClick={() => selectEmoji('😥', 'Sad')}>😥</button>
              <button onClick={() => selectEmoji('😡', 'Angry')}>😡</button>
            </div>
  
        </div>
      </div>
    </div>
  );
}

export default Facebook;
